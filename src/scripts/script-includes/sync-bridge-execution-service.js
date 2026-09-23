/**
 * SyncBridgeExecutionService — when and how a Data Movement Configuration runs.
 *
 * Configuration defines what. This service starts the run. Data Execution tracks it.
 * Transfer still happens only through BridgeSeed → outbox → the existing drain
 * (BridgeTransport) → /apply. UI actions, the schedule job, REST, and Flow call
 * these methods. They do not move records themselves.
 *
 * Execute and dry run return as soon as the DEX row exists. A separate job calls
 * continueQueued, which pages BridgeSeed (execute) or a local read (dry run).
 * Dry run does not enqueue outbox rows and does not write transfer validated / ACK
 * fields (those stay Phase 3).
 *
 * Controller DEX rows use legacy_key ctrl:<sys_id>. Case 1 shadows stay run:<run>.
 */
var SyncBridgeExecutionService = Class.create()

SyncBridgeExecutionService.SCHEDULE_JOB = 'Sync Bridge — run execution schedules'
SyncBridgeExecutionService.EARLY = {
    draft: true,
    queued: true,
    validating: true,
    preparing: true,
    reading_source: true,
}
SyncBridgeExecutionService.RUNNING = {
    preparing: true,
    reading_source: true,
    sending: true,
    awaiting_receipt: true,
    received: true,
    processing_target: true,
    awaiting_acknowledgement: true,
    finalising: true,
}

