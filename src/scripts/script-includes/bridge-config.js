/**
 * BridgeConfig — shared lookups every other script include depends on.
 *
 * spec/PROJECT_PLAN.md §10: "No hardcoded instance names anywhere outside
 * bridge_peer." That rule is what makes one codebase deployable to KKR, GA and
 * New unchanged, and it forces the question this class answers first: which
 * bridge_peer row is *me*? Derived at runtime from the platform's own
 * `instance_name` property, never configured.
 */
var BridgeConfig = Class.create()

BridgeConfig.PROP = {
    integrationUser: 'x_33764_sbridge.integration_user',
    enabled: 'x_33764_sbridge.enabled',
    batchSize: 'x_33764_sbridge.drain_batch_size',
    maxAttempts: 'x_33764_sbridge.drain_max_attempts',
    lagAlert: 'x_33764_sbridge.lag_alert_seconds',
    dlqAlert: 'x_33764_sbridge.dlq_alert_depth',
    dualWrite: 'x_33764_sbridge.dual_write',
}

BridgeConfig.TABLE = {
    peer: 'x_33764_sbridge_peer',
    policy: 'x_33764_sbridge_policy',
    outbox: 'x_33764_sbridge_outbox',
    receipt: 'x_33764_sbridge_receipt',
    xref: 'x_33764_sbridge_xref',
    dlq: 'x_33764_sbridge_dlq',
    divergence: 'x_33764_sbridge_divergence',
    run: 'x_33764_sbridge_run',
    movementConfig: 'x_33764_sbridge_movement_config',
    dataExecution: 'x_33764_sbridge_data_execution',
    transfer: 'x_33764_sbridge_transfer',
    transferAudit: 'x_33764_sbridge_transfer_audit',
    processingError: 'x_33764_sbridge_processing_error',
    recordResult: 'x_33764_sbridge_record_result',
}

