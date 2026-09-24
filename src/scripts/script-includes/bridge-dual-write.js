/**
 * BridgeDualWrite — Phase 1 shadows for Data Movement Configuration, Data Execution,
 * Transfer, Transfer Audit, Processing Error, and Record Result.
 *
 * Case 1 capture → outbox → drain → /apply is unchanged. Every public method is
 * best-effort: a failure is logged and swallowed. Callers still wrap these calls.
 *
 * Idempotency keys:
 *   configuration  policy sys_id
 *   execution      run:<sync run sys_id> for Case 1 shadows, ctrl:<dex sys_id> for controller rows
 *   transfer       outbox:<outbox sys_id>
 *   audit          outbox:<id>  or  receipt:<id>  or  apply:<peer>:<source>:<seq>:<status>
 *   error          dlq:<dlq sys_id>
 *   record result  outbox:<id>  or  apply:<peer>:<source>:<seq>
 *
 * config_snapshot is written once and never replaced.
 * Correlation ID is SB- + outbox sys_id and is copied onto the /apply payload.
 * DEX/TRN inserts use newRecord() and never set number. The before-insert rule (or the
 * number column default) assigns DEX###### / TRN###### from sys_number. Epoch numbers are not written.
 * When movement_config.ack_required is false, acknowledgement milestones stay empty and
 * HTTP 200 still completes the execution. When it is true, the result waits for ACK.
 *
 * 0.4.2: a drain run is a transport poll, not a movement. _shadowRunById does not
 * insert a Data Execution for type=drain, and it does not insert or complete a row
 * whose configuration is empty. continueQueued / drain stay idempotent.
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

    /**
     * Link a controller-created DEX (legacy_key ctrl:) to the seed run.
     * Does not insert a second run: shadow.
     */
    attachControllerRun: function (executionId, runId) {
        this._guard('attachControllerRun', function () {
            if (!executionId || !runId) return
            var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
            if (!dex.get(executionId)) return
            if (!this._isControllerDex(dex)) return
            if (!dex.getValue('run')) dex.setValue('run', runId)
            var state = dex.getValue('execution_state') || ''
            if (state === 'draft' || state === 'queued' || state === 'validating' || state === 'preparing') {
                this._transitionState(dex, 'reading_source', 'Execution controller started reading the source through BridgeSeed.')
            }
            dex.update()
        })
    },

    /** Recount transfers and close a controller execution once the drain has settled. */
    completeControllerIfReady: function (executionId) {
        this._guard('completeControllerIfReady', function () {
            this._rollupExecution(executionId)
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

    /**
     * Source-side staged ACK. Idempotent advancement of one transfer and its execution.
     * A configuration that does not require acknowledgement keeps the Case 1 result.
     */
    onAckReceived: function (body) {
        this._lastAck = { ok: true, pending: true }
        this._guard('onAckReceived', function () {
            this._lastAck = this._applyAck(body || {}) || { ok: true, pending: true }
        })
        return this._lastAck
    },

    /**
     * Target-side terminal ACK audit. Returns the audit sys_id for remote_audit_id.
     * Does not change the /apply item result.
     */
    onAckSent: function (peerId, item, out, built) {
        var id = ''
        this._guard('onAckSent', function () {
            id = this._writeTargetAck(peerId, item, built || {})
        })
        return id
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
                correlation_id: item.correlation_id || '',
                ack_stage: 'received',
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

        // Drain creates a new x_33764_sbridge_run on every poll. Shadowing that run
        // inserted a second Data Execution with an empty configuration (the drain
        // row has no seed policy) and onRunClosed then marked it Completed /
        // Successful — including selected=0 rows when the poll sent nothing.
        // Transfers already roll onto the controller execution from the outbox
        // payload (onOutboxSettled). Do not mint a DEX for the poll itself.
        if ((run.getValue('type') || '') === 'drain') return

        var key = 'run:' + runId
        var dex = this._controllerDexForRun(runId)
        var isNew = false
        if (!dex) {
            dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
            dex.addQuery('legacy_key', key)
            dex.setLimit(1)
            dex.query()
            isNew = !dex.next()
            if (isNew) {
                // newRecord() applies defaults without forcing number to ''. Do not set number.
                dex.newRecord()
                dex.setValue('legacy_key', key)
                dex.setValue('run', runId)
            }
        }
        // Controller rows are finished by _rollupExecution, not by closing a sync run.
        if (!isNew && this._isControllerDex(dex) && phase === 'close') return

        var type = run.getValue('type') || ''
        var policyId = run.getValue('seed_policy') || ''
        var configId = policyId ? this._configIdForPolicy(policyId) : ''
        if (!configId) configId = dex.getValue('configuration') || ''
        // Never insert, and never mark Completed/Successful, without a configuration.
        if (!configId) return
        if (!dex.getValue('configuration')) dex.setValue('configuration', configId)
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

        if (phase === 'seed' && this._isControllerDex(dex)) {
            var enqueuedCtrl = parseInt(run.getValue('processed'), 10) || 0
            dex.setValue('selected_count', enqueuedCtrl)
            if (summary && summary.done) {
                if (!dex.getValue('source_read_completed_at')) {
                    dex.setValue('source_read_completed_at', new GlideDateTime().getValue())
                }
                if (enqueuedCtrl === 0) {
                    dex.setValue('execution_result', 'successful')
                    if (!dex.getValue('execution_completed_at')) {
                        dex.setValue('execution_completed_at', new GlideDateTime().getValue())
                    }
                    this._transitionState(
                        dex,
                        'completed',
                        'Source read matched no rows. Nothing was queued. Target data was not changed. Acknowledgement stays empty.'
                    )
                    this._setDuration(dex)
                } else {
                    this._transitionState(
                        dex,
                        'sending',
                        'Source read finished. ' +
                            enqueuedCtrl +
                            ' row(s) are in the outbox. The existing drain sends them.' +
                            (this._ackRequired(dex)
                                ? ' The result waits for acknowledgement.'
                                : ' Acknowledgement is not required.')
                    )
                }
            } else {
                this._transitionState(dex, 'reading_source', 'Reading source rows for this execution.')
            }
        } else if (phase === 'seed') {
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

        if (phase === 'close' && this._ackRequired(dex)) {
            var ackState = dex.getValue('execution_state') || ''
            if (ackState !== 'completed' && ackState !== 'cancelled') {
                var ackProcessed = parseInt(run.getValue('processed'), 10) || 0
                var ackFailed = parseInt(run.getValue('failed'), 10) || 0
                if (summary && typeof summary.processed === 'number') ackProcessed = summary.processed
                if (summary && typeof summary.failed === 'number') ackFailed = summary.failed
                if (!dex.getValue('selected_count')) dex.setValue('selected_count', ackProcessed + ackFailed)
                if (ackProcessed > 0) dex.setValue('sent_count', ackProcessed)
                if (ackFailed > 0) dex.setValue('failed_count', ackFailed)
                if (ackProcessed > 0 && !dex.getValue('transfer_sent_at')) {
                    dex.setValue('transfer_sent_at', new GlideDateTime().getValue())
                }
                if (
                    ackState === 'sending' ||
                    ackState === 'reading_source' ||
                    ackState === 'awaiting_receipt' ||
                    ackState === 'preparing' ||
                    ackState === 'draft'
                ) {
                    this._transitionState(
                        dex,
                        'awaiting_acknowledgement',
                        'Transport finished. Waiting for staged acknowledgement. HTTP 200 is not completion.'
                    )
                }
                this._completeWhenAcknowledged(dex)
            }
        } else if (phase === 'close') {
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

        if (isNew) {
            if (!dex.getValue('configuration')) return
            this._ensurePlatformNumber(dex)
            dex.insert()
        } else dex.update()
        var closedState = dex.getValue('execution_state') || ''
        if (this._isControllerDex(dex) && (closedState === 'completed' || closedState === 'cancelled')) {
            this._touchConfigFromDex(dex)
        }
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
            validating: 'Validating',
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
                snap.ack_required = this._truthy(cfg.getValue('ack_required'))
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
        var localId = this.config.localPeerId() || ''
        var payloadText = outboxGr.getValue('payload') || ''
        var dexId = this._executionFromPayload(payloadText)
        if (!dexId && runId) dexId = this._dexIdForRun(runId)
        var policyId = this._policyFromPayload(payloadText)
        if (dexId && policyId) this._attachConfigOnce(dexId, policyId)

        var correlation = this._correlation(payloadText, outboxId)
        var transferId = this._upsertByKey(BridgeConfig.TABLE.transfer, 'outbox:' + outboxId, {
            outbox: outboxId,
            execution: dexId,
            correlation_id: correlation,
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
            correlation_id: correlation,
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
        var controller = this._isControllerDex(dex)
        var byStage = this._countGrouped(BridgeConfig.TABLE.transfer, dexId, 'stage')
        var sent = (byStage.sent || 0) + (byStage.rejected || 0)
        var failed = (byStage.failed || 0) + (byStage.dead || 0)
        var selected = 0
        for (var stage in byStage) {
            if (Object.prototype.hasOwnProperty.call(byStage, stage)) selected += byStage[stage]
        }
        var outcomes = this._countActionResult(dexId)
        var changed = false
        if (!closed && !controller) {
            changed = this._setCount(dex, 'selected_count', selected) || changed
            changed = this._setCount(dex, 'sent_count', sent) || changed
            changed = this._setCount(dex, 'failed_count', failed) || changed
            if (sent > 0 && (state === 'draft' || state === 'queued' || state === 'preparing')) {
                if (this._transitionState(dex, 'sending', 'A transfer has left this instance.')) changed = true
            }
        }
        if (!closed && controller) {
            changed = this._setCount(dex, 'sent_count', byStage.sent || 0) || changed
            changed = this._setCount(dex, 'failed_count', byStage.dead || 0) || changed
            if ((byStage.sent || 0) > 0 && (state === 'queued' || state === 'reading_source' || state === 'preparing' || state === 'validating')) {
                if (this._transitionState(dex, 'sending', 'A transfer has left this instance.')) changed = true
            }
            if (this._maybeCompleteController(dex, byStage)) changed = true
        }
        changed = this._setCount(dex, 'inserted_count', outcomes.inserted) || changed
        changed = this._setCount(dex, 'updated_count', outcomes.updated) || changed
        changed = this._setCount(dex, 'skipped_count', outcomes.skipped) || changed
        if (sent > 0 && !dex.getValue('transfer_sent_at')) {
            dex.setValue('transfer_sent_at', new GlideDateTime().getValue())
            changed = true
        }
        if (changed) dex.update()
        var endState = dex.getValue('execution_state') || ''
        if (controller && (endState === 'completed' || endState === 'cancelled')) this._touchConfigFromDex(dex)
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
        // Transport succeeded. Keep stage at sent until the terminal ACK when required.
        if (outcome && outcome.ackHold && (stage === 'sent' || stage === 'rejected')) {
            stage = 'sent'
            transport = 'success'
        }
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

    _correlation: function (payloadText, outboxId) {
        try {
            var parsed = JSON.parse(payloadText || '{}')
            if (parsed && parsed.correlation_id) return String(parsed.correlation_id).substr(0, 80)
        } catch (e) {
            // Fall through to the outbox stub.
        }
        return BridgeAck.correlationFor(outboxId)
    },

    _truthy: function (value) {
        var raw = String(value == null ? '' : value)
            .trim()
            .toLowerCase()
        return raw === '1' || raw === 'true'
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
        var controller = this._controllerDexForRun(runId)
        if (controller) return controller.getUniqueValue()
        return this._findId(BridgeConfig.TABLE.dataExecution, 'legacy_key', 'run:' + runId)
    },

    _isControllerDex: function (dex) {
        if (!dex) return false
        return (dex.getValue('legacy_key') || '').indexOf('ctrl:') === 0
    },

    _controllerDexForRun: function (runId) {
        if (!runId) return null
        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        if (!dex.isValid()) return null
        dex.addQuery('run', runId)
        dex.addQuery('legacy_key', 'STARTSWITH', 'ctrl:')
        dex.setLimit(1)
        dex.query()
        if (!dex.next()) return null
        return dex
    },

    _executionFromPayload: function (payloadText) {
        if (!payloadText) return ''
        try {
            var parsed = JSON.parse(payloadText)
            var id = parsed && parsed.execution ? parsed.execution : ''
            if (!id) return ''
            var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
            if (!dex.get(id)) return ''
            if (!this._isControllerDex(dex)) return ''
            return id
        } catch (e) {
            return ''
        }
    },

    /**
     * Close a controller execution after seed has finished and every transfer is terminal.
     * Does not write acknowledgement fields or the transfer validated stage.
     */
    _maybeCompleteController: function (dex, byStage) {
        if (!this._isControllerDex(dex)) return false
        if (!dex.getValue('configuration')) return false
        var mode = dex.getValue('execution_mode') || ''
        if (mode === 'dry_run' || mode === 'reconciliation') return false
        var state = dex.getValue('execution_state') || ''
        if (state === 'completed' || state === 'cancelled') return false
        if (!dex.getValue('source_read_completed_at')) return false
        if (this._ackRequired(dex)) return this._completeWhenAcknowledged(dex)
        byStage = byStage || {}
        var selected = parseInt(dex.getValue('selected_count'), 10) || 0
        var open = (byStage.queued || 0) + (byStage.failed || 0)
        var sent = byStage.sent || 0
        var dead = byStage.dead || 0
        var rejected = byStage.rejected || 0
        if (selected > 0 && (open > 0 || sent + dead + rejected < selected)) return false
        var result = 'successful'
        if (dead > 0 && sent > 0) result = 'partially_completed'
        else if (dead > 0) result = 'failed'
        else if (rejected > 0) result = 'successful_with_warnings'
        dex.setValue('execution_result', result)
        dex.setValue('failed_count', dead)
        var now = new GlideDateTime().getValue()
        if (!dex.getValue('transfer_completed_at') && selected > 0) dex.setValue('transfer_completed_at', now)
        if (!dex.getValue('execution_completed_at')) dex.setValue('execution_completed_at', now)
        this._transitionState(
            dex,
            'completed',
            'Drain finished for this execution. Result: ' +
                this._resultLabel(result) +
                '. Acknowledgement stays empty.'
        )
        this._setDuration(dex)
        return true
    },

    _ackRequired: function (dex) {
        try {
            return new BridgeAck().requiredForDex(dex)
        } catch (e) {
            gs.warn('[bridge] ack requirement check failed (treated as not required): ' + e)
            return false
        }
    },

    /**
     * Rank transfer stages so a late RECEIVED cannot undo a terminal ACK.
     * Transport-retry `failed` stays below sent. ACK `failed` has transport success.
     */
    _stageRank: function (stage, transport) {
        if (stage === 'completed' || stage === 'rejected' || stage === 'dead') return 50
        if (stage === 'failed' && transport === 'success') return 50
        if (stage === 'processed') return 40
        if (stage === 'accepted') return 30
        if (stage === 'validated') return 20
        if (stage === 'received') return 10
        if (stage === 'sent') return 5
        if (stage === 'failed') return 4
        return 0
    },

    _terminalAck: function (stage) {
        return stage === 'completed' || stage === 'failed' || stage === 'rejected'
    },

    _applyAck: function (body) {
        var correlation = body.correlation_id || ''
        var stage = body.ack_stage || ''
        var transfer = new GlideRecord(BridgeConfig.TABLE.transfer)
        var found = false
        if (body.transfer_id && transfer.get(body.transfer_id)) found = true
        if (!found) {
            transfer = new GlideRecord(BridgeConfig.TABLE.transfer)
            transfer.addQuery('correlation_id', correlation)
            transfer.setLimit(1)
            transfer.query()
            found = transfer.next()
        }
        if (!found) return { ok: true, pending: true }

        var dexId = transfer.getValue('execution') || body.execution_id || ''
        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        if (!dexId || !dex.get(dexId)) {
            return { ok: true, pending: false, transfer: transfer.getUniqueValue(), execution: '' }
        }
        if (!this._ackRequired(dex)) {
            return {
                ok: true,
                pending: false,
                ignored: true,
                transfer: transfer.getUniqueValue(),
                execution: dexId,
            }
        }

        var transport = transfer.getValue('transport_status') || ''
        var currentStage = transfer.getValue('stage') || ''
        var advanced = this._stageRank(stage, 'success') > this._stageRank(currentStage, transport)
        if (advanced) {
            transfer.setValue('stage', stage)
            if (body.error && (stage === 'failed' || stage === 'rejected')) {
                transfer.setValue('error', String(body.error).substr(0, 4000))
            }
            if (!transfer.getValue('transport_status')) transfer.setValue('transport_status', 'success')
            transfer.update()
        }

        var now = new GlideDateTime().getValue()
        var changed = false
        if (!dex.getValue('target_received_at')) {
            dex.setValue('target_received_at', now)
            changed = true
        }
        if (this._terminalAck(stage)) {
            if (!dex.getValue('target_processing_completed_at')) {
                dex.setValue('target_processing_completed_at', now)
                changed = true
            }
            if (!dex.getValue('acknowledged_at')) {
                dex.setValue('acknowledged_at', now)
                changed = true
            }
        }
        if (this._recountAck(dex)) changed = true

        if (advanced) {
            var note = 'Sync Bridge: acknowledgement ' + String(stage).toUpperCase() + ' for ' + correlation + '.'
            var counts = body.counts || {}
            if (stage === 'completed' && (counts.updated || counts.inserted || counts.skipped)) {
                note +=
                    ' ' +
                    (parseInt(counts.inserted, 10) || 0) +
                    ' inserted, ' +
                    (parseInt(counts.updated, 10) || 0) +
                    ' updated, ' +
                    (parseInt(counts.skipped, 10) || 0) +
                    ' skipped.'
            }
            if (body.error && (stage === 'failed' || stage === 'rejected')) {
                note += ' ' + String(body.error).substr(0, 240)
            }
            dex.work_notes = note
            changed = true
        }

        var state = dex.getValue('execution_state') || ''
        if (!this._terminalAck(stage) && state !== 'completed' && state !== 'cancelled') {
            var next = stage === 'processed' || stage === 'validated' || stage === 'accepted' ? 'processing_target' : 'awaiting_acknowledgement'
            if (state !== next && state !== 'finalising') {
                this._transitionState(dex, next, 'Correlation ' + correlation + ' is at ' + stage + '.')
                changed = true
            }
        }

        if (this._isControllerDex(dex)) {
            if (this._maybeCompleteController(dex)) changed = true
        } else if (this._completeWhenAcknowledged(dex)) changed = true

        if (changed) dex.update()
        if ((dex.getValue('execution_state') || '') === 'completed') this._touchConfigFromDex(dex)
        return { ok: true, pending: false, transfer: transfer.getUniqueValue(), execution: dexId }
    },

    _recountAck: function (dex) {
        var received = 0
        var acked = 0
        var gr = new GlideRecord(BridgeConfig.TABLE.transfer)
        gr.addQuery('execution', dex.getUniqueValue())
        gr.query()
        while (gr.next()) {
            var rank = this._stageRank(gr.getValue('stage') || '', gr.getValue('transport_status') || '')
            if (rank >= 10) received++
            if (rank >= 50) acked++
        }
        var changed = false
        changed = this._setCount(dex, 'received_count', received) || changed
        changed = this._setCount(dex, 'acknowledged_count', acked) || changed
        return changed
    },

    /**
     * Close only when every transfer is terminal under acknowledgement.
     * sent + HTTP 200 is not enough. Does not set a successful result before that.
     */
    _completeWhenAcknowledged: function (dex) {
        var state = dex.getValue('execution_state') || ''
        if (state === 'completed' || state === 'cancelled') return false
        var selected = parseInt(dex.getValue('selected_count'), 10) || 0
        if (!(selected > 0)) return false
        var gr = new GlideRecord(BridgeConfig.TABLE.transfer)
        gr.addQuery('execution', dex.getUniqueValue())
        gr.query()
        var waiting = 0
        var completed = 0
        var failed = 0
        var retrying = 0
        while (gr.next()) {
            var stage = gr.getValue('stage') || ''
            var transport = gr.getValue('transport_status') || ''
            var rank = this._stageRank(stage, transport)
            if (rank >= 50) {
                if (stage === 'completed') completed++
                else failed++
            } else if (rank >= 5) waiting++
            else retrying++
        }
        if (retrying > 0) return false
        if (waiting > 0 || completed + failed < selected) {
            if (waiting > 0 && (state === 'sending' || state === 'reading_source' || state === 'awaiting_receipt' || state === 'preparing' || state === 'queued')) {
                return this._transitionState(
                    dex,
                    'awaiting_acknowledgement',
                    'Transport succeeded. The result waits for acknowledgement. HTTP 200 is not completion.'
                )
            }
            return false
        }
        var result = 'successful'
        if (failed > 0 && completed > 0) result = 'partially_completed'
        else if (failed > 0) result = 'failed'
        dex.setValue('execution_result', result)
        var now = new GlideDateTime().getValue()
        if (!dex.getValue('acknowledged_at')) dex.setValue('acknowledged_at', now)
        if (!dex.getValue('target_processing_completed_at')) dex.setValue('target_processing_completed_at', now)
        if (!dex.getValue('transfer_completed_at')) dex.setValue('transfer_completed_at', now)
        if (!dex.getValue('execution_completed_at')) dex.setValue('execution_completed_at', now)
        this._transitionState(dex, 'finalising', 'Applying the terminal acknowledgement.')
        this._transitionState(dex, 'completed', 'Acknowledgement finished. Result: ' + this._resultLabel(result) + '.')
        this._setDuration(dex)
        return true
    },

    _writeTargetAck: function (peerId, item, built) {
        if (!item || !item.correlation_id || !built || !built.ack_stage) return ''
        var now = new GlideDateTime().getValue()
        var localId = this.config.localPeerId() || ''
        return this._upsertByKey(
            BridgeConfig.TABLE.transferAudit,
            'ack:' + item.correlation_id + ':' + built.ack_stage,
            {
                direction: 'outbound',
                message_type: 'ack',
                result: built.result || built.ack_stage,
                correlation_id: item.correlation_id,
                ack_stage: built.ack_stage,
                local_instance: localId,
                remote_instance: peerId || '',
                transaction_id: item.source_sys_id || '',
                sequence: item.seq || 0,
                record_count: 1,
                source_table: item.table || '',
                source_sys_id: item.source_sys_id || '',
                target_sys_id: '',
                acknowledged_at: now,
                error: built.error || '',
            }
        )
    },

    _touchConfigFromDex: function (dex) {
        if (!dex) return
        var configId = dex.getValue('configuration')
        if (!configId) return
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.isValid() || !cfg.get(configId) || !cfg.isValidField('last_execution')) return
        cfg.setValue('last_execution', dex.getUniqueValue())
        var stamp = dex.getValue('execution_completed_at') || dex.getValue('started_at') || ''
        if (stamp && cfg.isValidField('last_run_at')) cfg.setValue('last_run_at', stamp)
        var result = dex.getValue('execution_result') || ''
        if (result && cfg.isValidField('last_result')) cfg.setValue('last_result', result)
        cfg.setWorkflow(false)
        cfg.update()
        var scheduleId = dex.getValue('schedule')
        if (!scheduleId || !result) return
        var sch = new GlideRecord(BridgeConfig.TABLE.executionSchedule)
        if (!sch.isValid() || !sch.get(scheduleId)) return
        if (sch.getValue('previous_execution') !== dex.getUniqueValue() && sch.getValue('previous_execution')) return
        sch.setValue('previous_execution', dex.getUniqueValue())
        sch.setValue('previous_result', result)
        sch.setWorkflow(false)
        sch.update()
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
            // Drain polls and controller-linked seed runs are not missing shadows.
            // Counting them used to walk the same rows on every drain() and, for
            // drain runs, insert an empty Data Execution each time the legacy_key
            // lookup missed (controller rows use ctrl:, not run:).
            if (keyPrefix === 'run' && (gr.getValue('type') || '') === 'drain') continue
            if (keyPrefix === 'run' && this._controllerDexForRun(gr.getUniqueValue())) continue
            var key = keyPrefix + ':' + gr.getUniqueValue()
            var target = this._backfillTarget(keyPrefix)
            if (!target) return
            if (this._findId(target, 'legacy_key', key)) continue
            try {
                writer.call(this, gr)
            } catch (e) {
                gs.warn('[bridge] dual-write backfill ' + key + ' failed (ignored): ' + e)
            }
            // A writer that refuses an empty configuration must not consume the budget.
            if (!this._findId(target, 'legacy_key', key)) continue
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
            // newRecord() for TRN (and any other shadow). Never write number; the before-insert rule pads it.
            gr.newRecord()
            gr.setValue('legacy_key', key)
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
        if (isNew) {
            this._ensurePlatformNumber(gr)
            return gr.insert() || ''
        }
        gr.update()
        return gr.getUniqueValue()
    },

    /**
     * Fill DEX###### / TRN###### before insert when number is still nil.
     * The before-insert rule does the same and no-ops if this already set a value.
     * getNextObjNumberPadded consumes sys_number. Epoch milliseconds are never used.
     */
    _ensurePlatformNumber: function (gr) {
        if (!gr || !gr.isValidField('number')) return
        var table = gr.getTableName()
        if (table !== BridgeConfig.TABLE.dataExecution && table !== BridgeConfig.TABLE.transfer) return
        if (gr.getValue('number')) return
        var assigned = ''
        try {
            assigned = new GlideNumberManager(table).getNextObjNumberPadded()
        } catch (e1) {
            gs.warn('[bridge] GlideNumberManager failed for ' + table + ': ' + e1)
        }
        if (!assigned) {
            try {
                assigned = new NumberManager(table).getNextObjNumberPadded()
            } catch (e2) {
                gs.warn('[bridge] NumberManager failed for ' + table + ': ' + e2)
            }
        }
        if (!assigned) assigned = this._nextFromSysNumber(table)
        if (assigned) gr.setValue('number', assigned)
    },

    _nextFromSysNumber: function (tableName) {
        var row = new GlideRecord('sys_number')
        if (!row.isValid()) return ''
        row.addQuery('category', tableName)
        row.setLimit(1)
        row.query()
        if (!row.next()) return ''
        var prefix = row.getValue('prefix') || ''
        var digits = parseInt(row.getValue('maximum_digits'), 10) || 6
        var n = parseInt(row.getValue('number'), 10)
        if (isNaN(n) || n < 1) n = 1
        var padded = String(n)
        while (padded.length < digits) padded = '0' + padded
        row.setValue('number', String(n + 1))
        if (!row.update()) return ''
        return prefix + padded
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