SyncBridgeExecutionService.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
    },

    /**
     * @returns {{ok:boolean, status:string, findings:Array, message:string}}
     */
    validate: function (configurationId, opts) {
        opts = opts || {}
        var loaded = this._loadConfig(configurationId)
        if (!loaded.ok) return this._invalid(loaded.message)
        if (!this._allow(opts)) return this._forbidden()

        var cfg = loaded.row
        var findings = []
        var forStart = !!opts.forStart

        if (cfg.getValue('active') !== '1') {
            findings.push({
                level: forStart ? 'error' : 'warning',
                message: 'Configuration is inactive.',
            })
        }
        if (!cfg.getValue('name')) findings.push({ level: 'error', message: 'Name is required.' })
        var sourceTable = cfg.getValue('source_table') || ''
        var targetTable = cfg.getValue('target_table') || ''
        if (!sourceTable) findings.push({ level: 'error', message: 'Source table is required.' })
        if (!targetTable) {
            findings.push({ level: 'warning', message: 'Target table is empty. Apply uses the source table name.' })
        }
        var sourceInstance = cfg.getValue('source_instance') || ''
        var targetInstance = cfg.getValue('target_instance') || ''
        if (!sourceInstance) findings.push({ level: 'error', message: 'Source instance is required.' })
        if (!targetInstance) findings.push({ level: 'error', message: 'Target instance is required.' })
        if (sourceInstance && targetInstance && sourceInstance === targetInstance) {
            findings.push({ level: 'error', message: 'Source and target instance are the same.' })
        }
        if ((cfg.getValue('direction') || '') !== 'outbound') {
            findings.push({
                level: 'error',
                message: 'Execute uses an outbound configuration. Capture and seed stay outbound.',
            })
        }

        var policyId = cfg.getValue('policy') || ''
        var policy = null
        if (!policyId) {
            findings.push({
                level: 'error',
                message: 'No sync policy is linked. BridgeSeed is policy-id only, so Execute cannot start.',
            })
        } else {
            policy = new GlideRecord(BridgeConfig.TABLE.policy)
            if (!policy.get(policyId)) {
                findings.push({ level: 'error', message: 'Linked sync policy was not found.' })
                policy = null
            } else {
                if (policy.getValue('active') !== '1') {
                    findings.push({ level: 'error', message: 'Linked sync policy is inactive.' })
                }
                if (policy.getValue('direction') !== 'outbound') {
                    findings.push({ level: 'error', message: 'Linked sync policy is not outbound.' })
                }
                if (sourceTable && policy.getValue('table') && policy.getValue('table') !== sourceTable) {
                    findings.push({
                        level: 'error',
                        message: 'Policy table does not match the configuration source table.',
                    })
                }
                if (targetInstance && policy.getValue('peer') && policy.getValue('peer') !== targetInstance) {
                    findings.push({
                        level: 'warning',
                        message: 'Policy remote peer differs from the configuration target instance.',
                    })
                }
            }
        }

        if (targetInstance) {
            var peer = new GlideRecord(BridgeConfig.TABLE.peer)
            if (peer.get(targetInstance)) {
                if (peer.getValue('active') !== '1') {
                    findings.push({ level: 'warning', message: 'Target instance is inactive. Drain will not send.' })
                }
                if (!peer.getValue('connection_alias') && !peer.getValue('oauth_profile')) {
                    findings.push({
                        level: 'warning',
                        message: 'Target instance has no connection alias or OAuth profile.',
                    })
                }
            }
        }

        if (sourceTable) {
            var probe = new GlideRecord(sourceTable)
            if (!probe.isValid()) {
                findings.push({ level: 'error', message: 'Source table ' + sourceTable + ' is not valid.' })
            } else if (cfg.getValue('filter')) {
                try {
                    probe.addEncodedQuery(cfg.getValue('filter'))
                    probe.setLimit(1)
                    probe.query()
                } catch (e) {
                    findings.push({ level: 'error', message: 'Filter could not be evaluated: ' + e })
                }
            }
        }

        var batch = parseInt(cfg.getValue('batch_size'), 10)
        if (isNaN(batch) || batch < 1) findings.push({ level: 'warning', message: 'Batch size is blank. Seed will use the default.' })

        var status = this._statusFromFindings(findings)
        var message = this._findingSummary(status, findings)
        this._stampValidation(cfg, status)
        cfg.work_notes = 'Sync Bridge: validated configuration. ' + message
        cfg.update()
        return { ok: status !== 'invalid', status: status, findings: findings, message: message }
    },

    /**
     * Read-only sample. Does not write the target, the outbox, or a DEX.
     */
    preview: function (configurationId, opts) {
        opts = opts || {}
        var check = this.validate(configurationId, { trigger_type: opts.trigger_type, forStart: false })
        if (check.status === 'invalid' && !opts.allowInvalid) {
            return {
                ok: false,
                status: check.status,
                findings: check.findings,
                matched: 0,
                sample: [],
                message: check.message,
                detail_html: '<p>' + this._esc(check.message) + '</p>',
            }
        }
        if (!this._allow(opts)) return this._forbidden()

        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(configurationId)) return this._invalid('Configuration not found.')

        var limit = parseInt(opts.sampleLimit, 10)
        if (isNaN(limit) || limit < 1) limit = 50
        if (limit > 100) limit = 100

        var matched = this._countSource(cfg)
        var sample = []
        var counts = { insert: 0, update: 0, skip: 0, delete: 0 }
        var gr = this._sourceQuery(cfg, '')
        gr.setLimit(limit)
        gr.query()
        while (gr.next()) {
            var predicted = this._predict(gr, cfg)
            counts[predicted.action] = (counts[predicted.action] || 0) + 1
            sample.push({
                source_sys_id: gr.getUniqueValue(),
                name: predicted.name,
                existing_target: predicted.target || '',
                proposed_action: predicted.action,
            })
        }

        var message =
            'Matched ' +
            matched +
            ' record(s). Showing ' +
            sample.length +
            '. Proposed actions in the sample: insert ' +
            counts.insert +
            ', update ' +
            counts.update +
            ', skip ' +
            counts.skip +
            ', delete ' +
            counts.delete +
            '. No target rows were changed.'
        cfg.work_notes = 'Sync Bridge: preview. ' + message
        cfg.setWorkflow(false)
        cfg.update()

        return {
            ok: true,
            status: check.status,
            findings: check.findings,
            matched: matched,
            sample: sample,
            sample_counts: counts,
            would_update_in_sample: counts.update,
            configuration_name: cfg.getValue('name') || '',
            source_label: cfg.getDisplayValue('source_instance') + ' / ' + (cfg.getValue('source_table') || ''),
            target_label: cfg.getDisplayValue('target_instance') + ' / ' + (cfg.getValue('target_table') || cfg.getValue('source_table') || ''),
            filter: cfg.getValue('filter') || '',
            operation: cfg.getValue('operation') || 'upsert',
            reference_handling: cfg.getValue('reference_handling') || '',
            message: message,
            detail_html: this._sampleTable(sample),
        }
    },

    dryRun: function (configurationId, options) {
        options = options || {}
        options.execution_mode = 'dry_run'
        return this._start(configurationId, options, 'dry_run')
    },

    execute: function (configurationId, options) {
        options = options || {}
        var mode = options.execution_mode || 'execute'
        if (mode === 'dry_run') return this.dryRun(configurationId, options)
        return this._start(configurationId, options, mode)
    },

    executeScheduled: function (configurationId, scheduleId) {
        var sch = new GlideRecord(BridgeConfig.TABLE.executionSchedule)
        if (!scheduleId || !sch.get(scheduleId)) {
            return { ok: false, code: 'not_found', message: 'Execution schedule was not found.' }
        }
        if (sch.getValue('active') !== '1') {
            return { ok: false, code: 'inactive', message: 'Execution schedule is inactive.' }
        }
        if ((sch.getValue('configuration') || '') !== configurationId) {
            return { ok: false, code: 'mismatch', message: 'Schedule is not for this configuration.' }
        }
        var overlap = sch.getValue('overlap_policy') || 'do_not_start_if_running'
        if (overlap === 'do_not_start_if_running') {
            var running = this._openExecution(configurationId)
            if (running) {
                return {
                    ok: false,
                    code: 'overlap',
                    message: this._preventMessage(running),
                    dex_id: running.getUniqueValue(),
                    number: running.getValue('number') || '',
                    state: running.getValue('execution_state') || '',
                }
            }
        }
        return this._start(configurationId, {
            trigger_type: 'scheduled',
            trigger_reference: sch.getValue('number') || scheduleId,
            schedule: scheduleId,
            execution_mode: 'execute',
            fromScheduler: true,
        }, 'execute')
    },

    /** Flow Designer hook. Same engine as Execute Now. */
    executeFromFlow: function (configurationId) {
        return this.execute(configurationId, { trigger_type: 'flow', trigger_reference: 'flow' })
    },

    cancel: function (executionId) {
        if (!this._allow({ trigger_type: 'manual' })) return this._forbidden()
        var dex = this._dex(executionId)
        if (!dex) return { ok: false, code: 'not_found', message: 'Data execution was not found.' }
        var state = dex.getValue('execution_state') || ''
        if (!SyncBridgeExecutionService.EARLY[state]) {
            return {
                ok: false,
                code: 'state',
                message: 'Cancel is only available while the execution is queued or still reading the source. State: ' + state + '.',
            }
        }
        dex.setValue('execution_result', 'cancelled')
        if (!dex.getValue('execution_completed_at')) {
            dex.setValue('execution_completed_at', new GlideDateTime().getValue())
        }
        this._setDuration(dex)
        dex.setValue('execution_state', 'cancelled')
        dex.work_notes =
            'Sync Bridge: cancelled. Further enqueue stops. Rows already in the outbox may still drain through the existing job. No rollback was performed.'
        dex.update()
        this._touchConfig(dex)
        var cfgId = dex.getValue('configuration')
        if (cfgId) this._noteConfig(cfgId, 'Cancelled ' + (dex.getValue('number') || 'data execution') + '.')
        return { ok: true, dex_id: dex.getUniqueValue(), number: dex.getValue('number') || '', message: 'Cancelled ' + (dex.getValue('number') || '') + '.' }
    },

    /**
     * New DEX, trigger retry, same seed engine. This re-reads the configuration.
     * It does not replay only the failed transfer rows.
     */
    retry: function (executionId) {
        if (!this._allow({ trigger_type: 'retry' })) return this._forbidden()
        var parent = this._dex(executionId)
        if (!parent) return { ok: false, code: 'not_found', message: 'Data execution was not found.' }
        var failed = parseInt(parent.getValue('failed_count'), 10) || 0
        var state = parent.getValue('execution_state') || ''
        if (state !== 'completed' && state !== 'cancelled') {
            return { ok: false, code: 'state', message: 'Retry Failed is available after the execution has finished.' }
        }
        if (failed < 1) {
            return { ok: false, code: 'none', message: 'This execution has no failed records to retry.' }
        }
        var configId = parent.getValue('configuration')
        if (!configId) return { ok: false, code: 'config', message: 'Execution has no configuration.' }
        parent.work_notes =
            'Sync Bridge: retry requested. A new data execution will re-read the configuration through BridgeSeed. It does not extract only the failed rows.'
        parent.update()
        return this._start(configId, {
            trigger_type: 'retry',
            trigger_reference: parent.getValue('number') || parent.getUniqueValue(),
            execution_mode: 'retry',
        }, 'retry')
    },

    /** Stub. Does not write target data and does not pretend a rollback ran. */
    reconcile: function (executionId) {
        if (!this._allow({ trigger_type: 'manual' })) return this._forbidden()
        var dex = this._dex(executionId)
        if (!dex) return { ok: false, code: 'not_found', message: 'Data execution was not found.' }
        var message =
            'Reconcile is not implemented in 0.3.0. No target rows were read or changed, and no rollback was performed.'
        dex.work_notes = 'Sync Bridge: ' + message
        dex.update()
        return { ok: true, stub: true, dex_id: dex.getUniqueValue(), number: dex.getValue('number') || '', message: message }
    },

    /**
     * One page of queued controller work. Called by the continue job, not by UI actions.
     * Does not call BridgeTransport.
     */
    continueQueued: function () {
        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        dex.addQuery('legacy_key', 'STARTSWITH', 'ctrl:')
        dex.addQuery('execution_state', 'IN', 'queued,validating,preparing,reading_source,sending')
        dex.orderBy('queued_at')
        dex.setLimit(20)
        dex.query()
        var progressed = 0
        while (dex.next()) {
            var state = dex.getValue('execution_state') || ''
            if (state === 'sending') {
                try {
                    new BridgeDualWrite().completeControllerIfReady(dex.getUniqueValue())
                } catch (e) {
                    gs.warn('[bridge] controller completion check failed (ignored): ' + e)
                }
                continue
            }
            if ((state === 'queued' || state === 'validating') && !this._queueAllowsStart(dex)) continue
            this._continueOne(dex.getUniqueValue())
            progressed++
            if (progressed >= 3) return
        }
    },

    /** Called by the schedule job only. */
    runDueSchedules: function () {
        var now = new GlideDateTime().getValue()
        var sch = new GlideRecord(BridgeConfig.TABLE.executionSchedule)
        sch.addQuery('active', true)
        sch.addNotNullQuery('next_execution')
        sch.addQuery('next_execution', '<=', now)
        sch.orderBy('next_execution')
        sch.setLimit(10)
        sch.query()
        while (sch.next()) {
            var configId = sch.getValue('configuration') || ''
            var out = this.executeScheduled(configId, sch.getUniqueValue())
            if (out && out.ok) {
                sch.setValue('previous_execution', out.dex_id || '')
                sch.setValue('previous_result', 'queued')
                sch.work_notes = 'Sync Bridge: started ' + (out.number || 'a data execution') + ' via the execution controller.'
                this._advanceSchedule(sch, false)
            } else if (out && (out.code === 'overlap' || out.code === 'prevent')) {
                var retryAt = new GlideDateTime()
                retryAt.addSeconds(300)
                sch.setValue('next_execution', retryAt.getValue())
                sch.work_notes =
                    'Sync Bridge: did not start. ' +
                    (out.message || 'Another execution is running.') +
                    ' Next attempt ' +
                    retryAt.getDisplayValue() +
                    '.'
                sch.setWorkflow(false)
                sch.update()
                this._syncConfigNext(configId)
            } else {
                sch.work_notes = 'Sync Bridge: schedule did not start. ' + ((out && out.message) || 'Unknown error.')
                this._advanceSchedule(sch, false)
            }
        }
    },

    refreshSchedule: function (scheduleId) {
        var sch = new GlideRecord(BridgeConfig.TABLE.executionSchedule)
        if (!scheduleId || !sch.get(scheduleId)) return { ok: false, message: 'Schedule was not found.' }
        var jobId = this._scheduleJobId()
        if (jobId && sch.getValue('platform_job') !== jobId) sch.setValue('platform_job', jobId)
        var configId = sch.getValue('configuration') || ''
        if (sch.getValue('active') !== '1') {
            if (sch.getValue('next_execution')) sch.setValue('next_execution', '')
            sch.setWorkflow(false)
            sch.update()
            this._syncConfigNext(configId)
            return { ok: true, active: false }
        }
        var nextMs = this._nextUtcMs(sch, new Date().getTime())
        var next = this._gdtValue(nextMs)
        var unchanged = sch.getValue('next_execution') === next && (!jobId || sch.getValue('platform_job') === jobId)
        if (!unchanged) {
            sch.setValue('next_execution', next)
            sch.work_notes =
                'Sync Bridge: next execution ' +
                next +
                ' (' +
                (sch.getValue('timezone') || 'Europe/London') +
                ', ' +
                (sch.getValue('frequency') || 'daily') +
                '). The schedule job calls the execution controller only.'
            sch.setWorkflow(false)
            sch.update()
            if (configId) {
                this._noteConfig(configId, 'Schedule ' + (sch.getValue('number') || '') + ' next execution ' + next + '.')
            }
        }
        this._syncConfigNext(configId)
        return { ok: true, next_execution: next }
    },

    cloneConfiguration: function (configurationId) {
        if (!this._allow({ trigger_type: 'manual' })) return this._forbidden()
        var src = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!src.get(configurationId)) return this._invalid('Configuration not found.')
        var copy = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        copy.initialize()
        var fields = [
            'direction',
            'description',
            'source_instance',
            'target_instance',
            'source_table',
            'target_table',
            'filter',
            'operation',
            'match_strategy',
            'reference_handling',
            'apply_mode',
            'field_list',
            'preserve_sys_id',
            'propagate_deletes',
            'batch_size',
            'policy',
            'concurrent_execution_policy',
        ]
        for (var i = 0; i < fields.length; i++) {
            if (copy.isValidField(fields[i])) copy.setValue(fields[i], src.getValue(fields[i]))
        }
        var name = (src.getValue('name') || 'Configuration') + ' (copy)'
        copy.setValue('name', name.substr(0, 200))
        copy.setValue('active', false)
        copy.work_notes =
            'Sync Bridge: cloned from ' +
            (src.getValue('name') || configurationId) +
            '. Inactive until reviewed. Capture still follows the linked sync policy.'
        var id = copy.insert()
        if (!id) return { ok: false, message: 'Could not clone the configuration.' }
        return { ok: true, configuration_id: id, message: 'Cloned configuration. It is inactive.' }
    },

    setActive: function (configurationId, active) {
        if (!this._allow({ trigger_type: 'manual' })) return this._forbidden()
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(configurationId)) return this._invalid('Configuration not found.')
        var want = !!active
        cfg.setValue('active', want)
        cfg.work_notes = 'Sync Bridge: configuration ' + (want ? 'activated' : 'deactivated') + '.'
        cfg.update()
        return { ok: true, active: want, message: want ? 'Configuration activated.' : 'Configuration deactivated.' }
    },

    _start: function (configurationId, options, mode) {
        options = options || {}
        options.execution_mode = mode
        if (!options.trigger_type) options.trigger_type = 'manual'
        if (!this._allow(options)) return this._forbidden()

        var loaded = this._loadConfig(configurationId)
        if (!loaded.ok) return { ok: false, code: 'not_found', message: loaded.message }

        var validation = this.validate(configurationId, {
            trigger_type: options.trigger_type,
            forStart: true,
            fromScheduler: options.fromScheduler,
        })
        if (validation.status === 'invalid') {
            return {
                ok: false,
                code: 'invalid',
                status: validation.status,
                findings: validation.findings,
                message: validation.message,
            }
        }

        var policy = this._concurrencyPolicy(loaded.row)
        var open = this._openExecution(configurationId)
        if (open && policy === 'prevent') {
            return {
                ok: false,
                code: 'prevent',
                message: this._preventMessage(open),
                dex_id: open.getUniqueValue(),
                number: open.getValue('number') || '',
                state: open.getValue('execution_state') || '',
            }
        }

        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        dex.newRecord()
        var dexId = dex.getUniqueValue()
        var now = new GlideDateTime().getValue()
        var cfg = loaded.row
        dex.setValue('legacy_key', 'ctrl:' + dexId)
        dex.setValue('configuration', configurationId)
        dex.setValue('name', String(cfg.getValue('name') || '').substr(0, 200))
        dex.setValue('execution_mode', mode)
        dex.setValue('trigger_type', options.trigger_type)
        dex.setValue('triggered_by', gs.getUserDisplayName() || gs.getUserName() || 'system')
        dex.setValue('initiated_by', gs.getUserName() || 'system')
        if (options.trigger_reference) dex.setValue('trigger_reference', String(options.trigger_reference).substr(0, 160))
        if (options.schedule) dex.setValue('schedule', options.schedule)
        dex.setValue('queued_at', now)
        dex.setValue('started_at', now)
        dex.setValue('source_instance', cfg.getValue('source_instance') || '')
        dex.setValue('target_instance', cfg.getValue('target_instance') || '')
        dex.setValue('source_table', cfg.getValue('source_table') || '')
        dex.setValue('target_table', cfg.getValue('target_table') || cfg.getValue('source_table') || '')
        dex.setValue('filter_snapshot', cfg.getValue('filter') || '')
        dex.setValue('execution_state', 'validating')
        dex.setValue('config_snapshot', this._snapshot(cfg, mode, options))
        dex.work_notes =
            'Sync Bridge: validating ' +
            (cfg.getValue('name') || 'configuration') +
            '. ' +
            validation.message
        var inserted = dex.insert()
        if (!inserted) return { ok: false, code: 'insert', message: 'Could not create the data execution.' }
        if (!dex.get(inserted)) return { ok: false, code: 'insert', message: 'Data execution was not readable after insert.' }
        if (dex.getValue('legacy_key') !== 'ctrl:' + inserted) {
            dex.setValue('legacy_key', 'ctrl:' + inserted)
        }

        dex.setValue('execution_state', 'queued')
        dex.work_notes = this._queuedNote(dex, cfg, mode, options)
        dex.update()

        cfg.work_notes =
            'Sync Bridge: queued ' +
            (dex.getValue('number') || inserted) +
            ' (' +
            mode +
            ', ' +
            options.trigger_type +
            '). Work continues through BridgeSeed and the existing outbox drain.'
        cfg.setValue('last_execution', inserted)
        cfg.setValue('last_run_at', now)
        if (cfg.isValidField('last_result')) cfg.setValue('last_result', '')
        cfg.update()

        return {
            ok: true,
            dex_id: inserted,
            number: dex.getValue('number') || '',
            state: 'queued',
            execution_mode: mode,
            message:
                'Queued ' +
                (dex.getValue('number') || 'data execution') +
                '. You can leave this page. The existing drain still performs the transfer.',
        }
    },

    _continueOne: function (dexId) {
        var dex = this._dex(dexId)
        if (!dex) return
        var state = dex.getValue('execution_state') || ''
        if (state === 'cancelled' || state === 'completed') return
        var mode = dex.getValue('execution_mode') || 'execute'
        if (mode === 'dry_run') this._pageDryRun(dex)
        else if (mode === 'reconciliation') {
            dex.work_notes = 'Sync Bridge: reconciliation does not run in 0.3.0. No target rows were changed.'
            dex.setValue('execution_result', 'cancelled')
            dex.setValue('execution_state', 'cancelled')
            dex.setValue('execution_completed_at', new GlideDateTime().getValue())
            this._setDuration(dex)
            dex.update()
        } else this._pageSeed(dex)
    },

    _pageSeed: function (dex) {
        if ((dex.getValue('execution_state') || '') === 'cancelled') return
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(dex.getValue('configuration'))) {
            this._failDex(dex, 'Configuration no longer exists.')
            return
        }
        var policyId = cfg.getValue('policy') || ''
        if (!policyId) {
            this._failDex(dex, 'Configuration has no sync policy. BridgeSeed was not called.')
            return
        }
        var batch = parseInt(cfg.getValue('batch_size'), 10)
        if (isNaN(batch) || batch < 1) batch = 200
        var summary
        try {
            summary = new BridgeSeed().seedPolicy(policyId, {
                batchSize: batch,
                runId: dex.getValue('run') || '',
                executionId: dex.getUniqueValue(),
            })
        } catch (e) {
            this._failDex(dex, 'BridgeSeed failed: ' + e)
            return
        }
        if (!dex.get(dex.getUniqueValue())) return
        if ((dex.getValue('execution_state') || '') === 'cancelled') return
        if (summary && summary.run_id && !dex.getValue('run')) dex.setValue('run', summary.run_id)
        if (summary && summary.reason && !summary.run_id) {
            this._failDex(dex, summary.reason)
            return
        }
        var total = 0
        if (summary && summary.run_id) {
            var run = new GlideRecord(BridgeConfig.TABLE.run)
            if (run.get(summary.run_id)) total = parseInt(run.getValue('processed'), 10) || 0
        }
        dex.setValue('selected_count', total)
        if (summary && summary.done) {
            if (!dex.getValue('source_read_completed_at')) {
                dex.setValue('source_read_completed_at', new GlideDateTime().getValue())
            }
            if (total === 0) {
                dex.setValue('execution_result', 'successful')
                dex.setValue('execution_completed_at', new GlideDateTime().getValue())
                dex.setValue('execution_state', 'completed')
                this._setDuration(dex)
                dex.work_notes =
                    'Sync Bridge: source read matched no rows. Nothing was queued. Target data was not changed. Acknowledgement stays empty.'
                dex.update()
                this._touchConfig(dex)
                return
            }
            dex.setValue('execution_state', 'sending')
            dex.work_notes =
                'Sync Bridge: source read finished. ' +
                total +
                ' row(s) are in the outbox. The existing drain sends them through BridgeTransport. Acknowledgement stays empty.'
            dex.update()
            return
        }
        dex.setValue('execution_state', 'reading_source')
        dex.work_notes = 'Sync Bridge: reading source. ' + total + ' row(s) queued so far via BridgeSeed.'
        dex.update()
    },

    _pageDryRun: function (dex) {
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(dex.getValue('configuration'))) {
            this._failDex(dex, 'Configuration no longer exists.')
            return
        }
        var run = this._dryRunCursor(dex, cfg)
        var batch = parseInt(cfg.getValue('batch_size'), 10)
        if (isNaN(batch) || batch < 1) batch = 200
        if (batch > 200) batch = 200
        var cursor = run.getValue('seed_cursor') || ''
        var gr = this._sourceQuery(cfg, cursor)
        gr.setLimit(batch)
        gr.query()
        var page = { insert: 0, update: 0, skip: 0, delete: 0, scanned: 0 }
        var lastId = cursor
        var sampleLines = []
        while (gr.next()) {
            page.scanned++
            lastId = gr.getUniqueValue()
            var predicted = this._predict(gr, cfg)
            page[predicted.action] = (page[predicted.action] || 0) + 1
            if (sampleLines.length < 15 && !(parseInt(dex.getValue('selected_count'), 10) > 0)) {
                sampleLines.push(
                    predicted.name +
                        ' ' +
                        predicted.action +
                        (predicted.target ? ' existing ' + predicted.target : '')
                )
            }
        }
        this._addCount(dex, 'selected_count', page.scanned)
        this._addCount(dex, 'inserted_count', page.insert)
        this._addCount(dex, 'updated_count', page.update)
        this._addCount(dex, 'skipped_count', page.skip + page.delete)
        run.setValue('seed_cursor', lastId || cursor)
        run.setValue('processed', (parseInt(run.getValue('processed'), 10) || 0) + page.scanned)
        run.setValue('failed', (parseInt(run.getValue('failed'), 10) || 0) + page.delete)
        var done = page.scanned < batch
        if (done) run.setValue('ended', new GlideDateTime().getValue())
        run.update()
        if (!dex.getValue('run')) dex.setValue('run', run.getUniqueValue())
        if (!dex.getValue('source_read_completed_at') && done) {
            dex.setValue('source_read_completed_at', new GlideDateTime().getValue())
        }
        if (done) {
            var deletes = parseInt(run.getValue('failed'), 10) || 0
            dex.setValue('execution_result', 'successful')
            dex.setValue('execution_state', 'completed')
            dex.setValue('execution_completed_at', new GlideDateTime().getValue())
            this._setDuration(dex)
            dex.work_notes =
                'Sync Bridge: dry run finished. Predicted insert ' +
                (dex.getValue('inserted_count') || 0) +
                ', update ' +
                (dex.getValue('updated_count') || 0) +
                ', skip ' +
                (dex.getValue('skipped_count') || 0) +
                ' (skip includes ' +
                deletes +
                ' delete predictions). No outbox rows were enqueued. Target business tables were not changed. Transfer validated and acknowledgement fields were not used.'
            dex.update()
            this._touchConfig(dex)
            return
        }
        dex.setValue('execution_state', 'reading_source')
        var note = 'Sync Bridge: dry run read ' + (dex.getValue('selected_count') || 0) + ' source row(s). No target writes.'
        if (sampleLines.length) note += ' Sample: ' + sampleLines.join('; ')
        dex.work_notes = note.substr(0, 4000)
        dex.update()
    },

    _dryRunCursor: function (dex, cfg) {
        var run = new GlideRecord(BridgeConfig.TABLE.run)
        if (dex.getValue('run') && run.get(dex.getValue('run'))) return run
        run.initialize()
        run.setValue('type', 'bulk_seed')
        run.setValue('peer', cfg.getValue('target_instance') || '')
        run.setValue('started', new GlideDateTime().getValue())
        run.setValue('processed', 0)
        run.setValue('failed', 0)
        run.setValue('seed_policy', cfg.getValue('policy') || '')
        var id = run.insert()
        run.get(id)
        return run
    },

    _queueAllowsStart: function (dex) {
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(dex.getValue('configuration'))) return true
        var policy = this._concurrencyPolicy(cfg)
        if (policy === 'allow') return true
        if (policy === 'prevent') return true
        var other = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        other.addQuery('configuration', dex.getValue('configuration'))
        other.addQuery('sys_id', '!=', dex.getUniqueValue())
        other.addQuery('execution_state', 'IN', 'preparing,reading_source,sending,awaiting_receipt,received,processing_target,awaiting_acknowledgement,finalising')
        other.setLimit(1)
        other.query()
        return !other.hasNext()
    },

    _openExecution: function (configurationId) {
        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        dex.addQuery('configuration', configurationId)
        dex.addQuery('execution_state', 'NOT IN', 'completed,cancelled')
        dex.orderBy('queued_at')
        dex.setLimit(1)
        dex.query()
        if (!dex.next()) return null
        return dex
    },

    _concurrencyPolicy: function (cfg) {
        var value = (cfg.getValue('concurrent_execution_policy') || 'prevent').toLowerCase()
        if (value === 'queue' || value === 'allow') return value
        return 'prevent'
    },

    _preventMessage: function (dex) {
        var number = dex.getValue('number') || dex.getUniqueValue()
        var state = dex.getDisplayValue('execution_state') || dex.getValue('execution_state') || ''
        return 'Unable to start another execution. ' + number + ' is currently running. State: ' + state + '.'
    },

    _predict: function (sourceGr, cfg) {
        var op = cfg.getValue('operation') || 'upsert'
        var target = this._existingTarget(cfg, sourceGr.getTableName(), sourceGr.getUniqueValue())
        var exists = !!target
        var action = 'insert'
        if (op === 'delete') action = exists ? 'delete' : 'skip'
        else if (op === 'update') action = exists ? 'update' : 'skip'
        else if (op === 'insert') action = exists ? 'skip' : 'insert'
        else action = exists ? 'update' : 'insert'
        var name = sourceGr.getUniqueValue()
        if (sourceGr.isValidField('name') && sourceGr.getValue('name')) name = sourceGr.getValue('name')
        else if (sourceGr.isValidField('number') && sourceGr.getValue('number')) name = sourceGr.getValue('number')
        return { action: action, target: target, name: String(name).substr(0, 160) }
    },

    _existingTarget: function (cfg, tableName, sourceId) {
        var peerId = cfg.getValue('target_instance') || ''
        if (!peerId || !sourceId) return ''
        var xref = new GlideRecord(BridgeConfig.TABLE.xref)
        xref.addQuery('peer', peerId)
        xref.addQuery('source_table', tableName)
        xref.addQuery('source_sys_id', sourceId)
        xref.setLimit(1)
        xref.query()
        if (!xref.next()) return ''
        return xref.getValue('target_sys_id') || ''
    },

    _countSource: function (cfg) {
        var tableName = cfg.getValue('source_table') || ''
        if (!tableName) return 0
        try {
            var ga = new GlideAggregate(tableName)
            if (cfg.getValue('filter')) ga.addEncodedQuery(cfg.getValue('filter'))
            ga.addAggregate('COUNT')
            ga.query()
            if (ga.next()) return parseInt(ga.getAggregate('COUNT'), 10) || 0
        } catch (e) {
            gs.warn('[bridge] preview count failed: ' + e)
        }
        return 0
    },

    _sourceQuery: function (cfg, cursor) {
        var gr = new GlideRecord(cfg.getValue('source_table'))
        if (cfg.getValue('filter')) gr.addEncodedQuery(cfg.getValue('filter'))
        if (cursor) gr.addQuery('sys_id', '>', cursor)
        gr.orderBy('sys_id')
        return gr
    },

    _advanceSchedule: function (sch, deactivateOnce) {
        var freq = sch.getValue('frequency') || 'daily'
        if (freq === 'once' || deactivateOnce) {
            sch.setValue('active', false)
            sch.setValue('next_execution', '')
            sch.work_notes = (sch.work_notes ? '' : '') + 'Sync Bridge: one-time schedule completed and deactivated.'
        } else {
            var next = this._gdtValue(this._nextUtcMs(sch, new Date().getTime() + 1000))
            sch.setValue('next_execution', next)
        }
        sch.setWorkflow(false)
        sch.update()
        this._syncConfigNext(sch.getValue('configuration') || '')
    },

    _syncConfigNext: function (configId) {
        if (!configId) return
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(configId) || !cfg.isValidField('next_execution_at')) return
        var sch = new GlideRecord(BridgeConfig.TABLE.executionSchedule)
        sch.addQuery('configuration', configId)
        sch.addQuery('active', true)
        sch.addNotNullQuery('next_execution')
        sch.orderBy('next_execution')
        sch.setLimit(1)
        sch.query()
        var next = sch.next() ? sch.getValue('next_execution') || '' : ''
        if ((cfg.getValue('next_execution_at') || '') === next) return
        cfg.setValue('next_execution_at', next)
        cfg.setWorkflow(false)
        cfg.update()
    },

    _scheduleJobId: function () {
        var job = new GlideRecord('sysauto_script')
        if (!job.isValid()) return ''
        job.addQuery('name', SyncBridgeExecutionService.SCHEDULE_JOB)
        job.setLimit(1)
        job.query()
        return job.next() ? job.getUniqueValue() : ''
    },

    _nextUtcMs: function (sch, afterMs) {
        var freq = sch.getValue('frequency') || 'daily'
        var tz = sch.getValue('timezone') || 'Europe/London'
        if (freq === 'hourly') return afterMs + 3600000
        var clock = this._parseClock(sch.getValue('run_time'))
        var weekday = sch.getValue('day_of_week') || ''
        var monthDay = parseInt(sch.getValue('day_of_month'), 10) || 1
        var parts = this._localParts(afterMs, tz)
        for (var i = 0; i < 400; i++) {
            var date = this._addDays(parts.year, parts.month, parts.day, i)
            if (freq === 'monthly' && date.day !== monthDay) continue
            var utc = this._utcForLocalClock(date.year, date.month, date.day, clock, tz)
            if (utc <= afterMs) continue
            if (freq === 'weekly' && weekday && this._localParts(utc, tz).dow !== this._dowIndex(weekday)) continue
            return utc
        }
        return afterMs + 86400000
    },

    _parseClock: function (raw) {
        var match = String(raw || '').match(/(\d{1,2}):(\d{2}):(\d{2})/)
        if (!match) return { h: 23, m: 0, s: 0 }
        return { h: parseInt(match[1], 10) || 0, m: parseInt(match[2], 10) || 0, s: parseInt(match[3], 10) || 0 }
    },

    _dowIndex: function (name) {
        var map = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 }
        return map[String(name || '').toLowerCase()]
    },

    _addDays: function (year, month, day, n) {
        var d = new Date(Date.UTC(year, month - 1, day) + n * 86400000)
        return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() }
    },

    _utcForLocalClock: function (year, month, day, clock, tz) {
        var asUtc = Date.UTC(year, month - 1, day, clock.h, clock.m, clock.s)
        var offset = this._offsetMinutes(tz, asUtc)
        var utc = asUtc - offset * 60000
        var offset2 = this._offsetMinutes(tz, utc)
        if (offset2 !== offset) utc = asUtc - offset2 * 60000
        return utc
    },

    _localParts: function (utcMs, tz) {
        var offset = this._offsetMinutes(tz, utcMs)
        var local = new Date(utcMs + offset * 60000)
        return {
            year: local.getUTCFullYear(),
            month: local.getUTCMonth() + 1,
            day: local.getUTCDate(),
            dow: local.getUTCDay(),
        }
    },

    _offsetMinutes: function (tzName, utcMs) {
        var name = tzName || 'Europe/London'
        try {
            var tz = java.util.TimeZone.getTimeZone(name)
            if (tz) {
                var id = String(tz.getID() || '')
                if (id === name || name === 'UTC' || name === 'Etc/UTC' || id === 'GMT') {
                    if (id === 'GMT' && name !== 'GMT' && name !== 'UTC' && name !== 'Etc/UTC' && name.indexOf('London') === -1) {
                        return this._londonOffsetMinutes(utcMs)
                    }
                    return tz.getOffset(utcMs) / 60000
                }
            }
        } catch (e) {
            // Scoped runtimes may hide java.util. Europe/London rules below still cover the default.
        }
        if (name === 'UTC' || name === 'Etc/UTC') return 0
        return this._londonOffsetMinutes(utcMs)
    },

    _londonOffsetMinutes: function (utcMs) {
        var year = new Date(utcMs).getUTCFullYear()
        var start = this._lastSunday(year, 2)
        start.setUTCHours(1, 0, 0, 0)
        var end = this._lastSunday(year, 9)
        end.setUTCHours(1, 0, 0, 0)
        if (utcMs >= start.getTime() && utcMs < end.getTime()) return 60
        return 0
    },

    _lastSunday: function (year, monthIndex) {
        var d = new Date(Date.UTC(year, monthIndex + 1, 0))
        d.setUTCDate(d.getUTCDate() - d.getUTCDay())
        d.setUTCHours(0, 0, 0, 0)
        return d
    },

    _gdtValue: function (ms) {
        var gdt = new GlideDateTime()
        gdt.setNumericValue(ms)
        return gdt.getValue()
    },

    _snapshot: function (cfg, mode, options) {
        return JSON.stringify({
            phase: 5,
            contract: 'case1_apply',
            execution_mode: mode,
            trigger_type: options.trigger_type || '',
            trigger_reference: options.trigger_reference || '',
            schedule: options.schedule || '',
            movement_config: cfg.getUniqueValue(),
            policy: cfg.getValue('policy') || '',
            name: cfg.getValue('name') || '',
            direction: cfg.getValue('direction') || '',
            source_table: cfg.getValue('source_table') || '',
            target_table: cfg.getValue('target_table') || '',
            filter: cfg.getValue('filter') || '',
            operation: cfg.getValue('operation') || '',
            match_strategy: cfg.getValue('match_strategy') || '',
            reference_handling: cfg.getValue('reference_handling') || '',
            apply_mode: cfg.getValue('apply_mode') || '',
            batch_size: cfg.getValue('batch_size') || '',
            captured_at: new GlideDateTime().getValue(),
            note: 'Frozen when the execution controller queued this run. Transfer still uses the sync policy, outbox, and /apply. Acknowledgement is not part of 0.3.0.',
        })
    },

    _queuedNote: function (dex, cfg, mode, options) {
        var verb = mode === 'dry_run' ? 'Dry run queued' : 'Execution queued'
        return (
            'Sync Bridge: ' +
            verb +
            ' by ' +
            (options.trigger_type || 'manual') +
            '. Policy ' +
            (cfg.getValue('policy') || '(none)') +
            '. ' +
            (mode === 'dry_run'
                ? 'Target business tables will not be changed and nothing will be enqueued.'
                : 'BridgeSeed will enqueue the outbox. The existing drain performs the send.') +
            ' Acknowledgement stays empty.'
        )
    },

    _failDex: function (dex, reason) {
        dex.setValue('execution_result', 'failed')
        dex.setValue('execution_state', 'completed')
        dex.setValue('execution_completed_at', new GlideDateTime().getValue())
        this._setDuration(dex)
        dex.work_notes = 'Sync Bridge: execution stopped. ' + reason
        dex.update()
        this._touchConfig(dex)
    },

    _touchConfig: function (dex) {
        var configId = dex.getValue('configuration')
        if (!configId) return
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(configId)) return
        cfg.setValue('last_execution', dex.getUniqueValue())
        var stamp = dex.getValue('execution_completed_at') || dex.getValue('started_at') || new GlideDateTime().getValue()
        if (cfg.isValidField('last_run_at')) cfg.setValue('last_run_at', stamp)
        var result = dex.getValue('execution_result') || ''
        if (result && cfg.isValidField('last_result')) cfg.setValue('last_result', result)
        cfg.setWorkflow(false)
        cfg.update()
    },

    _noteConfig: function (configId, text) {
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(configId)) return
        cfg.work_notes = 'Sync Bridge: ' + text
        cfg.setWorkflow(false)
        cfg.update()
    },

    _stampValidation: function (cfg, status) {
        if (cfg.isValidField('last_validation_status')) cfg.setValue('last_validation_status', status)
        if (cfg.isValidField('last_validated_at')) cfg.setValue('last_validated_at', new GlideDateTime().getValue())
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
            gs.warn('[bridge] duration skipped: ' + e)
        }
    },

    _addCount: function (dex, field, delta) {
        if (!delta) return
        var current = parseInt(dex.getValue(field), 10) || 0
        dex.setValue(field, current + delta)
    },

    _sampleTable: function (sample) {
        var html = '<table><tr><th>Source record</th><th>Name</th><th>Existing target</th><th>Proposed action</th></tr>'
        for (var i = 0; i < sample.length; i++) {
            var row = sample[i]
            html +=
                '<tr><td>' +
                this._esc(row.source_sys_id) +
                '</td><td>' +
                this._esc(row.name) +
                '</td><td>' +
                this._esc(row.existing_target || 'None') +
                '</td><td>' +
                this._esc(row.proposed_action) +
                '</td></tr>'
        }
        if (!sample.length) html += '<tr><td colspan="4">No rows in the sample.</td></tr>'
        return html + '</table>'
    },

    _esc: function (value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
    },

    _allow: function (options) {
        options = options || {}
        if (gs.hasRole('x_33764_sbridge.operator') || gs.hasRole('x_33764_sbridge.admin') || gs.hasRole('admin')) {
            return true
        }
        var trigger = options.trigger_type || ''
        var user = gs.getUserName() || ''
        if (user === 'system') return true
        if ((trigger === 'api' || trigger === 'scheduled') && this.config.isIntegrationUser()) return true
        if ((trigger === 'scheduled' || options.fromScheduler) && this._isBackgroundSession()) return true
        return false
    },

    _isBackgroundSession: function () {
        try {
            return gs.getSession() && gs.getSession().isInteractive && !gs.getSession().isInteractive()
        } catch (e) {
            return false
        }
    },

    _loadConfig: function (configurationId) {
        if (!configurationId) return { ok: false, message: 'Configuration is required.' }
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        if (!cfg.get(configurationId)) return { ok: false, message: 'Configuration not found.' }
        return { ok: true, row: cfg }
    },

    _dex: function (executionId) {
        if (!executionId) return null
        var dex = new GlideRecord(BridgeConfig.TABLE.dataExecution)
        if (!dex.get(executionId)) return null
        return dex
    },

    _statusFromFindings: function (findings) {
        var warning = false
        for (var i = 0; i < findings.length; i++) {
            if (findings[i].level === 'error') return 'invalid'
            if (findings[i].level === 'warning') warning = true
        }
        return warning ? 'valid_with_warnings' : 'valid'
    },

    _findingSummary: function (status, findings) {
        var label = {
            valid: 'Valid',
            valid_with_warnings: 'Valid with warnings',
            invalid: 'Invalid',
        }
        var text = label[status] || status
        if (!findings.length) return text + '.'
        var parts = []
        for (var i = 0; i < findings.length && i < 8; i++) parts.push(findings[i].message)
        return text + '. ' + parts.join(' ')
    },

    _invalid: function (message) {
        return { ok: false, status: 'invalid', findings: [{ level: 'error', message: message }], message: message, matched: 0, sample: [] }
    },

    _forbidden: function () {
        return { ok: false, code: 'forbidden', message: 'Sync Bridge operator role is required.' }
    },

    type: 'SyncBridgeExecutionService',
}
