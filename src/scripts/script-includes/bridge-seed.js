/**
 * BridgeSeed — enqueue existing rows for a policy without touching source records.
 *
 * Pages through the source table (default 200), writes outbox rows with mode=bulk_seed,
 * records progress on bridge_run (type=bulk_seed) via seed_cursor for resumability.
 */
var BridgeSeed = Class.create()

BridgeSeed.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
        this.capture = new BridgeCapture()
    },

    /**
     * @param {string} policyId
     * @param {object} [opts]
     * @param {number} [opts.batchSize]
     * @param {string} [opts.runId] resume an open bulk_seed run
     * @param {string} [opts.executionId] controller DEX to attach. Case 1 callers omit this.
     * @returns {object} summary
     */
    seedPolicy: function (policyId, opts) {
        try {
            new BridgeDualWrite().linkPolicies()
        } catch (e) {
            gs.warn('[bridge] dual-write link failed (ignored): ' + e)
        }
        opts = opts || {}
        var summary = {
            policy: policyId,
            enqueued: 0,
            scanned: 0,
            done: false,
            run_id: '',
            cursor: '',
            reason: '',
        }

        if (!this.config.isEnabled()) {
            summary.reason = 'disabled by ' + BridgeConfig.PROP.enabled
            return summary
        }

        var policyGr = new GlideRecord(BridgeConfig.TABLE.policy)
        if (!policyGr.get(policyId)) {
            summary.reason = 'policy not found'
            return summary
        }
        if (policyGr.getValue('active') !== '1') {
            summary.reason = 'policy inactive'
            return summary
        }
        if (policyGr.getValue('direction') !== 'outbound') {
            summary.reason = 'seed requires an outbound policy'
            return summary
        }

        var localPeer = this.config.localPeerId()
        if (!localPeer) {
            summary.reason = 'local peer not configured'
            return summary
        }
        if (policyGr.getValue('owner_peer') !== localPeer) {
            summary.reason = 'this instance does not own the table'
            return summary
        }

        var peerId = policyGr.getValue('peer')
        if (!peerId || peerId === localPeer) {
            summary.reason = 'policy peer missing or is local'
            return summary
        }

        var tableName = policyGr.getValue('table')
        if (!tableName) {
            summary.reason = 'policy has no table'
            return summary
        }

        var batchSize = parseInt(opts.batchSize, 10)
        if (isNaN(batchSize) || batchSize < 1) {
            batchSize = this.config.intProp(BridgeConfig.PROP.batchSize, 200)
        }
        if (batchSize > 1000) batchSize = 1000

        var runId = opts.runId || ''
        var executionId = opts.executionId || ''
        if (executionId && this._executionCancelled(executionId)) {
            summary.reason = 'execution cancelled'
            summary.done = true
            return summary
        }
        var cursor = ''
        var runGr = new GlideRecord(BridgeConfig.TABLE.run)
        if (runId && runGr.get(runId)) {
            cursor = runGr.getValue('seed_cursor') || ''
        } else {
            runGr.initialize()
            runGr.setValue('type', 'bulk_seed')
            runGr.setValue('peer', peerId)
            runGr.setValue('started', new GlideDateTime().getValue())
            runGr.setValue('processed', 0)
            runGr.setValue('failed', 0)
            runGr.setValue('seed_policy', policyId)
            runId = runGr.insert()
        }
        summary.run_id = runId
        summary.cursor = cursor
        if (executionId) this._stampRunOnExecution(executionId, runId)
        try {
            if (executionId) new BridgeDualWrite().attachControllerRun(executionId, runId)
            else new BridgeDualWrite().onRunOpened(runId)
        } catch (e) {
            gs.warn('[bridge] dual-write seed open failed (ignored): ' + e)
        }

        var policy = {
            sys_id: policyGr.getUniqueValue(),
            peer: peerId,
            table: tableName,
            direction: 'outbound',
            mode: policyGr.getValue('mode') || 'direct',
            // Capture unions the computer include-list for cmdb_ci_computer. This column stays the policy list.
            field_list: policyGr.getValue('field_list') || '',
            condition: policyGr.getValue('condition') || '',
            ref_map: policyGr.getValue('ref_map') || '',
            target_map: policyGr.getValue('target_map') || '',
            target_table: policyGr.getValue('target_table') || '',
            owner_peer: policyGr.getValue('owner_peer'),
            propagate_deletes: policyGr.getValue('propagate_deletes') === '1',
            preserve_sys_id: policyGr.getValue('preserve_sys_id') === '1',
        }

        var gr = new GlideRecord(tableName)
        // Rows to send follow the sync policy condition. The movement-config
        // filter is not applied here and is not overwritten when it is already
        // set (BridgeDualWrite._linkOne). Case 7 keeps policy.condition and
        // filter = nameSTARTSWITHcase6_max_ as two values.
        if (policy.condition) gr.addEncodedQuery(policy.condition)
        if (cursor) gr.addQuery('sys_id', '>', cursor)
        gr.orderBy('sys_id')
        gr.setLimit(batchSize)
        gr.query()

        var lastId = cursor
        while (gr.next()) {
            summary.scanned++
            lastId = gr.getUniqueValue()
            if (this._enqueueSeed(gr, policy, localPeer, tableName, runId, executionId)) summary.enqueued++
        }

        // persist cursor / close run
        if (runId && runGr.get(runId)) {
            runGr.setValue('seed_cursor', lastId)
            runGr.setValue('processed', (parseInt(runGr.getValue('processed'), 10) || 0) + summary.enqueued)
            if (summary.scanned < batchSize) {
                runGr.setValue('ended', new GlideDateTime().getValue())
                summary.done = true
            }
            runGr.update()
        }

        summary.cursor = lastId
        if (!summary.scanned) summary.done = true
        try {
            new BridgeDualWrite().onSeedPage(runId, summary)
        } catch (e) {
            gs.warn('[bridge] dual-write seed page failed (ignored): ' + e)
        }
        return summary
    },

    _executionCancelled: function (executionId) {
        var dex = new GlideRecord('x_33764_sbridge_data_execution')
        if (!dex.get(executionId)) return false
        return dex.getValue('execution_state') === 'cancelled'
    },

    _stampRunOnExecution: function (executionId, runId) {
        if (!executionId || !runId) return
        var dex = new GlideRecord('x_33764_sbridge_data_execution')
        if (!dex.get(executionId)) return
        if (dex.getValue('run')) return
        dex.setValue('run', runId)
        dex.setWorkflow(false)
        dex.update()
    },

    _enqueueSeed: function (current, policy, localPeer, tableName, runId, executionId) {
        // Reuse capture payload shaping; write outbox with mode=bulk_seed.
        // execution is a controller link. It is not a target field (apply reads payload.values).
        var payload = this.capture._payload(current, policy, 'insert')
        payload.mode = policy.mode
        payload.bulk = true
        if (executionId) payload.execution = executionId

        var gr = new GlideRecord(BridgeConfig.TABLE.outbox)
        gr.initialize()
        gr.setValue('peer', policy.peer)
        gr.setValue('table', tableName)
        gr.setValue('source_sys_id', current.getUniqueValue())
        gr.setValue('op', 'insert')
        gr.setValue('seq', this.capture.sequenceFor(current, 'insert'))
        gr.setValue('payload', JSON.stringify(payload))
        gr.setValue('state', 'pending')
        gr.setValue('attempts', 0)
        gr.setValue('mode', 'bulk_seed')
        var id = gr.insert()
        if (id && runId) {
            try {
                new BridgeDualWrite().onOutboxQueued(id, runId)
            } catch (e) {
                gs.warn('[bridge] dual-write seed enqueue failed (ignored): ' + e)
            }
        }
        return !!id
    },

    type: 'BridgeSeed',
}
