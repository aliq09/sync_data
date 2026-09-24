/**
 * BridgeCapture — spec/PROJECT_PLAN.md §6.1.
 *
 * Called from a synchronous **after** business rule, one per in-scope table. Its
 * only job is to write local outbox rows; it never talks to a peer (§3.4), because
 * a user's save must not block on remote latency or hang during a peer's upgrade
 * window.
 *
 * Async business rules are not used: they coalesce, and coalescing loses the
 * ordering that §3.2's sequencing depends on.
 */
var BridgeCapture = Class.create()

BridgeCapture.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
    },

    /**
     * @param {GlideRecord} current the record that just changed
     * @param {string} op 'insert' | 'update' | 'delete'
     * @returns {number} outbox rows written — 0 is a normal, common outcome
     */
    enqueue: function (current, op) {
        if (!current || !op) return 0

        // Fail closed. An unset integration_user means echo suppression is not
        // configured, and capturing the apply worker's own writes would ping-pong
        // them between instances without bound. A bridge that is silently off is
        // recoverable; an echo loop across three production instances is not.
        // See EXECUTION_PLAN.md §D3.
        if (!this.config.integrationUser()) {
            gs.warn(
                '[bridge] capture inert: ' +
                    BridgeConfig.PROP.integrationUser +
                    ' is not set. Nothing will be queued.'
            )
            return 0
        }

        // §3.3 — this write came from the apply worker, so it is a replicated
        // change arriving, not a local change to replicate.
        if (this.config.isIntegrationUser()) return 0

        // Note there is deliberately no isEnabled() check here. The master switch
        // stops the *jobs*, not capture: stopping capture would discard changes,
        // whereas letting the queue grow is the backpressure §5 describes and loses
        // nothing. Capture is governed by policy.active instead.

        var localPeer = this.config.localPeerId()
        if (!localPeer) return 0

        var tableName = current.getTableName()
        var policies = this.config.policiesFor(tableName, 'outbound')
        if (!policies.length) return 0

        var written = 0
        for (var i = 0; i < policies.length; i++) {
            if (this._enqueueOne(current, op, policies[i], localPeer, tableName)) written++
        }
        return written
    },

    _enqueueOne: function (current, op, policy, localPeer, tableName) {
        // §3.1 single-writer: capture only enqueues if *this* instance owns the
        // table. This is half of what prevents concurrent writes; apply's
        // ownership rejection is the other half.
        if (policy.owner_peer !== localPeer) return false

        // A peer does not send to itself. Guards against a policy row whose peer
        // was set to the local instance by mistake.
        if (policy.peer === localPeer) return false

        // §D1 — deletes are opt-in per policy, off by default. A delete on a
        // retiring legacy instance is not obviously an event the target should
        // honour, and not propagating them removes a class of destructive failure.
        if (op === 'delete' && !policy.propagate_deletes) return false

        if (!this._inScope(current, policy)) return false

        var payload = this._payload(current, policy, op)

        var gr = new GlideRecord(BridgeConfig.TABLE.outbox)
        gr.initialize()
        gr.setValue('peer', policy.peer)
        gr.setValue('table', tableName)
        gr.setValue('source_sys_id', current.getUniqueValue())
        gr.setValue('op', op)
        gr.setValue('seq', this.sequenceFor(current, op))
        gr.setValue('payload', JSON.stringify(payload))
        gr.setValue('state', 'pending')
        gr.setValue('attempts', 0)
        return !!gr.insert()
    },

    /**
     * §3.2 sequencing, with the one correction the plan needs.
     *
     * `sys_mod_count` is a platform-maintained per-record monotonic version, so no
     * sequence counter is built. But it does **not** increment on delete: carrying
     * it unchanged makes a delete arrive with the same seq as the update before it,
     * and apply's `last_seq >= seq` check then reports 'skipped' — the delete is
     * dropped with no error and no DLQ row, and the record survives on the target
     * forever. Adding one for deletes keeps a single monotonic field and keeps
     * replay idempotent (a replayed delete still compares equal and skips).
     *
     * Full reasoning and the alternative in EXECUTION_PLAN.md §D1.
     */
    sequenceFor: function (current, op) {
        var mod = parseInt(current.getValue('sys_mod_count'), 10)
        if (isNaN(mod)) mod = 0
        return op === 'delete' ? mod + 1 : mod
    },

    /**
     * §4 `bridge_policy.condition` — is this record in scope?
     *
     * GlideFilter evaluates the encoded query against the in-memory record, so no
     * second read is needed inside a user's transaction. An empty condition means
     * every record in the table.
     */
    _inScope: function (current, policy) {
        if (!policy.condition) return true
        try {
            return GlideFilter.checkRecord(current, policy.condition)
        } catch (e) {
            // A condition that cannot be evaluated is a config error. Excluding the
            // record is the safe reading: sending data the policy may not have
            // intended is worse than not sending it, and the queue is not the place
            // to discover a malformed filter.
            gs.error(
                '[bridge] policy ' + policy.sys_id + ' condition failed to evaluate: ' + e + ' — record skipped'
            )
            return false
        }
    },

    /**
     * §6.1 — only the fields in `field_list`, plus `sys_updated_on` and
     * `sys_mod_count`.
     *
     * Reference fields are emitted according to their `ref_map` strategy, and the
     * split matters: §6.4 says "prefer natural keys over sys_id lookups wherever one
     * exists", and a natural key can only be read on the side that holds the
     * record. The target cannot turn a foreign `sys_user` sys_id into a username —
     * it has never seen that sys_id. So capture resolves `user_name` and group-name
     * strategies here, and leaves id-based strategies for the target. xref /
     * record_mapping / business_key keep the source sys_id in `values` and, when
     * `business_key` is set, add `ref_keys` so apply can fall back after Record
     * Mapping. Other reference fields stay as sys_ids; apply remaps them when a
     * mapping exists.
     *
     * Journal fields are read through getJournalEntry rather than copied as a field
     * value: work notes and comments live in `sys_journal_field`, and reading the
     * element off the record returns the whole accumulated history, which would
     * re-append every prior entry on every sync. Only the newest entry travels.
     * §6.1 calls this the single most commonly forgotten piece — see
     * EXECUTION_PLAN.md §D8 for the attribution trade-off it carries.
     */
    _payload: function (current, policy, op) {
        var values = {}
        var refKeys = {}
        var hasRefKeys = false
        var refMap = this.config.refMap(policy)
        var fields = policy.field_list ? policy.field_list.split(',') : []

        for (var i = 0; i < fields.length; i++) {
            var field = (fields[i] || '').trim()
            if (!field || !current.isValidField(field)) continue

            if (this._isJournal(current, field)) {
                /**
                 * Only carry a journal entry when *this* transaction added one.
                 *
                 * `getJournalEntry(1)` returns the newest entry in history regardless of
                 * whether it changed, so emitting it unconditionally means every unrelated
                 * update re-sends the last note and apply appends it to the target again.
                 * The target accumulates a duplicate per update — and because each one is
                 * a legitimately new entry there, nothing downstream can tell it was a
                 * repeat. `changes()` is what makes the field carry news rather than state.
                 *
                 * The entry keeps its formatted header ("timestamp - user (label)"), so the
                 * original author and time survive as body text inside the entry the
                 * integration user writes on the target. That is EXECUTION_PLAN.md §D8's
                 * documented mitigation for journal attribution, and it is why the header
                 * is deliberately not stripped.
                 */
                if (!current.getElement(field).changes()) continue
                var entry = current[field].getJournalEntry(1)
                if (entry) values[field] = entry
                continue
            }

            var strategy = refMap[field] ? refMap[field].strategy : ''
            if (strategy === 'user_name' || strategy === 'group_name') {
                values[field] = this._naturalKey(current, field, strategy)
                continue
            }
            if (strategy === 'null_and_flag') {
                values[field] = ''
                continue
            }
            if (this._isXrefStrategy(strategy)) {
                values[field] = current.getValue(field)
                var stamp = this._businessKeyStamp(current, field, refMap[field])
                if (stamp) {
                    refKeys[field] = stamp
                    hasRefKeys = true
                }
                continue
            }

            // getValue returns the stored value — sys_id for references, the raw
            // choice value for choices. Display values would not survive
            // translation on the far side.
            values[field] = current.getValue(field)
        }

        var payload = {
            table: current.getTableName(),
            source_sys_id: current.getUniqueValue(),
            op: op,
            seq: this.sequenceFor(current, op),
            mode: policy.mode,
            policy: policy.sys_id,
            // §6.3: the source record's own timestamp, never wall clock at send
            // time. IRE uses it for recency, and a wall-clock value makes a replay
            // look newer than it is.
            sys_updated_on: current.getValue('sys_updated_on'),
            sys_mod_count: current.getValue('sys_mod_count'),
            values: values,
        }
        if (hasRefKeys) payload.ref_keys = refKeys
        return payload
    },

    _isXrefStrategy: function (strategy) {
        return (
            strategy === 'xref' ||
            strategy === 'record_mapping' ||
            strategy === 'mapping' ||
            strategy === 'business_key'
        )
    },

    /** Keep aligned with BridgeRefTranslate._businessKeyFields. */
    _businessKeyFields: function (spec) {
        if (!spec) return []
        var raw = spec.business_key
        if (raw === undefined || raw === null || raw === '') raw = spec.business_keys
        if (raw === undefined || raw === null || raw === '') return []
        var parts = []
        if (typeof raw === 'string') parts = raw.split(',')
        else if (typeof raw.length === 'number') {
            for (var i = 0; i < raw.length; i++) parts.push(String(raw[i]))
        }
        var out = []
        for (var j = 0; j < parts.length; j++) {
            var name = String(parts[j] || '').replace(/^\s+|\s+$/g, '')
            if (name) out.push(name)
        }
        return out
    },

    _businessKeyStamp: function (current, field, spec) {
        var fields = this._businessKeyFields(spec)
        if (!fields.length) return null
        var raw = current.getValue(field)
        if (!raw) return null
        var ref
        try {
            ref = current.getElement(field).getRefRecord()
        } catch (e) {
            return null
        }
        if (!ref || !ref.isValidRecord()) return null
        var keys = {}
        for (var i = 0; i < fields.length; i++) {
            var name = fields[i]
            if (!ref.isValidField(name)) return null
            keys[name] = ref.getValue(name) || ''
        }
        return {
            table: (spec && (spec.table || spec.source_table)) || ref.getTableName(),
            keys: keys,
        }
    },

    /**
     * Resolve a reference to its natural key on this side.
     *
     * An empty reference stays empty rather than becoming the string "null" — the
     * target has to be able to tell "not set" from "set to something I could not
     * resolve", because §6.4 treats those differently: the first is data, the second
     * gets flagged.
     */
    _naturalKey: function (current, field, strategy) {
        var raw = current.getValue(field)
        if (!raw) return ''

        var ref = current.getElement(field).getRefRecord()
        if (!ref || !ref.isValidRecord()) return ''

        var keyField = strategy === 'user_name' ? 'user_name' : 'name'
        return ref.getValue(keyField) || ''
    },

    _isJournal: function (current, field) {
        var ed = current.getElement(field).getED()
        var type = ed ? String(ed.getInternalType()) : ''
        return type === 'journal' || type === 'journal_input' || type === 'journal_list'
    },

    type: 'BridgeCapture',
}
