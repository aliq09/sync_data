/**
 * BridgeApply — spec/PROJECT_PLAN.md §6.3.
 *
 * The target side. Runs as the integration user, which is what makes echo
 * suppression work (§3.3) and what makes every replicated change attributable to a
 * named account in the audit log.
 *
 * The order of the checks is the design. Sequence before ownership before writing:
 * a replay is cheap to skip, an ownership violation must never reach a write, and
 * only then is it worth resolving references.
 */
var BridgeApply = Class.create()

BridgeApply.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
        this.refs = new BridgeRefTranslate()
    },

    /**
     * §6.2 — "Response returns per-item status so rows are marked individually, not
     * all-or-nothing." One poisoned item must not strand the 199 behind it.
     *
     * @param {string} peerId sending peer's bridge_peer sys_id, resolved from its name
     * @param {Array} items decoded payloads
     * @returns {Array} one result per item, in the same order
     */
    applyBatch: function (peerId, items) {
        var results = []
        if (!items || !items.length) return results

        // One set of lookup maps for the whole batch (§6.4). Building these per item
        // is the difference between an hour and a weekend.
        var maps = this.refs.prepare(items, peerId)

        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            try {
                results.push(this.apply(peerId, item, maps))
            } catch (e) {
                // An unexpected failure is this item's problem, not the batch's.
                var message = 'apply threw: ' + e
                gs.error('[bridge] ' + message + ' (source ' + (item && item.source_sys_id) + ')')
                this.deadLetter(item, message)
                var failed = {
                    source_sys_id: item ? item.source_sys_id : '',
                    status: 'failed',
                    error: message,
                }
                this._shadowApply(peerId, item, failed)
                results.push(failed)
            }
        }
        try {
            new BridgeAck().sendTerminalAcks(peerId, items, results)
        } catch (ackErr) {
            gs.warn('[bridge] terminal ack dispatch failed (apply result unchanged): ' + ackErr)
        }
        return results
    },

    /**
     * @returns {{source_sys_id: string, status: string, target_sys_id?: string,
     *   error?: string}} status is one of applied | skipped | rejected | failed
     */
    apply: function (peerId, item, maps) {
        var out = this._applyItem(peerId, item, maps)
        if (item && item.correlation_id) out.correlation_id = item.correlation_id
        out.acknowledgement = 'received'
        this._shadowApply(peerId, item, out)
        return out
    },

    _applyItem: function (peerId, item, maps) {
        var out = { source_sys_id: item.source_sys_id, status: 'failed' }

        // An inbound policy is required. Without this check an authenticated peer
        // could write any table in the instance, which is a much bigger surface than
        // the bridge is supposed to have. Policy is the allow-list.
        var policies = this.config.policiesFor(item.table, 'inbound')
        var policy = null
        for (var i = 0; i < policies.length; i++) {
            if (policies[i].peer === peerId) {
                policy = policies[i]
                break
            }
        }
        if (!policy) {
            out.status = 'rejected'
            out.error = 'no active inbound policy for table ' + item.table + ' from this peer'
            this.deadLetter(item, out.error)
            return out
        }

        // §3.2 — idempotency and out-of-order tolerance from one platform field.
        // Replay of an already-applied item lands here and costs one indexed read.
        var receipt = this.receipt(peerId, item.source_sys_id)
        if (receipt && receipt.last_seq >= item.seq) {
            out.status = 'skipped'
            out.target_sys_id = receipt.target_sys_id
            return out
        }

        // §3.1 — this instance owns the table, so an inbound write would be a
        // concurrent write. Straight to the DLQ; this is a configuration error
        // somewhere, and silently dropping it would hide a split-brain.
        if (this.ownsLocally(policy)) {
            out.status = 'rejected'
            out.error =
                'this instance owns ' + item.table + ' (policy ' + policy.sys_id + ') — inbound write refused'
            this.deadLetter(item, out.error)
            return out
        }

        if (item.op === 'delete') return this.applyDelete(peerId, item, policy, receipt, out)

        maps = maps || this.refs.prepare(null, peerId)
        maps.referenceHandling = this._referenceHandling(policy, maps)
        var translated = this.refs.translate(item, this.config.refMap(policy), maps)

        // §6.4 — "unresolvable: null the field, flag the record, note in DLQ." The
        // record is still written with the field nulled, because a task that arrives
        // without its assignee is more useful than a task that does not arrive; the
        // DLQ row is what stops that being invisible.
        if (translated.unresolved.length) {
            this.deadLetter(
                item,
                'unresolved references (record written with these fields nulled): ' +
                    JSON.stringify(translated.unresolved)
            )
        }

        var target =
            policy.mode === 'cmdb'
                ? this.viaIRE(item, policy, translated.values)
                : this.viaGlideRecord(item, policy, translated.values)

        if (!target || !target.sys_id) {
            out.error = target && target.error ? target.error : 'write produced no target sys_id'
            this.deadLetter(item, out.error)
            return out
        }

        this.writeReceipt(peerId, item, target.sys_id)
        this.writeXref(peerId, item, target.sys_id, maps)

        out.status = 'applied'
        out.target_sys_id = target.sys_id
        if (target.privilege) out.privilege = target.privilege
        return out
    },

    /**
     * §3.1 — ownership is per table, per `bridge_policy.owner_peer`.
     *
     * Takes the policy rather than a sys_id: ownership is a property of the table,
     * not of the individual record, and reading it off the policy keeps a single
     * source of truth. Per-record ownership would be a different design and would
     * bring conflict resolution with it, which §2 rules out.
     */
    ownsLocally: function (policy) {
        var localPeer = this.config.localPeerId()
        return !!localPeer && policy.owner_peer === localPeer
    },

    receipt: function (peerId, sourceSysId) {
        var gr = new GlideRecord(BridgeConfig.TABLE.receipt)
        gr.addQuery('peer', peerId)
        gr.addQuery('source_sys_id', sourceSysId)
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) return null
        return {
            sys_id: gr.getUniqueValue(),
            last_seq: parseInt(gr.getValue('last_seq'), 10) || 0,
            target_sys_id: gr.getValue('target_sys_id'),
        }
    },

    /**
     * §6.3 CMDB mode — IRE in-process, never over HTTP.
     *
     * Three things here are load-bearing, and each one is a documented footgun:
     *
     * - `source_native_key` is the *source* instance's sys_id, which is what makes
     *   `sys_object_source` the IRE cross-reference. 0.4.1 also upserts Record
     *   Mapping for CMDB applies so a later row can remap a reference such as
     *   `alm_hardware.ci`. IRE identification is unchanged.
     * - `source_recency_timestamp` is the source record's own `sys_updated_on`, not
     *   wall clock at send time. A stale timestamp on replay causes a silent no-op —
     *   no error, nothing applied, and nothing to notice.
     * - `values.sys_id` is never set. It short-circuits identification and creates
     *   duplicates, which is the exact failure the CMDB merge exists to avoid.
     *
     * NOTE, and flagged in spec/DECISIONS.md §8.2: the payload keys under
     * `sys_object_source_info` are *not* the column names. The columns are `name`,
     * `id` and `last_scan` (verified on-instance); the payload keys are
     * `source_name`, `source_native_key` and `source_recency_timestamp`. Confirm the
     * payload shape against the IRE API on the target instance during week 3 —
     * getting it wrong fails silently rather than loudly.
     */
    viaIRE: function (item, policy, values) {
        var peer = this.config.peer(policy.peer)
        if (!peer) return { error: 'peer row ' + policy.peer + ' not found' }

        // The discovery source is the peer's name, not a literal. §10: no hardcoded instance
        // names outside bridge_peer. It must exist as a choice on cmdb_ci.discovery_source or
        // IRE rejects the payload — shipped in ../fluent/integration/discovery-sources.now.ts.
        var spec = this._targetMap(policy)
        var payload = spec
            ? this._fanoutPayload(item, policy, peer, values, spec)
            : {
                  items: [
                      {
                          className: policy.target_table || item.table,
                          values: values,
                          sys_object_source_info: {
                              source_name: peer.name,
                              source_native_key: item.source_sys_id,
                              source_recency_timestamp: item.sys_updated_on,
                          },
                      },
                  ],
                  relations: [],
              }

        /**
         * IRE is invoked through `global.CMDBTransformUtil`, not
         * `sn_cmdb.IdentificationEngineScriptableApi`.
         *
         * §6.3 prescribes the latter, and it does not exist on this release — `new
         * sn_cmdb.IdentificationEngineScriptableApi()` throws "undefined is not a function" in
         * both global and application scope, and `sys_scope` has no `sn_cmdb` row at all.
         *
         * Found by reading how the platform calls IRE itself: `CMDBTransformUtil` and
         * `DiscoveryCMDBUtil` both do `SNC.IdentificationEngineScriptableApi` — the `SNC`
         * internal namespace, used as a *static* rather than instantiated. `SNC` is not
         * reachable from a scoped application, so calling it directly is not an option here.
         *
         * `CMDBTransformUtil` is the way through: it is `public`, active, and it is what CMDB
         * import-set transform maps use to route a payload through IRE. So identification and
         * reconciliation still happen in-process with `cmdb_identifier` and
         * `cmdb_reconciliation_definition` doing their jobs — which is what §6.3 actually cares
         * about — via a supported entry point rather than an internal one.
         */
        var util = new global.CMDBTransformUtil()
        util.identifyAndReconcileFromPayload(JSON.stringify(payload), null, null)

        if (util.hasError()) {
            return { error: 'IRE error: ' + util.getError() }
        }

        // Prefer the direct accessor; fall back to parsing the output payload, which carries
        // per-item results and is what a multi-item (fan-out) payload will need.
        var sysId = String(util.getOutputRecordSysId() || '')
        if (sysId) return { sys_id: sysId, operation: 'ire' }

        return this._readIreResult(String(util.getOutputPayload() || ''))
    },

    /** Parsed `target_map`, or null when the policy maps one record to one CI. */
    _targetMap: function (policy) {
        if (!policy || !policy.target_map) return null
        try {
            var parsed = JSON.parse(policy.target_map)
            if (!parsed || !parsed.items || !parsed.items.length) return null
            return parsed
        } catch (e) {
            gs.error('[bridge] policy ' + policy.sys_id + ' has unparseable target_map: ' + e)
            return null
        }
    },

    /**
     * One source record → N CIs in N classes, plus the relationships between them.
     *
     * Two details that make this work rather than merely look right:
     *
     * - **Each item gets its own `source_native_key`**, suffixed with the item's `key`
     *   (`<source sys_id>:svc`). Reusing the bare source sys_id for every item would make IRE
     *   treat them as the same source object, and `sys_object_source` could not distinguish the
     *   service from the business application on the next sync — the fan-out would collapse.
     * - **Relations reference items by array index**, which is IRE's contract, so the string
     *   keys in the policy are resolved to positions here. Keys exist because an index in a
     *   config record is unreadable and breaks the moment someone reorders the array.
     */
    _fanoutPayload: function (item, policy, peer, values, spec) {
        var items = []
        var indexByKey = {}

        for (var i = 0; i < spec.items.length; i++) {
            var target = spec.items[i]
            if (!target.className) continue

            indexByKey[target.key || String(i)] = items.length
            items.push({
                className: target.className,
                values: this._mapFields(values, target.field_map),
                sys_object_source_info: {
                    source_name: peer.name,
                    source_native_key: item.source_sys_id + ':' + (target.key || String(i)),
                    source_recency_timestamp: item.sys_updated_on,
                },
            })
        }

        var relations = []
        var declared = spec.relations || []
        for (var r = 0; r < declared.length; r++) {
            var rel = declared[r]
            var parent = indexByKey[rel.parent]
            var child = indexByKey[rel.child]
            if (parent === undefined || child === undefined || !rel.type) {
                gs.warn(
                    '[bridge] policy ' + policy.sys_id + ' relation skipped, unknown key or type: ' +
                        JSON.stringify(rel)
                )
                continue
            }
            relations.push({ parent: parent, child: child, type: rel.type })
        }

        return { items: items, relations: relations }
    },

    /**
     * Source field names → target field names.
     *
     * An empty map passes everything through unchanged, which is the non-CMDB case. A field
     * absent from a non-empty map is *dropped*, not carried: a `u_` field with no out-of-box
     * home must not silently arrive on the target, because §9 forbids custom fields on
     * `cmdb_ci` and an unmapped field is an unmade modelling decision.
     */
    _mapFields: function (values, fieldMap) {
        if (!fieldMap) return values

        var out = {}
        for (var source in fieldMap) {
            if (!Object.prototype.hasOwnProperty.call(fieldMap, source)) continue
            var targetField = fieldMap[source]
            if (targetField && values[source] !== undefined) out[targetField] = values[source]
        }
        return out
    },

    /**
     * IRE reports failure inside a 200-shaped response, so the result has to be
     * read rather than assumed. An empty `items` array with no error is still a
     * failure from this app's point of view: nothing was written and there is no
     * sys_id to record a receipt against.
     */
    _readIreResult: function (raw) {
        var parsed
        try {
            parsed = JSON.parse(raw)
        } catch (e) {
            return { error: 'IRE returned unparseable response: ' + raw }
        }

        if (parsed.errors && parsed.errors.length) {
            return { error: 'IRE error: ' + JSON.stringify(parsed.errors) }
        }

        var first = parsed.items && parsed.items.length ? parsed.items[0] : null
        if (!first) return { error: 'IRE returned no items: ' + raw }
        if (first.errors && first.errors.length) {
            return { error: 'IRE item error: ' + JSON.stringify(first.errors) }
        }
        if (!first.sysId && !first.sys_id) {
            return { error: 'IRE identified no CI: ' + raw }
        }

        return { sys_id: first.sysId || first.sys_id, operation: first.operation || '' }
    },

    /**
     * §6.3 direct mode.
     *
     * Target resolution, in order: an existing receipt (authoritative — we have seen
     * this record), then `bridge_xref`, then insert.
     *
     * On sys_ids, this deviates from §6.3's "derived deterministic id" and the
     * reason is worth stating. §6.3 offers two branches, both of which force a
     * sys_id: preserve the source's where §8.1 showed it safe, or derive a
     * deterministic one otherwise. The second branch needs a hash function this app
     * would have to invent, and its only benefit is computing the mapping without a
     * lookup — but §4 already mandates `bridge_xref` for exactly this mapping. So
     * the default here lets the platform generate the sys_id and records it in
     * `bridge_xref`, which is idempotent by the same argument and adds nothing
     * custom. Preserving the source sys_id stays available as an opt-in per policy
     * once §8.1 has actually been run.
     */
    viaGlideRecord: function (item, policy, values) {
        var existing = this._findTarget(item, policy)

        if (existing) {
            var upd = new GlideRecord(item.table)
            if (!upd.get(existing)) {
                // The mapping points at a record that no longer exists — someone
                // deleted it locally. Fall through to insert rather than failing:
                // convergence onto the new instance is the goal.
                return this._insert(item, policy, values)
            }
            this._setValues(upd, values)
            var updated = upd.update()
            if (updated) return { sys_id: updated, operation: 'update' }
            var updateFallback = this._metadataFallback(item, values, 'update', existing, upd)
            if (updateFallback) return updateFallback
            return { error: this._writeError('update', item.table, upd, existing) }
        }

        return this._insert(item, policy, values)
    },

    _insert: function (item, policy, values) {
        var gr = new GlideRecord(item.table)
        gr.initialize()
        this._setValues(gr, values)

        if (policy.preserve_sys_id) {
            /**
             * §6.3's footgun, in full: "inserting with an existing sys_id can
             * silently become an *update*, overwriting the record already there. Not
             * an error." So the existence check is not optional, and a hit is a
             * routing decision rather than a retry.
             */
            var clash = new GlideRecord(item.table)
            if (clash.get(item.source_sys_id)) {
                return {
                    error:
                        'sys_id ' +
                        item.source_sys_id +
                        ' already exists in ' +
                        item.table +
                        ' and is not mapped to this source record — refusing to overwrite. ' +
                        'This is a §8.1 collision: route it deliberately.',
                }
            }
            gr.setNewGuidValue(item.source_sys_id)
        }

        var inserted = gr.insert()
        if (inserted) return { sys_id: inserted, operation: 'insert' }
        var insertFallback = this._metadataFallback(item, values, 'insert', policy.preserve_sys_id ? item.source_sys_id : '', gr)
        if (insertFallback) return insertFallback
        return { error: this._writeError('insert', item.table, gr) }
    },

    /**
     * Declared metadata tables. Scoped GlideRecord honors every matching ACL,
     * including Deny-Unless rules that an extra Allow-If cannot override.
     * The fallback writes the same row as the same user from global scope.
     */
    _isMetadataTable: function (table) {
        return (
            table === 'sys_script' ||
            table === 'sc_cat_item' ||
            table === 'item_option_new' ||
            table === 'sys_user_group'
        )
    },

    /**
     * Retry only when the refusal looks like security. A validation abort
     * that already has a message stays failed as the worker.
     */
    _securityRefusal: function (op, gr) {
        var detail = ''
        var allowed = true
        try {
            detail = gr.getLastErrorMessage() || ''
        } catch (ignore) {
            detail = ''
        }
        try {
            allowed = op === 'insert' ? !!gr.canCreate() : !!gr.canWrite()
        } catch (ignore2) {
            allowed = true
        }
        if (!allowed) return true
        if (!detail) return true
        return /acl|security|not allowed|insufficient|denied|privilege|does not have|access to/i.test(detail)
    },

    /**
     * @returns {object|null} a write result when this table is a metadata
     * table and the failure looks like security; null to keep the original error
     */
    _metadataFallback: function (item, values, op, sysId, gr) {
        if (!item || !this._isMetadataTable(item.table)) return null
        if (!this._securityRefusal(op, gr)) return null
        var result = this._callMetadataWriter(op, item.table, sysId, values)
        if (result && result.sys_id) {
            this._auditMetadataPrivilege(item, op, result.sys_id)
            return { sys_id: result.sys_id, operation: op, privilege: 'global_metadata_writer' }
        }
        var first = this._writeError(op, item.table, gr, op === 'update' ? sysId : '')
        var second = result && result.error ? result.error : 'metadata writer returned no sys_id'
        return { error: first + '; metadata writer: ' + second }
    },

    _callMetadataWriter: function (op, table, sysId, values) {
        var session = gs.getSession()
        var token = gs.generateGUID()
        var key = 'x_33764_sbridge.meta_write'
        try {
            session.putClientData(key, token)
        } catch (ignore) {}
        try {
            session.putProperty(key, token)
        } catch (ignore2) {}
        try {
            var writer = new global.SyncBridgeMetadataWrite()
            var payload = '{}'
            try {
                payload = JSON.stringify(values || {})
            } catch (jsonErr) {
                return { error: 'metadata values could not be serialized: ' + jsonErr }
            }
            return writer.write(op, table, sysId || '', payload, token) || { error: 'metadata writer returned nothing' }
        } catch (e) {
            return {
                error:
                    'SyncBridgeMetadataWrite is not installed in global (' +
                    e +
                    '). Re-install and confirm the system log says metadata writer callable as global.SyncBridgeMetadataWrite.',
            }
        } finally {
            try {
                session.clearClientData(key)
            } catch (ignore3) {}
            try {
                session.putProperty(key, '')
            } catch (ignore4) {}
        }
    },

    _auditMetadataPrivilege: function (item, op, targetSysId) {
        var user = ''
        try {
            user = gs.getUserName() || ''
        } catch (ignore) {
            user = ''
        }
        var note =
            'metadata privilege ' +
            op +
            ' ' +
            (item.table || '') +
            ' source ' +
            (item.source_sys_id || '') +
            ' target ' +
            targetSysId +
            ' as ' +
            user +
            ' via global.SyncBridgeMetadataWrite; admin was not granted'
        gs.info('[bridge] ' + note)
        try {
            var key = 'privilege:' + (item.source_sys_id || '') + ':' + (item.seq || 0) + ':' + op
            var gr = new GlideRecord(BridgeConfig.TABLE.transferAudit)
            if (!gr.isValid()) return
            gr.addQuery('legacy_key', key)
            gr.setLimit(1)
            gr.query()
            var existingAudit = gr.next()
            if (!existingAudit) {
                gr.initialize()
                gr.setValue('legacy_key', key)
            }
            gr.setValue('direction', 'inbound')
            gr.setValue('message_type', 'receive')
            gr.setValue('result', 'metadata_privilege')
            gr.setValue('source_table', item.table || '')
            gr.setValue('source_sys_id', item.source_sys_id || '')
            gr.setValue('target_sys_id', targetSysId || '')
            gr.setValue('sequence', item.seq || 0)
            gr.setValue('record_count', 1)
            if (item.correlation_id) gr.setValue('correlation_id', item.correlation_id)
            gr.setValue('error', note.substring(0, 4000))
            var id = existingAudit ? gr.update() : gr.insert()
            if (!id) gs.warn('[bridge] metadata privilege audit was not saved ' + (gr.getLastErrorMessage() || ''))
        } catch (e) {
            gs.warn('[bridge] metadata privilege audit failed: ' + e)
        }
    },

    /**
     * Scoped GlideRecord.insert/update returns null when an ACL, a cross-scope
     * ceiling, or a business rule refuses the write. The platform message is
     * the only way to tell those apart. Metadata tables retry through the
     * global writer; every other table stays on this user with no privilege.
     */
    _writeError: function (op, table, gr, sysId) {
        var detail = ''
        var can = ''
        try {
            detail = gr.getLastErrorMessage() || ''
        } catch (ignore) {
            detail = ''
        }
        try {
            if (op === 'insert') can = gr.canCreate() ? 'canCreate=true' : 'canCreate=false'
            else can = gr.canWrite() ? 'canWrite=true' : 'canWrite=false'
        } catch (ignore2) {
            can = ''
        }
        var where = op + ' into ' + table
        if (sysId) where = op + ' of ' + table + ' ' + sysId
        return where + ' returned no sys_id' + (can ? ' (' + can + ')' : '') + (detail ? ': ' + detail : '')
    },

    /**
     * Never writes sys_id, and never writes a system column. `sys_created_on` and
     * friends belong to the platform; setting them here would misrepresent local
     * provenance, and the audit trail is the SOX argument for the integration user
     * in the first place.
     */
    _setValues: function (gr, values) {
        for (var field in values) {
            if (!Object.prototype.hasOwnProperty.call(values, field)) continue
            if (field === 'sys_id') continue
            if (field.indexOf('sys_') === 0 && field !== 'sys_domain') continue
            if (!gr.isValidField(field)) continue

            /**
             * Journal fields must be *assigned*, not written with `setValue()`.
             *
             * `setValue('notes', text)` on a `journal_input` column is silently ignored — no
             * error, no entry in `sys_journal_field`, and the record saves happily. Assigning
             * the property invokes the journal setter, which is what actually appends an entry.
             *
             * Verified the hard way: a payload carried a work note, apply reported success, the
             * receipt was written, and the target had no journal entry at all. §6.1 calls
             * journals the single most commonly forgotten piece; this is the second distinct way
             * they go missing, after capture re-sending unchanged entries.
             */
            if (this._isJournalField(gr, field)) {
                if (values[field]) gr[field] = values[field]
                continue
            }

            gr.setValue(field, values[field])
        }
    },

    _isJournalField: function (gr, field) {
        var element = gr.getElement(field)
        if (!element) return false
        var ed = element.getED()
        var type = ed ? String(ed.getInternalType()) : ''
        return type === 'journal' || type === 'journal_input' || type === 'journal_list'
    },

    _findTarget: function (item, policy) {
        var receipt = this.receipt(policy.peer, item.source_sys_id)
        if (receipt && receipt.target_sys_id) return receipt.target_sys_id

        var gr = new GlideRecord(BridgeConfig.TABLE.xref)
        gr.addQuery('peer', policy.peer)
        gr.addQuery('source_table', item.table)
        gr.addQuery('source_sys_id', item.source_sys_id)
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr.getValue('target_sys_id') : ''
    },

    /**
     * §D1 — applying a delete removes the receipt as well as the record.
     *
     * Leaving the receipt behind would set a high-water mark against a source record
     * that no longer exists, so a later re-insert of the same sys_id would be
     * rejected as stale. Removing it keeps replay idempotent by a different route: a
     * replayed delete finds no receipt, finds no target record, and reports
     * 'skipped' because there is nothing left to do.
     */
    applyDelete: function (peerId, item, policy, receipt, out) {
        var targetSysId = receipt && receipt.target_sys_id ? receipt.target_sys_id : this._findTarget(item, policy)

        if (!targetSysId) {
            out.status = 'skipped'
            return out
        }

        var gr = new GlideRecord(item.table)
        if (gr.get(targetSysId)) {
            gr.deleteRecord()
        }

        if (receipt) {
            var r = new GlideRecord(BridgeConfig.TABLE.receipt)
            if (r.get(receipt.sys_id)) r.deleteRecord()
        }

        var x = new GlideRecord(BridgeConfig.TABLE.xref)
        x.addQuery('peer', peerId)
        x.addQuery('source_table', item.table)
        x.addQuery('source_sys_id', item.source_sys_id)
        x.query()
        while (x.next()) x.deleteRecord()

        out.status = 'applied'
        out.target_sys_id = targetSysId
        return out
    },

    writeReceipt: function (peerId, item, targetSysId) {
        var gr = new GlideRecord(BridgeConfig.TABLE.receipt)
        gr.addQuery('peer', peerId)
        gr.addQuery('source_sys_id', item.source_sys_id)
        gr.setLimit(1)
        gr.query()

        if (gr.next()) {
            gr.setValue('last_seq', item.seq)
            gr.setValue('target_sys_id', targetSysId)
            gr.update()
            return gr.getUniqueValue()
        }

        gr.initialize()
        gr.setValue('peer', peerId)
        gr.setValue('source_sys_id', item.source_sys_id)
        gr.setValue('last_seq', item.seq)
        gr.setValue('target_sys_id', targetSysId)
        return gr.insert()
    },

    /**
     * Record Mapping for every successful upsert, including CMDB.
     * Later items in this batch read the same map BridgeRefTranslate caches.
     */
    writeXref: function (peerId, item, targetSysId, maps) {
        var gr = new GlideRecord(BridgeConfig.TABLE.xref)
        gr.addQuery('peer', peerId)
        gr.addQuery('source_table', item.table)
        gr.addQuery('source_sys_id', item.source_sys_id)
        gr.setLimit(1)
        gr.query()
        var stored = false
        if (gr.next()) {
            if (gr.getValue('target_sys_id') !== targetSysId) {
                gr.setValue('target_sys_id', targetSysId)
                gr.update()
            }
            stored = true
        } else {
            gr.initialize()
            gr.setValue('peer', peerId)
            gr.setValue('source_table', item.table)
            gr.setValue('source_sys_id', item.source_sys_id)
            gr.setValue('target_sys_id', targetSysId)
            stored = !!gr.insert()
            if (!stored) {
                gs.warn(
                    '[bridge] record mapping insert failed for ' +
                        item.table +
                        ' ' +
                        item.source_sys_id
                )
            }
        }
        if (stored && maps && item && item.source_sys_id) {
            if (!maps.xrefHits) maps.xrefHits = {}
            maps.xrefHits[peerId + '|' + item.source_sys_id] = targetSysId || ''
        }
    },

    /**
     * Movement-config reference handling for this policy. Default resolve.
     * Preserve skips implicit xref. An explicit ref_map strategy still applies.
     */
    _referenceHandling: function (policy, maps) {
        var id = policy && policy.sys_id
        if (!id) return 'resolve'
        if (!maps.handling) maps.handling = {}
        if (maps.handling[id]) return maps.handling[id]
        var value = 'resolve'
        var cfg = new GlideRecord(BridgeConfig.TABLE.movementConfig)
        cfg.addQuery('policy', id)
        cfg.setLimit(1)
        cfg.query()
        if (cfg.next() && cfg.isValidField('reference_handling')) {
            value = String(cfg.getValue('reference_handling') || 'resolve').toLowerCase()
        }
        if (value !== 'preserve' && value !== 'null_and_flag' && value !== 'resolve') value = 'resolve'
        maps.handling[id] = value
        return value
    },

    /**
     * A DLQ row carries the payload by value, not by reference: the outbox row it
     * came from lives on the *other* instance, and Table Cleanup will eventually
     * remove it there. `outbox_ref` is left empty on the target side for the same
     * reason — there is no local outbox row to point at.
     */
    deadLetter: function (item, error) {
        var gr = new GlideRecord(BridgeConfig.TABLE.dlq)
        gr.initialize()
        gr.setValue('error', String(error).substr(0, 4000))
        gr.setValue('payload', JSON.stringify(item || {}))
        gr.setValue('resolved', false)
        var id = gr.insert()
        try {
            new BridgeDualWrite().onTargetDlq(id, item, error)
        } catch (e) {
            gs.warn('[bridge] dual-write dlq shadow failed (ignored): ' + e)
        }
        return id
    },

    /** Phase 1 audit/result shadow. Never changes the apply result. */
    _shadowApply: function (peerId, item, out) {
        try {
            new BridgeDualWrite().onApplyOutcome(peerId, item, out)
        } catch (e) {
            gs.warn('[bridge] dual-write apply shadow failed (ignored): ' + e)
        }
    },

    type: 'BridgeApply',
}
