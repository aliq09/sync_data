/**
 * BridgeAck — staged acknowledgement for 0.4.0.
 *
 * HTTP 200 from /apply is transport success. When the movement configuration
 * requires acknowledgement, the source sets the execution result only after a
 * terminal ACK (completed, failed, or rejected) for the same correlation id.
 *
 * RECEIVED is taken from the additive /apply response (ack_supported).
 * The terminal stage is POST /api/x_33764_sbridge/sync/v1/ack.
 * The same (correlation_id, ack_stage) applied twice does not double counts.
 *
 * ack_required defaults to false. Dry run never waits. A peer that omits
 * ack_supported leaves the execution awaiting acknowledgement until
 * x_33764_sbridge.ack.timeout_minutes (default 30).
 */
var BridgeAck = Class.create()

BridgeAck.VERSION = '0.4.5'

BridgeAck.STAGES = {
    received: true,
    validated: true,
    accepted: true,
    processed: true,
    completed: true,
    rejected: true,
    failed: true,
}

BridgeAck.correlationFor = function (outboxId) {
    if (!outboxId) return ''
    return 'SB-' + outboxId
}

BridgeAck.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
    },

    isGloballyEnabled: function () {
        var raw = String(gs.getProperty(BridgeConfig.PROP.ackEnabled, 'true') || '')
            .trim()
            .toLowerCase()
        return raw !== 'false' && raw !== '0'
    },

    /**
     * Config flag and the global switch. Dry run is never required.
     * A frozen config_snapshot.ack_required wins over a later edit.
     */
    requiredForDex: function (dex) {
        if (!dex || !this.isGloballyEnabled()) return false
        if ((dex.getValue('execution_mode') || '') === 'dry_run') return false
        var frozen = this._snapshotFlag(dex.getValue('config_snapshot'))
        if (frozen === true) return true
        if (frozen === false) return false
        return this.requiredForConfigId(dex.getValue('configuration'))
    },

    requiredForConfigId: function (configId) {
        if (!configId || !this.isGloballyEnabled()) return false
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(configId)) return false
        return this.requiredForConfig(cfg)
    },

    requiredForConfig: function (cfg) {
        if (!cfg || !this.isGloballyEnabled()) return false
        if (!cfg.isValidField('ack_required')) return false
        return this._truthy(cfg.getValue('ack_required'))
    },

    requiredForPolicy: function (policyId) {
        if (!policyId || !this.isGloballyEnabled()) return false
        var policy = new GlideRecord(BridgeConfig.TABLE.policy)
        if (!policy.get(policyId)) return false
        var configId = policy.getValue('movement_config') || ''
        if (!configId) {
            var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
            cfg.addQuery('policy', policyId)
            cfg.setLimit(1)
            cfg.query()
            if (cfg.next()) configId = cfg.getUniqueValue()
        }
        return this.requiredForConfigId(configId)
    },

    requiredForPayload: function (payload) {
        if (!payload || !this.isGloballyEnabled()) return false
        if (payload.execution) {
            var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
            if (dex.get(payload.execution)) return this.requiredForDex(dex)
        }
        if (payload.policy) return this.requiredForPolicy(payload.policy)
        return false
    },

    /**
     * Put correlation_id on the outbound item and persist it when the stored
     * payload did not have one. Uses the existing SB- + outbox sys_id stub.
     */
    stampPayload: function (outboxGr, payload) {
        if (!payload) return ''
        var id = payload.correlation_id ? String(payload.correlation_id) : ''
        if (!id && outboxGr) id = BridgeAck.correlationFor(outboxGr.getUniqueValue())
        if (!id) return ''
        id = id.substr(0, 80)
        if (!payload.correlation_id) {
            payload.correlation_id = id
            if (outboxGr && outboxGr.getUniqueValue) {
                try {
                    var writer = new GlideRecord(BridgeConfig.TABLE.outbox)
                    if (writer.get(outboxGr.getUniqueValue())) {
                        var stored = JSON.parse(writer.getValue('payload') || '{}')
                        if (!stored.correlation_id) {
                            stored.correlation_id = id
                            writer.setValue('payload', JSON.stringify(stored))
                            writer.setWorkflow(false)
                            writer.update()
                        }
                    }
                } catch (e) {
                    gs.warn('[bridge] correlation stamp skipped: ' + e)
                }
            }
        }
        return id
    },

    /**
     * Source REST handler and the local RECEIVED taken from /apply.
     * Missing correlation_id is 400. The same stage twice is a duplicate.
     */
    handleInboundAck: function (body) {
        body = body || {}
        var correlation = body.correlation_id ? String(body.correlation_id).replace(/^\s+|\s+$/g, '') : ''
        if (!correlation) return { ok: false, status: 400, message: 'correlation_id is required' }
        var stage = body.ack_stage ? String(body.ack_stage).replace(/^\s+|\s+$/g, '').toLowerCase() : ''
        if (!BridgeAck.STAGES[stage]) {
            return { ok: false, status: 400, message: 'ack_stage is required' }
        }
        correlation = correlation.substr(0, 80)
        var key = 'ack:' + correlation + ':' + stage
        var existing = this._auditByKey(key)
        if (existing && existing.result !== 'pending') {
            return {
                ok: true,
                status: 200,
                duplicate: true,
                correlation_id: correlation,
                ack_stage: stage,
                transfer: existing.transfer || '',
                execution: existing.execution || '',
            }
        }

        var transfer = this._transferByCorrelation(correlation)
        var executionId = transfer ? transfer.execution : ''
        var auditId = ''
        if (!existing) {
            auditId = this._insertAudit(key, {
                direction: 'inbound',
                message_type: 'ack',
                result: 'pending',
                correlation_id: correlation,
                ack_stage: stage,
                transaction_id: body.transaction_id || (transfer && transfer.source_sys_id) || '',
                record_count: this._n(body.record_count) || 1,
                remote_audit_id: body.remote_audit_id || '',
                error: body.error ? String(body.error).substr(0, 4000) : '',
                transfer: transfer ? transfer.sys_id : '',
                execution: executionId,
                acknowledged_at: this._terminal(stage) ? new GlideDateTime().getValue() : '',
                remote_received_at: stage === 'received' ? new GlideDateTime().getValue() : '',
            })
        } else {
            auditId = existing.sys_id
        }

        var applied = { ok: true, pending: !transfer }
        try {
            var dw = new BridgeDualWrite()
            if (typeof dw.onAckReceived === 'function') {
                applied = dw.onAckReceived({
                    correlation_id: correlation,
                    ack_stage: stage,
                    transfer_id: transfer ? transfer.sys_id : '',
                    execution_id: executionId,
                    counts: body.counts || {},
                    result: body.result || '',
                    error: body.error || '',
                    record_count: this._n(body.record_count) || 1,
                    remote_audit_id: body.remote_audit_id || '',
                    audit_id: auditId,
                }) || applied
            }
        } catch (e) {
            gs.warn('[bridge] ack apply failed (will retry while pending): ' + e)
            return {
                ok: true,
                status: 200,
                duplicate: false,
                pending: true,
                correlation_id: correlation,
                ack_stage: stage,
                message: 'acknowledgement stored; execution update will retry',
            }
        }

        if (applied && applied.pending) {
            return {
                ok: true,
                status: 200,
                duplicate: false,
                pending: true,
                correlation_id: correlation,
                ack_stage: stage,
                audit_id: auditId,
            }
        }

        this._finishAudit(auditId, {
            result: body.result || stage,
            transfer: (applied && applied.transfer) || (transfer && transfer.sys_id) || '',
            execution: (applied && applied.execution) || executionId,
            remote_audit_id: body.remote_audit_id || '',
            error: body.error || '',
            acknowledged_at: this._terminal(stage) ? new GlideDateTime().getValue() : '',
        })

        return {
            ok: true,
            status: 200,
            duplicate: false,
            pending: false,
            correlation_id: correlation,
            ack_stage: stage,
            transfer: (applied && applied.transfer) || '',
            execution: (applied && applied.execution) || '',
            audit_id: auditId,
        }
    },

    /**
     * After the source has written the transfer, apply any ACK that arrived
     * while /apply was still in flight.
     */
    reconcile: function (correlationId) {
        if (!correlationId) return
        var gr = new GlideRecord(BridgeConfig.TABLE.transferAudit)
        if (!gr.isValid()) return
        gr.addQuery('correlation_id', correlationId)
        gr.addQuery('message_type', 'ack')
        gr.addQuery('legacy_key', 'STARTSWITH', 'ack:')
        gr.orderBy('sys_created_on')
        gr.query()
        while (gr.next()) {
            if ((gr.getValue('result') || '') !== 'pending') continue
            var stage = gr.getValue('ack_stage') || ''
            if (!BridgeAck.STAGES[stage]) continue
            this.handleInboundAck({
                correlation_id: correlationId,
                ack_stage: stage,
                transaction_id: gr.getValue('transaction_id') || '',
                record_count: gr.getValue('record_count') || 1,
                remote_audit_id: gr.getValue('remote_audit_id') || '',
                error: gr.getValue('error') || '',
                result: stage,
            })
        }
    },

    /**
     * Target → source terminal callback. Best-effort. Never changes the /apply result.
     * Runs only when the source marked the item ack_required, so Case 1 (flag off)
     * does not wait on a callback. Items with no correlation_id are skipped.
     */
    sendTerminalAcks: function (peerId, items, results) {
        if (!peerId || !items || !items.length) return
        var peer = this.config.peer(peerId)
        if (!peer || !peer.base_url) return
        for (var i = 0; i < items.length; i++) {
            var item = items[i] || {}
            if (!item.correlation_id) continue
            if (item.ack_required !== true && String(item.ack_required) !== 'true') continue
            var out = results && results[i] ? results[i] : { status: 'failed' }
            var built = this.buildTerminal(item, out)
            var remoteAudit = ''
            try {
                var dw = new BridgeDualWrite()
                if (typeof dw.onAckSent === 'function') {
                    remoteAudit = dw.onAckSent(peerId, item, out, built) || ''
                }
            } catch (e) {
                gs.warn('[bridge] target ack audit failed (ignored): ' + e)
            }
            if (remoteAudit) built.remote_audit_id = remoteAudit
            this._postAck(peer, built)
        }
    },

    /** Pure mapping from an /apply item result to a terminal ACK body. */
    buildTerminal: function (item, out) {
        item = item || {}
        out = out || {}
        var status = out.status || 'failed'
        var stage = 'failed'
        var result = 'failed'
        var counts = { inserted: 0, updated: 0, skipped: 0, failed: 0 }
        if (status === 'applied') {
            stage = 'completed'
            result = 'successful'
            if (item.op === 'insert') counts.inserted = 1
            else counts.updated = 1
        } else if (status === 'skipped') {
            stage = 'completed'
            result = 'successful'
            counts.skipped = 1
        } else if (status === 'rejected') {
            stage = 'rejected'
            result = 'rejected'
        } else {
            stage = 'failed'
            result = 'failed'
            counts.failed = 1
        }
        var correlation = item.correlation_id ? String(item.correlation_id).substr(0, 80) : ''
        return {
            correlation_id: correlation,
            ack_stage: stage,
            transaction_id: item.source_sys_id || '',
            record_count: 1,
            counts: counts,
            result: result,
            error: out.error ? String(out.error).substr(0, 4000) : '',
            remote_audit_id: '',
            idempotency_key: correlation + ':' + stage,
        }
    },

    /**
     * Fail executions that have been waiting on a peer that never ACKs.
     * Called from the existing continue job. Does not start a second drain.
     */
    sweepTimeouts: function () {
        if (!this.isGloballyEnabled()) return 0
        var minutes = this.config.intProp(BridgeConfig.PROP.ackTimeout, 30)
        if (!(minutes > 0)) minutes = 30
        var cutoff = new GlideDateTime()
        cutoff.addSeconds(-minutes * 60)
        var cutoffValue = cutoff.getValue()
        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        if (!dex.isValid()) return 0
        dex.addQuery(
            'execution_state',
            'IN',
            'awaiting_receipt,awaiting_acknowledgement,received,processing_target'
        )
        dex.setLimit(50)
        dex.query()
        var closed = 0
        while (dex.next()) {
            if (!this.requiredForDex(dex)) continue
            var sentAt = dex.getValue('transfer_sent_at') || dex.getValue('sys_updated_on') || ''
            if (!sentAt || sentAt > cutoffValue) continue
            var acknowledged = parseInt(dex.getValue('acknowledged_count'), 10) || 0
            var result = acknowledged > 0 ? 'partially_completed' : 'failed'
            var now = new GlideDateTime().getValue()
            dex.setValue('execution_result', result)
            dex.setValue('execution_state', 'completed')
            if (!dex.getValue('execution_completed_at')) dex.setValue('execution_completed_at', now)
            dex.work_notes =
                'Sync Bridge: acknowledgement timed out after ' +
                minutes +
                ' minutes. Peer does not support ACK or did not confirm. Result is ' +
                (result === 'failed' ? 'Failed' : 'Partially Completed') +
                '.'
            dex.update()
            try {
                new BridgeDualWrite()._touchConfigFromDex(dex)
            } catch (e) {
                gs.warn('[bridge] ack timeout config stamp skipped: ' + e)
            }
            closed++
        }
        return closed
    },

    _postAck: function (peer, body) {
        if (!body || !body.correlation_id) return
        try {
            var request = new sn_ws.RESTMessageV2()
            request.setHttpMethod('post')
            request.setEndpoint(peer.base_url + '/api/x_33764_sbridge/sync/v1/ack')
            request.setRequestHeader('Content-Type', 'application/json')
            request.setRequestHeader('Accept', 'application/json')
            request.setRequestBody(JSON.stringify(body))
            new BridgeTransport()._authorise(request, peer)
            var response = request.execute()
            var status = parseInt(response.getStatusCode(), 10)
            if (status < 200 || status > 299) {
                gs.warn(
                    '[bridge] terminal ack ' +
                        body.correlation_id +
                        ' ' +
                        body.ack_stage +
                        ' returned HTTP ' +
                        status
                )
            }
        } catch (e) {
            gs.warn('[bridge] terminal ack post failed (apply result unchanged): ' + e)
        }
    },

    _snapshotFlag: function (text) {
        if (!text) return null
        try {
            var parsed = JSON.parse(text)
            if (!parsed || typeof parsed.ack_required === 'undefined') return null
            if (parsed.ack_required === true || parsed.ack_required === 'true' || parsed.ack_required === '1') return true
            if (parsed.ack_required === false || parsed.ack_required === 'false' || parsed.ack_required === '0') return false
        } catch (e) {
            return null
        }
        return null
    },

    _truthy: function (value) {
        var raw = String(value == null ? '' : value)
            .trim()
            .toLowerCase()
        return raw === '1' || raw === 'true'
    },

    _terminal: function (stage) {
        return stage === 'completed' || stage === 'failed' || stage === 'rejected'
    },

    _n: function (value) {
        var n = parseInt(value, 10)
        if (isNaN(n) || n < 0) return 0
        return n
    },

    _auditByKey: function (key) {
        var gr = new GlideRecord(BridgeConfig.TABLE.transferAudit)
        if (!gr.isValid()) return null
        gr.addQuery('legacy_key', key)
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) return null
        return {
            sys_id: gr.getUniqueValue(),
            result: gr.getValue('result') || '',
            transfer: gr.getValue('transfer') || '',
            execution: gr.getValue('execution') || '',
        }
    },

    _transferByCorrelation: function (correlation) {
        var gr = new GlideRecord(BridgeConfig.TABLE.transfer)
        if (!gr.isValid()) return null
        gr.addQuery('correlation_id', correlation)
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) return null
        return {
            sys_id: gr.getUniqueValue(),
            execution: gr.getValue('execution') || '',
            stage: gr.getValue('stage') || '',
            source_sys_id: gr.getValue('source_sys_id') || '',
            transport_status: gr.getValue('transport_status') || '',
        }
    },

    _insertAudit: function (key, values) {
        var gr = new GlideRecord(BridgeConfig.TABLE.transferAudit)
        if (!gr.isValid()) return ''
        gr.newRecord()
        gr.setValue('legacy_key', key)
        for (var field in values) {
            if (!Object.prototype.hasOwnProperty.call(values, field)) continue
            if (values[field] === undefined || values[field] === '') continue
            if (gr.isValidField(field)) gr.setValue(field, values[field])
        }
        return gr.insert() || ''
    },

    _finishAudit: function (auditId, values) {
        if (!auditId) return
        var gr = new GlideRecord(BridgeConfig.TABLE.transferAudit)
        if (!gr.get(auditId)) return
        for (var field in values) {
            if (!Object.prototype.hasOwnProperty.call(values, field)) continue
            if (values[field] === undefined || values[field] === '') continue
            if (gr.isValidField(field)) gr.setValue(field, values[field])
        }
        gr.update()
    },

    type: 'BridgeAck',
}