BridgeConfig.prototype = {
    initialize: function () {
        this._localPeerId = null
        this._ancestry = {}
    },

    /**
     * Emergency stop for the scheduled jobs — enabled unless explicitly switched off.
     *
     * Two deliberate choices. The default is `true`, so a missing or blank property does not
     * silently disable the bridge; the safety default lives on `bridge_peer.active`, which
     * ships false and which an install cannot overwrite. And the comparison is defensive —
     * trimmed, lower-cased, via `String()` — because a strict `=== 'true'` against whatever
     * `gs.getProperty` hands back is the kind of comparison that fails on a Java string or a
     * stray space and then looks like a broken scheduled job rather than a config read.
     */
    isEnabled: function () {
        var raw = String(gs.getProperty(BridgeConfig.PROP.enabled, 'true') || '').trim().toLowerCase()
        return raw !== 'false'
    },

    /**
     * Phase 1 shadows. Default on. Only an explicit false/0 pauses them.
     * Callers must still treat dual-write failures as non-fatal.
     */
    isDualWrite: function () {
        var raw = String(gs.getProperty(BridgeConfig.PROP.dualWrite, 'true') || '').trim().toLowerCase()
        return raw !== 'false' && raw !== '0'
    },

    integrationUser: function () {
        return (gs.getProperty(BridgeConfig.PROP.integrationUser, '') || '').trim()
    },

    /**
     * Echo suppression (§3.3) — is the current user the apply worker?
     *
     * Compares `user_name`, not sys_id: sys_ids differ per instance, so a sys_id
     * property would have to be hand-set three times and could not be verified by
     * CI. Same audit guarantee, which is §3.3's actual requirement.
     *
     * Deliberately NOT `setWorkflow(false)` and not a session flag: those suppress
     * SLAs, notifications and assignment rules along with the capture rule, and
     * the whole point of a named user is that the platform's own side effects stay
     * intact and every replicated change is attributable in the audit log.
     */
    isIntegrationUser: function () {
        var configured = this.integrationUser()
        if (!configured) return false
        return gs.getUserName() === configured
    },

    intProp: function (name, fallback) {
        var raw = parseInt(gs.getProperty(name, ''), 10)
        return isNaN(raw) ? fallback : raw
    },

    /**
     * The bridge_peer row representing this instance.
     *
     * Matched on the platform's `instance_name` appearing in the peer's base_url —
     * so the mapping is derived, and adding a fourth instance is a config record
     * like every other. Returns null when this instance has no peer row, which is
     * a misconfiguration every caller must treat as "do nothing" rather than
     * guessing: without a local identity there is no way to evaluate ownership,
     * and §3.1 ownership is the invariant that prevents concurrent writes.
     */
    localPeerId: function () {
        if (this._localPeerId !== null) return this._localPeerId
        this._localPeerId = ''

        var instance = gs.getProperty('instance_name', '')
        if (!instance) return this._localPeerId

        var gr = new GlideRecord(BridgeConfig.TABLE.peer)
        gr.addQuery('base_url', 'CONTAINS', instance)
        gr.setLimit(2)
        gr.query()
        if (gr.next()) {
            this._localPeerId = gr.getUniqueValue()
            // Two peer rows matching this instance means ownership evaluation is
            // ambiguous, which is unsafe rather than merely untidy. Refuse.
            if (gr.next()) {
                gs.error(
                    '[bridge] more than one bridge_peer base_url matches instance "' +
                        instance +
                        '" — refusing to act. Fix the peer rows.'
                )
                this._localPeerId = ''
            }
        }
        return this._localPeerId
    },

    /**
     * A table and all of its ancestors, so a policy on `cmdb_ci` covers
     * `cmdb_ci_linux_server`.
     *
     * Walks `sys_db_object.super_class` rather than using GlideTableHierarchy,
     * which is not available to scoped applications. Without this, CMDB mode would
     * need one policy row per CI class — hundreds of them — and the class of a CI
     * changing would silently drop it out of scope.
     */
    tableAncestry: function (tableName) {
        if (!tableName) return []
        if (this._ancestry[tableName]) return this._ancestry[tableName]

        var chain = []
        var current = tableName
        // Bounded: the deepest OOB hierarchy is nowhere near this, and a cycle in
        // sys_db_object would otherwise hang a business rule inside a user's save.
        for (var depth = 0; depth < 25 && current; depth++) {
            chain.push(current)
            var gr = new GlideRecord('sys_db_object')
            gr.addQuery('name', current)
            gr.setLimit(1)
            gr.query()

            /**
             * Two queries rather than `getValue('super_class.name')`. `getValue()` does not
             * reliably dot-walk and returns empty instead of failing, which here would
             * silently truncate the hierarchy to one entry — a policy on `cmdb_ci` would then
             * never match `cmdb_ci_server`, and CMDB mode would appear to ignore most CIs
             * with nothing in any log to explain it.
             */
            var parentName = ''
            if (gr.next()) {
                var superId = gr.getValue('super_class')
                if (superId) {
                    var parent = new GlideRecord('sys_db_object')
                    if (parent.get(superId)) parentName = parent.getValue('name') || ''
                }
            }
            current = parentName
            if (chain.indexOf(current) !== -1) break
        }

        this._ancestry[tableName] = chain
        return chain
    },

    /**
     * Active policies matching a table, most specific first.
     *
     * `direction` is relative to this instance: 'outbound' is what capture reads,
     * 'inbound' is what apply validates against.
     */
    policiesFor: function (tableName, direction) {
        var chain = this.tableAncestry(tableName)
        if (!chain.length) return []

        var out = []
        var gr = new GlideRecord(BridgeConfig.TABLE.policy)
        gr.addActiveQuery()
        gr.addQuery('table', 'IN', chain.join(','))
        if (direction) gr.addQuery('direction', direction)
        gr.query()
        while (gr.next()) {
            out.push({
                sys_id: gr.getUniqueValue(),
                peer: gr.getValue('peer'),
                table: gr.getValue('table'),
                direction: gr.getValue('direction'),
                mode: gr.getValue('mode'),
                field_list: gr.getValue('field_list') || '',
                condition: gr.getValue('condition') || '',
                ref_map: gr.getValue('ref_map') || '',
                target_map: gr.getValue('target_map') || '',
                target_table: gr.getValue('target_table') || '',
                owner_peer: gr.getValue('owner_peer'),
                propagate_deletes: gr.getValue('propagate_deletes') === '1',
                preserve_sys_id: gr.getValue('preserve_sys_id') === '1',
            })
        }

        // Most specific first, so `cmdb_ci_server` beats `cmdb_ci` when both exist.
        var self = this
        out.sort(function (a, b) {
            return self.tableAncestry(b.table).length - self.tableAncestry(a.table).length
        })
        return out
    },

    /**
     * Is there an active capture business rule covering this table?
     *
     * §D7: adding a table to the bridge is a policy record *plus* one capture business rule,
     * because rules are metadata bound to a table and there is no out-of-box "rule on any
     * table". The failure mode that matters is silent — a policy with no rule captures
     * nothing, reports nothing, and looks identical to a bridge that is switched off.
     *
     * Matches on the table or any ancestor, so a rule on `task` legitimately covers a policy
     * on `incident`. Identified by the script referencing `BridgeCapture` rather than by
     * scope, which avoids a dot-walk on `sys_scope` — `getValue()` does not dot-walk reliably,
     * and that bug already cost a day here.
     */
    hasCaptureRule: function (tableName) {
        var chain = this.tableAncestry(tableName)
        if (!chain.length) return false

        var gr = new GlideRecord('sys_script')
        gr.addQuery('collection', 'IN', chain.join(','))
        gr.addActiveQuery()
        gr.addQuery('script', 'CONTAINS', 'BridgeCapture')
        gr.setLimit(1)
        gr.query()
        return gr.hasNext()
    },

    /**
     * Re-stamp `capture_ready` on every active policy.
     *
     * Without this the field is only accurate on rows that happen to have been saved since the
     * column existed — so a policy that is perfectly fine reads `false`, which is a worse
     * signal than none at all. Called from the drain job, so adding or deactivating a capture
     * rule is reflected within a minute and nobody has to re-save records to refresh a
     * derived value.
     *
     * Writes only when the value actually changes, so this does not churn `sys_updated_on` on
     * the app's control surface every minute. Cost is bounded by the number of active
     * policies, which is a handful by design.
     *
     * @returns {number} rows corrected
     */
    refreshCaptureCoverage: function () {
        var corrected = 0
        var gr = new GlideRecord(BridgeConfig.TABLE.policy)
        gr.addActiveQuery()
        gr.query()
        while (gr.next()) {
            var tableName = gr.getValue('table')
            if (!tableName) continue

            var ready = this.hasCaptureRule(tableName)
            var stored = gr.getValue('capture_ready') === '1'
            if (ready !== stored) {
                gr.setValue('capture_ready', ready)
                gr.update()
                corrected++
            }
        }
        return corrected
    },

    peer: function (peerId) {
        var gr = new GlideRecord(BridgeConfig.TABLE.peer)
        if (!gr.get(peerId)) return null
        return {
            sys_id: gr.getUniqueValue(),
            name: gr.getValue('name'),
            base_url: (gr.getValue('base_url') || '').replace(/\/+$/, ''),
            connection_alias: gr.getValue('connection_alias'),
            oauth_profile: gr.getValue('oauth_profile'),
            role: gr.getValue('role'),
        }
    },

    /** Parsed `ref_map`, or an empty map. Malformed JSON is a config error, not a crash. */
    refMap: function (policy) {
        if (!policy || !policy.ref_map) return {}
        try {
            var parsed = JSON.parse(policy.ref_map)
            return parsed && typeof parsed === 'object' ? parsed : {}
        } catch (e) {
            gs.error('[bridge] policy ' + policy.sys_id + ' has unparseable ref_map: ' + e)
            return {}
        }
    },

    type: 'BridgeConfig',
}
