/**
 * BridgeDualWrite — Phase 1 shadows for Data Movement Configuration, Data Execution,
 * Transfer, Transfer Audit, Processing Error, and Record Result.
 *
 * Case 1 capture → outbox → drain → /apply is unchanged. Every public method is
 * best-effort: a failure is logged and swallowed. Callers still wrap these calls.
 *
 * Idempotency keys:
 *   configuration  policy sys_id
 *   execution      run:<sync run sys_id>
 *   transfer       outbox:<outbox sys_id>
 *   audit          outbox:<id>  or  receipt:<id>  or  apply:<peer>:<source>:<seq>:<status>
 *   error          dlq:<dlq sys_id>
 *   record result  outbox:<id>  or  apply:<peer>:<source>:<seq>
 *
 * config_snapshot is written once and never replaced.
 * Correlation ID is a local stub (SB- + outbox sys_id). It is not added to the apply payload.
 * DEX/TRN numbers are left empty on insert so table autoNumber assigns DEX000001 / TRN000001.
 * acknowledged_at / acknowledged_count / target receipt milestones stay empty — no staged ACK.
 */
var BridgeDualWrite = Class.create()

BridgeDualWrite.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
    },

    linkPolicy: function (policyGr) {
        this._guard('linkPolicy', function () {
            if (!policyGr) return
            this._linkOne(policyGr)
        })
    },

    linkPolicies: function () {
        this._guard('linkPolicies', function () {
            var gr = new GlideRecord(BridgeConfig.TABLE.policy)
            gr.query()
            while (gr.next()) {
                try {
                    this._linkOne(gr)
                } catch (e) {
                    gs.warn('[bridge] dual-write link ' + gr.getUniqueValue() + ' failed (ignored): ' + e)
                }
            }
        })
    },

    /**
     * Link policies and backfill a window of historical runs, outbox rows, receipts, and DLQ.
     * Live drain/seed/apply hooks cover new work. This catches rows that existed before Phase 1.
     */
    backfill: function () {
        this._guard('backfill', function () {
            this.linkPolicies()
            this._backfillMissing(BridgeConfig.TABLE.run, 'run', 40, function (row) {
                var phase = row.getValue('ended') ? 'close' : 'open'
                this._shadowRunById(row.getUniqueValue(), phase, null)
            })
            this._backfillMissing(BridgeConfig.TABLE.outbox, 'outbox', 40, function (row) {
                this._shadowOutboxRow(row, '', this._outcomeFromOutbox(row))
            })
            this._backfillMissing(BridgeConfig.TABLE.receipt, 'receipt', 40, function (row) {
                this._shadowReceiptRow(row)
            })
            this._backfillMissing(BridgeConfig.TABLE.dlq, 'dlq', 40, function (row) {
                this._shadowDlqRow(row, '')
            })
        })
    },

    onRunOpened: function (runId) {
        this._guard('onRunOpened', function () {
            this._shadowRunById(runId, 'open', null)
        })
    },

    onRunClosed: function (runId, summary) {
        this._guard('onRunClosed', function () {
            this._shadowRunById(runId, 'close', summary || null)
        })
    },

    onSeedPage: function (runId, summary) {
        this._guard('onSeedPage', function () {
            this._shadowRunById(runId, 'seed', summary || null)
        })
    },

    onOutboxQueued: function (outboxId, runId) {
        this._guard('onOutboxQueued', function () {
            var row = new GlideRecord(BridgeConfig.TABLE.outbox)
            if (!row.get(outboxId)) return
            this._shadowOutboxRow(row, runId || '', {
                status: 'queued',
                stage: 'queued',
                transport: 'pending',
                error: '',
                dead: false,
            })
        })
    },

    onOutboxSettled: function (outboxId, runId, outcome) {
        this._guard('onOutboxSettled', function () {
            var row = new GlideRecord(BridgeConfig.TABLE.outbox)
            if (!row.get(outboxId)) return
            this._shadowOutboxRow(row, runId || '', outcome || {})
        })
    },

    /** Target-side evidence after BridgeApply finishes one item. Does not write the apply response. */
    onApplyOutcome: function (peerId, item, out) {
        this._guard('onApplyOutcome', function () {
            if (!item || !item.source_sys_id) return
            var status = out && out.status ? out.status : 'failed'
            var receipt = this._receipt(peerId, item.source_sys_id)
            var key = receipt
                ? 'receipt:' + receipt.sys_id
                : 'apply:' + peerId + ':' + item.source_sys_id + ':' + (item.seq || 0) + ':' + status
            var now = new GlideDateTime().getValue()
            var localId = this.config.localPeerId() || ''
            var auditId = this._upsertByKey(BridgeConfig.TABLE.transferAudit, key, {
                direction: 'inbound',
                message_type: 'receive',
                result: status,
                local_instance: localId,
                remote_instance: peerId || '',
                transaction_id: item.source_sys_id,
                sequence: item.seq || 0,
                record_count: 1,
                source_table: item.table || '',
                source_sys_id: item.source_sys_id,
                target_sys_id: (out && out.target_sys_id) || (receipt && receipt.target_sys_id) || '',
                remote_received_at: now,
                error: out && out.error ? String(out.error).substr(0, 4000) : '',
                receipt: receipt ? receipt.sys_id : '',
            })
            this._upsertByKey(
                BridgeConfig.TABLE.recordResult,
                'apply:' + peerId + ':' + item.source_sys_id + ':' + (item.seq || 0),
                {
                    source_table: item.table || '',
                    source_sys_id: item.source_sys_id,
                    target_sys_id: (out && out.target_sys_id) || '',
                    action: item.op || '',
                    result: status,
                    error: out && out.error ? String(out.error).substr(0, 4000) : '',
                }
            )
            if (auditId && receipt) {
                // receipt link is already on the audit row; nothing else to stamp
            }
        })
    },

    onTargetDlq: function (dlqId, item, error) {
        this._guard('onTargetDlq', function () {
            if (!dlqId) return
            var values = {
                dlq: dlqId,
                error: String(error || '').substr(0, 4000),
                resolved: false,
                payload: JSON.stringify(item || {}),
            }
            if (item) {
                values.source_sys_id = item.source_sys_id || ''
                values.source_table = item.table || ''
            }
            this._upsertByKey(BridgeConfig.TABLE.processingError, 'dlq:' + dlqId, values)
        })
    },

    _guard: function (label, fn) {
        try {
            if (!this.config.isDualWrite()) return
            fn.call(this)
        } catch (e) {
            gs.warn('[bridge] dual-write ' + label + ' failed (ignored): ' + e)
        }
    },

    _linkOne: function (policyGr) {
        var policyId = policyGr.getUniqueValue()
        var gr = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        gr.addQuery('policy', policyId)
        gr.setLimit(1)
        gr.query()
        var isNew = !gr.next()
        if (isNew) {
            var stamped = policyGr.getValue('movement_config')
            if (stamped && gr.get(stamped)) {
                isNew = false
            } else {
                gr.initialize()
                gr.setValue('policy', policyId)
                gr.setValue('name', this._configName(policyGr))
                gr.setValue('operation', 'upsert')
                gr.setValue(
                    'match_strategy',
                    policyGr.getValue('preserve_sys_id') === '1' ? 'sys_id' : 'mapping'
                )
                gr.setValue('reference_handling', 'resolve')
                gr.work_notes = 'Sync Bridge: linked from sync policy ' + policyId + '.'
            }
        }

        var values = this._configValuesFromPolicy(policyGr)
        var changed = isNew
        for (var field in values) {
            if (!Object.prototype.hasOwnProperty.call(values, field)) continue
            if (this._assign(gr, field, values[field])) changed = true
        }
        if (!gr.getValue('name')) {
            gr.setValue('name', this._configName(policyGr))
            changed = true
        }
        if (!isNew && changed) {
            gr.work_notes = 'Sync Bridge: refreshed link from sync policy ' + policyId + '.'
        }

        var configId = ''
        if (isNew) configId = gr.insert()
        else if (changed) {
            gr.update()
            configId = gr.getUniqueValue()
        } else configId = gr.getUniqueValue()

        this._stampPolicy(policyId, configId)
    },

    _configName: function (policyGr) {
        var table = policyGr.getValue('table') || 'table'
        var direction = policyGr.getValue('direction') || 'outbound'
        var peer = policyGr.getDisplayValue('peer') || ''
        var name = 'Move ' + table + ' (' + direction + ')'
        if (peer) name += ' to ' + peer
        return name.substr(0, 200)
    },

    _configValuesFromPolicy: function (policyGr) {
        var direction = policyGr.getValue('direction') || 'outbound'
        var peer = policyGr.getValue('peer') || ''
        var owner = policyGr.getValue('owner_peer') || ''
        var sourceInstance = direction === 'inbound' ? peer : owner
        var targetInstance = direction === 'inbound' ? owner : peer
        var table = policyGr.getValue('table') || ''
        var targetTable = policyGr.getValue('target_table') || table
        return {
            active: policyGr.getValue('active') === '1',
            direction: direction,
            source_instance: sourceInstance,
            target_instance: targetInstance,
            source_table: table,
            target_table: targetTable,
            filter: policyGr.getValue('condition') || '',
            preserve_sys_id: policyGr.getValue('preserve_sys_id') === '1',
            propagate_deletes: policyGr.getValue('propagate_deletes') === '1',
            field_list: policyGr.getValue('field_list') || '',
            apply_mode: policyGr.getValue('mode') || 'direct',
            policy: policyGr.getUniqueValue(),
        }
    },

    _stampPolicy: function (policyId, configId) {
        if (!policyId || !configId) return
        var row = new GlideRecord(BridgeConfig.TABLE.policy)
        if (!row.get(policyId)) return
        if (row.getValue('movement_config') === configId) return
        row.setWorkflow(false)
        row.setValue('movement_config', configId)
        row.update()
    },

    _shadowRunById: function (runId, phase, summary) {
        if (!runId) return
        var run = new GlideRecord(BridgeConfig.TABLE.run)
        if (!run.get(runId)) return

        var key = 'run:' + runId
        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        dex.addQuery('legacy_key', key)
        dex.setLimit(1)
        dex.query()
        var isNew = !dex.next()
        if (isNew) {
            dex.initialize()
            dex.setValue('legacy_key', key)
            dex.setValue('run', runId)
        }

        var type = run.getValue('type') || ''
        var policyId = run.getValue('seed_policy') || ''
        var configId = policyId ? this._configIdForPolicy(policyId) : dex.getValue('configuration') || ''
        if (configId && !dex.getValue('configuration')) dex.setValue('configuration', configId)
        this._fillDexRouting(dex, run, policyId, configId)

        if (isNew || !dex.getValue('config_snapshot')) {
            dex.setValue('config_snapshot', this._snapshot(run, policyId, configId))
        }
        if (!dex.getValue('initiated_by')) dex.setValue('initiated_by', gs.getUserName() || 'system')
        if (!dex.getValue('started_at')) {
            dex.setValue('started_at', run.getValue('started') || new GlideDateTime().getValue())
        }
        this._stampDexName(dex, configId)

        if (phase === 'open') {
            var openState = type === 'bulk_seed' ? 'reading_source' : type === 'drain' ? 'sending' : 'preparing'
            var current = dex.getValue('execution_state') || 'draft'
            if (current === 'draft' || current === 'queued') {
                this._transitionState(dex, openState, (type || 'run') + ' started for sync run ' + runId + '.')
            }
        }

        if (phase === 'seed') {
            var enqueued = parseInt(run.getValue('processed'), 10) || 0
            dex.setValue('selected_count', enqueued)
            if (summary && summary.done) {
                if (!dex.getValue('execution_completed_at')) {
                    dex.setValue('execution_result', 'successful')
                    dex.setValue('source_read_completed_at', new GlideDateTime().getValue())
                    dex.setValue('execution_completed_at', new GlideDateTime().getValue())
                    this._transitionState(
                        dex,
                        'completed',
                        'Bulk seed finished. ' +
                            enqueued +
                            ' row(s) enqueued. Case 1 send still happens on drain. Acknowledgement stays empty.'
                    )
                    this._setDuration(dex)
                }
            } else {
                this._transitionState(dex, 'reading_source', 'Reading source rows for bulk seed.')
            }
        }

        if (phase === 'close') {
            var processed = parseInt(run.getValue('processed'), 10) || 0
            var failed = parseInt(run.getValue('failed'), 10) || 0
            if (summary && typeof summary.processed === 'number') processed = summary.processed
            if (summary && typeof summary.failed === 'number') failed = summary.failed
            var skipped = !!(summary && summary.skipped)
            var result = this._result(processed, failed, skipped)
            dex.setValue('selected_count', processed + failed)
            dex.setValue('sent_count', processed)
            dex.setValue('failed_count', failed)
            dex.setValue('execution_result', result)
            if (processed > 0 && !dex.getValue('transfer_sent_at')) {
                dex.setValue('transfer_sent_at', new GlideDateTime().getValue())
            }
            var terminal = skipped ? 'cancelled' : 'completed'
            if (!dex.getValue('execution_completed_at')) {
                var ended = run.getValue('ended') || new GlideDateTime().getValue()
                dex.setValue('execution_completed_at', ended)
                if (!dex.getValue('transfer_completed_at') && !skipped) {
                    dex.setValue('transfer_completed_at', ended)
                }
                this._transitionState(
                    dex,
                    terminal,
                    'Result: ' +
                        this._resultLabel(result) +
                        '. Sent ' +
                        processed +
                        ', failed ' +
                        failed +
                        '. Case 1 /apply contract; acknowledgement milestones stay empty.'
                )
                this._setDuration(dex)
            } else {
                dex.setValue('execution_state', terminal)
            }
        }

        // Leave number empty. Table autoNumber assigns DEX + 6 digits. Do not write an epoch.
        if (isNew) dex.insert()
        else dex.update()
    },

    _stampDexName: function (dex, configId) {
        if (!dex || dex.getValue('name') || !configId) return
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(configId)) return
        var label = cfg.getValue('name') || ''
        if (label) dex.setValue('name', String(label).substr(0, 200))
    },

    _stateLabel: function (state) {
        var labels = {
            draft: 'Draft',
            queued: 'Queued',
            preparing: 'Preparing',
            reading_source: 'Reading Source',
            sending: 'Sending',
            awaiting_receipt: 'Awaiting Receipt',
            received: 'Received',
            processing_target: 'Processing Target',
            awaiting_acknowledgement: 'Awaiting Acknowledgement',
            finalising: 'Finalising',
            completed: 'Completed',
            cancelled: 'Cancelled',
        }
        return labels[state] || state || 'Draft'
    },

    _resultLabel: function (result) {
        var labels = {
            successful: 'Successful',
            successful_with_warnings: 'Successful with Warnings',
            partially_completed: 'Partially Completed',
            failed: 'Failed',
            cancelled: 'Cancelled',
        }
        return labels[result] || result || ''
    },

    /**
     * Write a short system work note only when the lifecycle state actually changes.
     * @returns {boolean} true when the state changed
     */
    _transitionState: function (dex, nextState, detail) {
        var current = dex.getValue('execution_state') || 'draft'
        if (!nextState || current === nextState) return false
        dex.setValue('execution_state', nextState)
        var note = 'Sync Bridge: state ' + this._stateLabel(current) + ' → ' + this._stateLabel(nextState) + '.'
        if (detail) note += ' ' + detail
        dex.work_notes = note
        return true
    },

    _fillDexRouting: function (dex, run, policyId, configId) {
        var policy = null
        if (policyId) {
            var p = new GlideRecord(BridgeConfig.TABLE.policy)
            if (p.get(policyId)) policy = p
        }
        if (policy && !dex.getValue('source_table')) dex.setValue('source_table', policy.getValue('table') || '')
        if (policy && !dex.getValue('target_table')) {
            dex.setValue('target_table', policy.getValue('target_table') || policy.getValue('table') || '')
        }
        if (policy && !dex.getValue('filter_snapshot')) dex.setValue('filter_snapshot', policy.getValue('condition') || '')
        if (configId) {
            var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
            if (cfg.get(configId)) {
                if (!dex.getValue('source_instance')) dex.setValue('source_instance', cfg.getValue('source_instance') || '')
                if (!dex.getValue('target_instance')) dex.setValue('target_instance', cfg.getValue('target_instance') || '')
                if (!dex.getValue('source_table')) dex.setValue('source_table', cfg.getValue('source_table') || '')
                if (!dex.getValue('target_table')) dex.setValue('target_table', cfg.getValue('target_table') || '')
                if (!dex.getValue('filter_snapshot')) dex.setValue('filter_snapshot', cfg.getValue('filter') || '')
            }
        }
        var local = this.config.localPeerId() || ''
        if (local && !dex.getValue('source_instance')) dex.setValue('source_instance', local)
        if (run.getValue('peer') && !dex.getValue('target_instance')) {
            dex.setValue('target_instance', run.getValue('peer'))
        }
    },

    _snapshot: function (run, policyId, configId) {
        var snap = {
            phase: 1,
            contract: 'case1_apply',
            run: run.getUniqueValue(),
            run_type: run.getValue('type') || '',
            peer: run.getValue('peer') || '',
            policy: policyId || '',
            movement_config: configId || '',
            captured_at: new GlideDateTime().getValue(),
            note: 'Frozen at dual-write start. Case 1 still uses the sync policy and /apply.',
        }
        if (configId) {
            var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
            if (cfg.get(configId)) {
                snap.name = cfg.getValue('name') || ''
                snap.direction = cfg.getValue('direction') || ''
                snap.source_table = cfg.getValue('source_table') || ''
                snap.target_table = cfg.getValue('target_table') || ''
                snap.filter = cfg.getValue('filter') || ''
                snap.operation = cfg.getValue('operation') || ''
                snap.match_strategy = cfg.getValue('match_strategy') || ''
                snap.batch_size = cfg.getValue('batch_size') || ''
                snap.preserve_sys_id = cfg.getValue('preserve_sys_id') || ''
                snap.apply_mode = cfg.getValue('apply_mode') || ''
            }
        }
        return JSON.stringify(snap)
    },

    _result: function (processed, failed, skipped) {
        if (skipped) return 'cancelled'
        if (failed > 0 && processed > 0) return 'partially_completed'
        if (failed > 0) return 'failed'
        return 'successful'
    },

    _setDuration: function (dex) {
        try {
            var started = dex.getValue('started_at')
            var ended = dex.getValue('execution_completed_at')
            if (!started || !ended) return
            var seconds = Math.floor(
                (new GlideDateTime(ended).getNumericValue() - new GlideDateTime(started).getNumericValue()) / 1000
            )
            if (seconds > 0) dex.setValue('duration_seconds', seconds)
        } catch (e) {
            gs.warn('[bridge] dual-write duration skipped: ' + e)
        }
    },

    _shadowOutboxRow: function (outboxGr, runId, outcome) {
        var outboxId = outboxGr.getUniqueValue()
        var mapped = this._mapOutcome(outboxGr, outcome)
        var dexId = runId ? this._dexIdForRun(runId) : ''
        var localId = this.config.localPeerId() || ''
        var payloadText = outboxGr.getValue('payload') || ''
        var policyId = this._policyFromPayload(payloadText)
        if (dexId && policyId) this._attachConfigOnce(dexId, policyId)

        var transferId = this._upsertByKey(BridgeConfig.TABLE.transfer, 'outbox:' + outboxId, {
            outbox: outboxId,
            execution: dexId,
            correlation_id: 'SB-' + outboxId,
            stage: mapped.stage,
            transport_status: mapped.transport,
            http_status: mapped.httpStatus,
            record_count: 1,
            source_instance: localId,
            target_instance: outboxGr.getValue('peer') || '',
            source_table: outboxGr.getValue('table') || '',
            source_sys_id: outboxGr.getValue('source_sys_id') || '',
            operation: outboxGr.getValue('op') || '',
            attempts: mapped.attempts,
            error: mapped.error,
        })

        var now = new GlideDateTime().getValue()
        var auditValues = {
            direction: 'outbound',
            message_type: 'send',
            result: mapped.result,
            correlation_id: 'SB-' + outboxId,
            local_instance: localId,
            remote_instance: outboxGr.getValue('peer') || '',
            transaction_id: outboxId,
            sequence: parseInt(outboxGr.getValue('seq'), 10) || 0,
            record_count: 1,
            payload_hash: this._hash(payloadText),
            source_table: outboxGr.getValue('table') || '',
            source_sys_id: outboxGr.getValue('source_sys_id') || '',
            target_sys_id: mapped.targetSysId,
            http_status: mapped.httpStatus,
            error: mapped.error,
            retry_count: mapped.attempts,
            transfer: transferId || '',
            execution: dexId,
            outbox: outboxId,
        }
        if (mapped.stage === 'sent' || mapped.stage === 'rejected') auditValues.sent_at = now
        this._upsertByKey(BridgeConfig.TABLE.transferAudit, 'outbox:' + outboxId, auditValues)

        this._upsertByKey(BridgeConfig.TABLE.recordResult, 'outbox:' + outboxId, {
            execution: dexId,
            transfer: transferId || '',
            source_table: outboxGr.getValue('table') || '',
            source_sys_id: outboxGr.getValue('source_sys_id') || '',
            target_sys_id: mapped.targetSysId,
            action: outboxGr.getValue('op') || '',
            result: mapped.result,
            error: mapped.error,
        })

        if (mapped.dlqId || mapped.stage === 'rejected' || mapped.stage === 'dead') {
            var errorKey = mapped.dlqId ? 'dlq:' + mapped.dlqId : 'outbox:' + outboxId + ':' + mapped.stage
            var errorValues = {
                error: mapped.error || mapped.stage,
                resolved: false,
                payload: payloadText || '{}',
                source_table: outboxGr.getValue('table') || '',
                source_sys_id: outboxGr.getValue('source_sys_id') || '',
                execution: dexId,
                transfer: transferId || '',
            }
            if (mapped.dlqId) errorValues.dlq = mapped.dlqId
            this._upsertByKey(BridgeConfig.TABLE.processingError, errorKey, errorValues)
        }

        if (dexId) this._rollupExecution(dexId)
    },

    /**
     * Counts and the sent timestamp from transfers and record results already written.
     * Does not set received_count, acknowledged_count, or acknowledgement timestamps.
     * Closed executions keep the run-summary selected/sent/failed figures.
     */
    _rollupExecution: function (dexId) {
        if (!dexId) return
        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        if (!dex.get(dexId)) return
        var state = dex.getValue('execution_state') || 'draft'
        var closed = state === 'completed' || state === 'cancelled'
        var byStage = this._countGrouped(BridgeConfig.TABLE.transfer, dexId, 'stage')
        var sent = (byStage.sent || 0) + (byStage.rejected || 0)
        var failed = (byStage.failed || 0) + (byStage.dead || 0)
        var selected = 0
        for (var stage in byStage) {
            if (Object.prototype.hasOwnProperty.call(byStage, stage)) selected += byStage[stage]
        }
        var outcomes = this._countActionResult(dexId)
        var changed = false
        if (!closed) {
            changed = this._setCount(dex, 'selected_count', selected) || changed
            changed = this._setCount(dex, 'sent_count', sent) || changed
            changed = this._setCount(dex, 'failed_count', failed) || changed
            if (sent > 0 && (state === 'draft' || state === 'queued' || state === 'preparing')) {
                if (this._transitionState(dex, 'sending', 'A transfer has left this instance.')) changed = true
            }
        }
        changed = this._setCount(dex, 'inserted_count', outcomes.inserted) || changed
        changed = this._setCount(dex, 'updated_count', outcomes.updated) || changed
        changed = this._setCount(dex, 'skipped_count', outcomes.skipped) || changed
        if (sent > 0 && !dex.getValue('transfer_sent_at')) {
            dex.setValue('transfer_sent_at', new GlideDateTime().getValue())
            changed = true
        }
        if (changed) dex.update()
    },

    _setCount: function (dex, field, value) {
        var current = parseInt(dex.getValue(field), 10) || 0
        var next = value || 0
        if (current === next) return false
        dex.setValue(field, next)
        return true
    },

    _countGrouped: function (table, dexId, field) {
        var totals = {}
        try {
            var ga = new GlideAggregate(table)
            ga.addQuery('execution', dexId)
            ga.addAggregate('COUNT')
            ga.groupBy(field)
            ga.query()
            while (ga.next()) {
                totals[ga.getValue(field) || ''] = parseInt(ga.getAggregate('COUNT'), 10) || 0
            }
        } catch (e) {
            gs.warn('[bridge] dual-write count ' + table + ' failed (ignored): ' + e)
        }
        return totals
    },

    _countActionResult: function (dexId) {
        var out = { inserted: 0, updated: 0, skipped: 0 }
        try {
            var ga = new GlideAggregate(BridgeConfig.TABLE.recordResult)
            ga.addQuery('execution', dexId)
            ga.addAggregate('COUNT')
            ga.groupBy('action')
            ga.groupBy('result')
            ga.query()
            while (ga.next()) {
                var action = ga.getValue('action') || ''
                var result = ga.getValue('result') || ''
                var n = parseInt(ga.getAggregate('COUNT'), 10) || 0
                if (result === 'skipped') out.skipped += n
                else if (result === 'applied' && action === 'insert') out.inserted += n
                else if (result === 'applied' && (action === 'update' || action === 'upsert')) out.updated += n
            }
        } catch (e) {
            gs.warn('[bridge] dual-write result rollup failed (ignored): ' + e)
        }
        return out
    },

    _mapOutcome: function (outboxGr, outcome) {
        var status = outcome && outcome.status ? outcome.status : ''
        var stage = outcome && outcome.stage ? outcome.stage : ''
        var transport = outcome && outcome.transport ? outcome.transport : ''
        if (!stage) {
            if (status === 'applied' || status === 'skipped') {
                stage = 'sent'
                transport = 'success'
            } else if (status === 'rejected') {
                stage = 'rejected'
                transport = 'success'
            } else if (outcome && outcome.dead) {
                stage = 'dead'
                transport = 'failed'
            } else if (status === 'failed') {
                stage = 'failed'
                transport = 'failed'
            } else if (status === 'queued') {
                stage = 'queued'
                transport = 'pending'
            } else {
                stage = 'failed'
                transport = transport || 'failed'
            }
        }
        var attempts = outcome && typeof outcome.attempts === 'number' ? outcome.attempts : parseInt(outboxGr.getValue('attempts'), 10) || 0
        return {
            stage: stage,
            transport: transport || 'pending',
            result: status || stage,
            error: outcome && outcome.error ? String(outcome.error).substr(0, 4000) : '',
            httpStatus: outcome && outcome.httpStatus ? outcome.httpStatus : '',
            attempts: attempts,
            dead: !!(outcome && outcome.dead),
            dlqId: outcome && outcome.dlqId ? outcome.dlqId : '',
            targetSysId: outcome && outcome.targetSysId ? outcome.targetSysId : '',
        }
    },

    _outcomeFromOutbox: function (row) {
        var state = row.getValue('state') || 'pending'
        if (state === 'sent') return { status: 'applied', stage: 'sent', transport: 'success', attempts: parseInt(row.getValue('attempts'), 10) || 0 }
        if (state === 'dead') {
            var dlqId = ''
            var dlq = new GlideRecord(BridgeConfig.TABLE.dlq)
            dlq.addQuery('outbox_ref', row.getUniqueValue())
            dlq.setLimit(1)
            dlq.query()
            if (dlq.next()) dlqId = dlq.getUniqueValue()
            return {
                status: 'failed',
                stage: 'dead',
                transport: 'failed',
                dead: true,
                dlqId: dlqId,
                attempts: parseInt(row.getValue('attempts'), 10) || 0,
            }
        }
        if (state === 'failed') return { status: 'failed', stage: 'failed', transport: 'failed', attempts: parseInt(row.getValue('attempts'), 10) || 0 }
        return { status: 'queued', stage: 'queued', transport: 'pending', attempts: parseInt(row.getValue('attempts'), 10) || 0 }
    },

    _shadowReceiptRow: function (receiptGr) {
        var id = receiptGr.getUniqueValue()
        var localId = this.config.localPeerId() || ''
        this._upsertByKey(BridgeConfig.TABLE.transferAudit, 'receipt:' + id, {
            direction: 'inbound',
            message_type: 'receive',
            result: 'applied',
            local_instance: localId,
            remote_instance: receiptGr.getValue('peer') || '',
            transaction_id: receiptGr.getValue('source_sys_id') || '',
            sequence: parseInt(receiptGr.getValue('last_seq'), 10) || 0,
            record_count: 1,
            source_sys_id: receiptGr.getValue('source_sys_id') || '',
            target_sys_id: receiptGr.getValue('target_sys_id') || '',
            receipt: id,
        })
    },

    _shadowDlqRow: function (dlqGr) {
        var id = dlqGr.getUniqueValue()
        var outboxId = dlqGr.getValue('outbox_ref') || ''
        var values = {
            dlq: id,
            error: dlqGr.getValue('error') || '',
            payload: dlqGr.getValue('payload') || '{}',
            resolved: dlqGr.getValue('resolved') === '1',
        }
        if (outboxId) {
            values.transfer = this._findId(BridgeConfig.TABLE.transfer, 'legacy_key', 'outbox:' + outboxId)
            var outbox = new GlideRecord(BridgeConfig.TABLE.outbox)
            if (outbox.get(outboxId)) {
                values.source_table = outbox.getValue('table') || ''
                values.source_sys_id = outbox.getValue('source_sys_id') || ''
            }
        }
        this._upsertByKey(BridgeConfig.TABLE.processingError, 'dlq:' + id, values)
    },

    _attachConfigOnce: function (dexId, policyId) {
        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        if (!dex.get(dexId)) return
        if (dex.getValue('configuration')) {
            if (!dex.getValue('name')) {
                this._stampDexName(dex, dex.getValue('configuration'))
                if (dex.getValue('name')) dex.update()
            }
            return
        }
        var configId = this._configIdForPolicy(policyId)
        if (!configId) return
        if (!dex.getValue('configuration')) dex.setValue('configuration', configId)
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (cfg.get(configId)) {
            if (!dex.getValue('source_instance')) dex.setValue('source_instance', cfg.getValue('source_instance') || '')
            if (!dex.getValue('target_instance')) dex.setValue('target_instance', cfg.getValue('target_instance') || '')
            if (!dex.getValue('source_table')) dex.setValue('source_table', cfg.getValue('source_table') || '')
            if (!dex.getValue('target_table')) dex.setValue('target_table', cfg.getValue('target_table') || '')
            if (!dex.getValue('filter_snapshot')) dex.setValue('filter_snapshot', cfg.getValue('filter') || '')
        }
        this._stampDexName(dex, configId)
        // Snapshot stays as written at start. Do not replace it when we learn the policy.
        dex.update()
    },

    _configIdForPolicy: function (policyId) {
        if (!policyId) return ''
        var policy = new GlideRecord(BridgeConfig.TABLE.policy)
        if (policy.get(policyId) && policy.getValue('movement_config')) return policy.getValue('movement_config')
        return this._findId(BridgeConfig.TABLE.movementConfig, 'policy', policyId)
    },

    _dexIdForRun: function (runId) {
        if (!runId) return ''
        return this._findId(BridgeConfig.TABLE.dataExecution, 'legacy_key', 'run:' + runId)
    },

    _receipt: function (peerId, sourceSysId) {
        if (!peerId || !sourceSysId) return null
        var gr = new GlideRecord(BridgeConfig.TABLE.receipt)
        gr.addQuery('peer', peerId)
        gr.addQuery('source_sys_id', sourceSysId)
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) return null
        return {
            sys_id: gr.getUniqueValue(),
            target_sys_id: gr.getValue('target_sys_id') || '',
        }
    },

    _policyFromPayload: function (payloadText) {
        if (!payloadText) return ''
        try {
            var parsed = JSON.parse(payloadText)
            return parsed && parsed.policy ? parsed.policy : ''
        } catch (e) {
            return ''
        }
    },

    _hash: function (text) {
        try {
            if (!text) return ''
            return new GlideDigest().getSHA256Hex(String(text)) || ''
        } catch (e) {
            return ''
        }
    },

    _findId: function (table, field, value) {
        if (!value) return ''
        var gr = new GlideRecord(table)
        if (!gr.isValid()) return ''
        gr.addQuery(field, value)
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr.getUniqueValue() : ''
    },

    _backfillMissing: function (sourceTable, keyPrefix, limit, writer) {
        var gr = new GlideRecord(sourceTable)
        if (!gr.isValid()) return
        gr.orderBy('sys_created_on')
        gr.setLimit(2000)
        gr.query()
        var created = 0
        while (gr.next()) {
            var key = keyPrefix + ':' + gr.getUniqueValue()
            var target = this._backfillTarget(keyPrefix)
            if (!target) return
            if (this._findId(target, 'legacy_key', key)) continue
            try {
                writer.call(this, gr)
            } catch (e) {
                gs.warn('[bridge] dual-write backfill ' + key + ' failed (ignored): ' + e)
            }
            created++
            if (created >= limit) return
        }
    },

    _backfillTarget: function (keyPrefix) {
        if (keyPrefix === 'run') return BridgeConfig.TABLE.dataExecution
        if (keyPrefix === 'outbox') return BridgeConfig.TABLE.transfer
        if (keyPrefix === 'receipt') return BridgeConfig.TABLE.transferAudit
        if (keyPrefix === 'dlq') return BridgeConfig.TABLE.processingError
        return ''
    },

    _upsertByKey: function (table, key, values) {
        if (!key) return ''
        var gr = new GlideRecord(table)
        if (!gr.isValid()) return ''
        gr.addQuery('legacy_key', key)
        gr.setLimit(1)
        gr.query()
        var isNew = !gr.next()
        if (isNew) {
            gr.initialize()
            gr.setValue('legacy_key', key)
            // DEX/TRN autoNumber runs only when number is still empty.
        }
        var changed = isNew
        for (var field in values) {
            if (!Object.prototype.hasOwnProperty.call(values, field)) continue
            if (values[field] === undefined || values[field] === '') continue
            if (
                (field === 'correlation_id' ||
                    field === 'sent_at' ||
                    field === 'remote_received_at' ||
                    field === 'payload_hash') &&
                gr.getValue(field)
            ) {
                continue
            }
            if (this._assign(gr, field, values[field])) changed = true
        }
        if (!changed) return gr.getUniqueValue()
        if (isNew) return gr.insert() || ''
        gr.update()
        return gr.getUniqueValue()
    },

    _assign: function (gr, field, value) {
        if (field === 'number') return false
        if (value === undefined || value === null || value === '') return false
        if (!gr.isValidField(field)) return false
        var current = gr.getValue(field)
        if (typeof value === 'boolean') {
            var wantBool = value ? '1' : '0'
            if ((current || '0') === wantBool) return false
            gr.setValue(field, value)
            return true
        }
        var want = String(value)
        if ((current || '') === want) return false
        gr.setValue(field, value)
        return true
    },

    type: 'BridgeDualWrite',
}
