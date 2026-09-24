/**
 * BridgeApply — spec/PROJECT_PLAN.md §6.3.
 *
 * The target side. Runs as the integration user, which is what makes echo
 * suppression work (§3.3) and what makes every replicated change attributable to a
 * named account in the audit log.
 *
 * The order of the checks is the design. A newer sequence is applied. An older
 * sequence is skipped. The same sequence is a skip only when the translated
 * payload already matches the target, so a re-execute can fill computer fields
 * and rewrite child foreign keys without inserting a second row. An ownership
 * violation never reaches a write.
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
        // An older seq is a replay and costs one indexed read. The same seq is a
        // replay only when the translated values already match the target. That
        // lets a re-execute of an unchanged source row fill fields that were not
        // in the earlier payload and point child FKs at the mapped parent.
        var receipt = this.receipt(peerId, item.source_sys_id)
        var incoming = parseInt(item.seq, 10)
        if (isNaN(incoming)) incoming = 0
        if (receipt && receipt.last_seq > incoming) {
            out.status = 'skipped'
            out.target_sys_id = receipt.target_sys_id
            return out
        }

        var translated = null
        if (item.op !== 'delete') {
            maps = maps || this.refs.prepare(null, peerId)
            this._maps = maps
            maps.referenceHandling = this._referenceHandling(policy, maps)
            translated = this.refs.translate(item, this.config.refMap(policy), maps)
            // Software-instance (and the other Path A children) need local FKs
            // before the same-seq compare and before the write. A source sys_id
            // left in `software` makes the target before-rule abort the insert.
            this._prepareCmdbChild(item, translated.values, maps, false)
            if (
                receipt &&
                receipt.last_seq === incoming &&
                !this._valuesDiffer(item, translated.values, receipt.target_sys_id)
            ) {
                out.status = 'skipped'
                out.target_sys_id = receipt.target_sys_id
                return out
            }
        } else if (receipt && receipt.last_seq >= incoming) {
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

        // Create a missing software product only once this write is allowed.
        // The earlier pass only rewrites references that already exist here,
        // so a same-seq skip does not insert a product model.
        this._prepareCmdbChild(item, translated.values, maps, true)

        // Same-seq refresh of an existing CI goes through GlideRecord. IRE treats an
        // unchanged source_recency_timestamp as a no-op, which would drop the
        // computer fields this re-execute is trying to fill. A first apply and a
        // higher seq still use IRE when the policy mode is cmdb.

        var sameSeqRefresh = !!(receipt && receipt.last_seq === incoming)
        var target =
            policy.mode === 'cmdb' && !sameSeqRefresh
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
     * Same-seq replay writes only when a field we would set differs.
     * Journals are ignored so an unchanged note is not appended again.
     * A missing target returns true so the caller inserts.
     */
    _valuesDiffer: function (item, values, targetSysId) {
        if (!item || !targetSysId) return true
        try {
            var gr = new GlideRecord(item.table)
            if (!gr.isValid() || !gr.get(targetSysId)) return true
            values = values || {}
            for (var field in values) {
                if (!Object.prototype.hasOwnProperty.call(values, field)) continue
                if (field === 'sys_id') continue
                if (field.indexOf('sys_') === 0 && field !== 'sys_domain') continue
                if (!gr.isValidField(field)) continue
                if (this._isJournalField(gr, field)) continue
                var next = this._normValue(values[field])
                var current = this._normValue(gr.getValue(field))
                if (next !== current) return true
            }
            return false
        } catch (e) {
            return true
        }
    },

    _normValue: function (value) {
        if (value === undefined || value === null) return ''
        var text = String(value)
        if (text === 'true') return '1'
        if (text === 'false') return '0'
        return text
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
        var table = this._insertGlideTable(item)

        if (existing) {
            var upd = new GlideRecord(table)
            if (!upd.isValid() || !upd.get(existing)) {
                if (table !== item.table) upd = new GlideRecord(item.table)
                if (!upd.isValid() || !upd.get(existing)) {
                    // The mapping points at a record that no longer exists — someone
                    // deleted it locally. Fall through to insert rather than failing:
                    // convergence onto the new instance is the goal.
                    return this._insert(item, policy, values)
                }
            }
            this._setValues(upd, values)
            if (this._isSoftwareItem(item, table)) {
                this._stampSoftwareFields(upd, values)
                this._rememberSoftwareHold(item, upd)
            }
            var updated = upd.update()
            if (updated) return { sys_id: updated, operation: 'update' }
            var updateFallback = this._metadataFallback(item, values, 'update', existing, upd)
            if (updateFallback) return updateFallback
            return { error: this._writeError('update', upd.getTableName() || table, upd, existing, item) }
        }

        return this._insert(item, policy, values)
    },

    _insert: function (item, policy, values) {
        // cmdb_sam_sw_install is not required. PDIs without Software Asset
        // Management do not have that table, and the inbound policy table is
        // cmdb_software_instance. A second insert on another class only hid
        // the first failure.
        var table = this._insertGlideTable(item)
        return this._insertInto(table, item, policy, values)
    },

    _insertInto: function (table, item, policy, values) {
        var gr = new GlideRecord(table)
        if (!gr.isValid()) return { error: 'invalid table ' + table }
        if (this._isSoftwareItem(item, table)) this._sealSoftwareInstance(item, values, this._maps, true)
        gr.initialize()
        this._setValues(gr, values)
        if (this._isSoftwareItem(item, table)) {
            // Stamp the mandatory pair last. A dangling software setValue can
            // clear name, and a failed insert often wipes the GlideRecord, which
            // is why 0.4.6 reported "empty name, installed_on" after the outbox
            // already had both. Read them back before insert. Skip the insert
            // only when the working copy itself is missing one of them — that
            // insert would abort and the cleared record would look the same.
            this._stampSoftwareFields(gr, values)
            this._rememberSoftwareHold(item, gr)
            if (!values.name || !values.installed_on) {
                var can = ''
                try {
                    can = gr.canCreate() ? 'canCreate=true' : 'canCreate=false'
                } catch (ignore) {
                    can = ''
                }
                return {
                    error:
                        'insert into ' +
                        table +
                        ' aborted before insert' +
                        (can ? ' (' + can + ')' : '') +
                        ': ' +
                        this._softwareAbortDetail(item, null, 'before'),
                }
            }
        }

        if (policy.preserve_sys_id) {
            /**
             * §6.3's footgun, in full: "inserting with an existing sys_id can
             * silently become an *update*, overwriting the record already there. Not
             * an error." So the existence check is not optional, and a hit is a
             * routing decision rather than a retry.
             */
            var clash = new GlideRecord(table)
            if (clash.get(item.source_sys_id)) {
                return {
                    error:
                        'sys_id ' +
                        item.source_sys_id +
                        ' already exists in ' +
                        table +
                        ' and is not mapped to this source record — refusing to overwrite. ' +
                        'This is a §8.1 collision: route it deliberately.',
                }
            }
            gr.setNewGuidValue(item.source_sys_id)
        }

        var inserted = gr.insert()
        if (inserted) return { sys_id: inserted, operation: 'insert' }
        var insertFallback = this._metadataFallback(
            item,
            values,
            'insert',
            policy.preserve_sys_id ? item.source_sys_id : '',
            gr
        )
        if (insertFallback) return insertFallback
        return { error: this._writeError('insert', table, gr, '', item) }
    },

    /**
     * Insert class for this payload. payload.table stays the policy table so
     * the inbound policy matches. record_class is used only when it extends
     * that table. cmdb_sam_sw_install is never selected: this has to succeed
     * on cmdb_software_instance when that subclass is not installed.
     */
    _insertGlideTable: function (item) {
        var table = item && item.table ? item.table : ''
        var cls = item && item.record_class ? String(item.record_class) : ''
        if (
            cls &&
            cls !== table &&
            cls !== 'cmdb_sam_sw_install' &&
            this._tableValid(cls) &&
            this._extendsTable(cls, table)
        ) {
            return cls
        }
        return table
    },

    _extendsTable: function (className, parentName) {
        if (!className || !parentName) return false
        if (className === parentName) return true
        var chain = []
        try {
            chain = this.config.tableAncestry(className) || []
        } catch (e) {
            chain = [className]
        }
        for (var i = 0; i < chain.length; i++) {
            if (chain[i] === parentName) return true
        }
        return false
    },

    _tableValid: function (tableName) {
        if (!tableName) return false
        try {
            var gr = new GlideRecord(tableName)
            return !!(gr && gr.isValid())
        } catch (e) {
            return false
        }
    },

    _isSoftwareItem: function (item, table) {
        var names = [table, item && item.table, item && item.record_class]
        for (var i = 0; i < names.length; i++) {
            if (names[i] === 'cmdb_software_instance' || names[i] === 'cmdb_sam_sw_install') return true
        }
        return false
    },

    /**
     * Put name and a local installed_on back on the working copy.
     *
     * Translate can already have blanked installed_on: an explicit xref or
     * null_and_flag miss stores '', and _localizeChildValues skips an empty
     * raw value, so the outbox sys_id is never restored. An implicit miss
     * keeps the source sys_id. That id is not a CI on this instance, so the
     * reference element clears it and the before rule then clears name when
     * software is also a source sys_id. The hardcoded software reference
     * (cmdb_software_product_model) is not the dictionary target on a PDI
     * without SAM; a cmdb_ci_spkg hit was discarded because it was not a row
     * in that missing table.
     *
     * This does not create a CI for installed_on. It does not read or write
     * cmdb_sam_sw_install.
     */
    _sealSoftwareInstance: function (item, values, maps, createMissing) {
        if (!item || !values || !this._isSoftwareItem(item, item.table)) return
        var payload = item.values || {}
        if (!values.name && payload.name) values.name = String(payload.name).substr(0, 255)
        this._coerceSoftwareIdentity(item, values)
        if (!values.name && payload.display_name) values.name = String(payload.display_name).substr(0, 255)

        var installed = this._resolveInstalledOn(item, values, maps)
        if (installed) {
            values.installed_on = installed
            item._bridge_installed_on_note = ''
        } else {
            var sourceOn = payload.installed_on || values.installed_on || ''
            var ciName = this._installedOnName(item)
            var named = ciName ? this._ciNameLookup(ciName) : { id: '', count: 0 }
            if (sourceOn && this._rowExists('cmdb_ci', sourceOn)) {
                values.installed_on = String(sourceOn)
                item._bridge_installed_on_note = ''
            } else {
                // A source sys_id that is not a local CI is what the before
                // rule blanks. Leave it off the GlideRecord and say why.
                delete values.installed_on
                item._bridge_installed_on_note =
                    'installed_on ' +
                    (sourceOn || '(empty)') +
                    ' is not a cmdb_ci on this instance' +
                    (ciName ? ' (computer name ' + ciName + ')' : '') +
                    (named.count > 1
                        ? '; cmdb_ci name matched more than one row'
                        : '; Record Mapping and cmdb_ci name lookup missed')
            }
        }

        this._resolveSoftwareField(item, values, maps, !!createMissing)
    },

    _installedOnName: function (item) {
        var keys = item && item.ref_keys && item.ref_keys.installed_on && item.ref_keys.installed_on.keys
        if (!keys) return ''
        return keys.name || keys.display_name || ''
    },

    /**
     * PDI2 computer sys_id for installed_on.
     * Prefers a value that is already a cmdb_ci row, then Record Mapping
     * with no source_table filter (the computer row is stored under
     * cmdb_ci_computer, not cmdb_ci), then a unique cmdb_ci name. An empty
     * xref cache entry is not trusted: a miss cached under the wrong
     * preferred table would otherwise stick.
     */
    _resolveInstalledOn: function (item, values, maps) {
        var payload = (item && item.values) || {}
        var payloadId = String(payload.installed_on || '').replace(/^\s+|\s+$/g, '')
        var current = String((values && values.installed_on) || '').replace(/^\s+|\s+$/g, '')
        var peerId = maps && maps.peerId ? maps.peerId : ''

        // Record Mapping wins over a business-key guess. The computer row is
        // stored with source_table = the policy class (cmdb_ci_computer or a
        // subclass), so this lookup does not filter source_table and does not
        // trust an empty xref cache entry.
        if (payloadId) {
            var mapped = this._lookupMappedCi(peerId, payloadId, maps)
            if (mapped) return mapped
            if (this._rowExists('cmdb_ci', payloadId)) return payloadId
        }
        if (current && current !== payloadId) {
            var mappedCurrent = this._lookupMappedCi(peerId, current, maps)
            if (mappedCurrent) return mappedCurrent
            if (this._rowExists('cmdb_ci', current)) return current
        }

        var ciName = this._installedOnName(item)
        if (!ciName) return ''
        var named = this._ciNameLookup(ciName)
        return named.count === 1 ? named.id : ''
    },

    _lookupMappedCi: function (peerId, sourceSysId, maps) {
        if (!peerId || !sourceSysId) return ''
        var cacheKey = peerId + '|' + sourceSysId
        if (maps && maps.xrefHits && maps.xrefHits[cacheKey] && this._rowExists('cmdb_ci', maps.xrefHits[cacheKey])) {
            return maps.xrefHits[cacheKey]
        }
        var target = ''
        try {
            var gr = new GlideRecord(BridgeConfig.TABLE.xref)
            gr.addQuery('peer', peerId)
            gr.addQuery('source_sys_id', sourceSysId)
            gr.setLimit(10)
            gr.query()
            while (gr.next()) {
                var id = gr.getValue('target_sys_id') || ''
                if (id && this._rowExists('cmdb_ci', id)) {
                    target = id
                    break
                }
            }
        } catch (e) {
            target = ''
        }
        if (target && maps) {
            if (!maps.xrefHits) maps.xrefHits = {}
            maps.xrefHits[cacheKey] = target
        }
        return target
    },

    _ciNameLookup: function (name) {
        if (!name || !this._tableValid('cmdb_ci')) return { id: '', count: 0 }
        try {
            var gr = new GlideRecord('cmdb_ci')
            if (!gr.isValidField('name')) return { id: '', count: 0 }
            gr.addQuery('name', name)
            gr.setLimit(2)
            gr.query()
            if (!gr.next()) return { id: '', count: 0 }
            var id = gr.getUniqueValue() || ''
            if (gr.next()) return { id: '', count: 2 }
            return { id: id, count: id ? 1 : 0 }
        } catch (e) {
            return { id: '', count: 0 }
        }
    },

    /**
     * Keep software only when the dictionary reference (cmdb_ci_spkg on a
     * PDI without SAM, not the hardcoded product model) contains the row.
     * Create that package as the integration user when the name is known.
     * A dangling source sys_id is omitted so it cannot abort the install.
     * name and installed_on are not cleared here.
     */
    _resolveSoftwareField: function (item, values, maps, createMissing) {
        var payload = (item && item.values) || {}
        var raw = values.software || payload.software || ''
        raw = raw ? String(raw) : ''
        var insertTable = this._insertGlideTable(item)
        var dictRef =
            this._dictionaryReference(insertTable, 'software') ||
            this._dictionaryReference(item.table, 'software') ||
            ''
        if (!raw) {
            delete values.software
            item._bridge_software_note = ''
            return
        }
        if (dictRef && this._rowExists(dictRef, raw)) {
            values.software = raw
            item._bridge_software_note = ''
            return
        }
        var peerId = maps && maps.peerId ? maps.peerId : ''
        var mapped = this._lookupMappedOnTable(peerId, raw, dictRef, maps)
        if (mapped) {
            values.software = mapped
            item._bridge_software_note = ''
            return
        }
        var byName = dictRef ? this._lookupSoftwareByName(item, 'software', dictRef) : ''
        if (byName && (!dictRef || this._rowExists(dictRef, byName))) {
            values.software = byName
            item._bridge_software_note = ''
            return
        }
        if (createMissing) {
            var created = this._insertSoftwareDependency(item, 'software', { reference: dictRef }, raw, maps)
            if (created && (!dictRef || this._rowExists(dictRef, created))) {
                values.software = created
                item._bridge_software_note = ''
                return
            }
        }
        delete values.software
        item._bridge_software_note =
            'software ' +
            raw +
            ' omitted (not a local ' +
            (dictRef || 'software reference') +
            ' row)'
    },

    _lookupMappedOnTable: function (peerId, sourceSysId, tableName, maps) {
        if (!peerId || !sourceSysId || !tableName) return ''
        var cacheKey = peerId + '|' + sourceSysId
        if (maps && maps.xrefHits && maps.xrefHits[cacheKey] && this._rowExists(tableName, maps.xrefHits[cacheKey])) {
            return maps.xrefHits[cacheKey]
        }
        try {
            var gr = new GlideRecord(BridgeConfig.TABLE.xref)
            gr.addQuery('peer', peerId)
            gr.addQuery('source_sys_id', sourceSysId)
            gr.setLimit(10)
            gr.query()
            while (gr.next()) {
                var id = gr.getValue('target_sys_id') || ''
                if (id && this._rowExists(tableName, id)) return id
            }
        } catch (e) {}
        return ''
    },

    _dictionaryReference: function (tableName, field) {
        if (!tableName || !field || !this._tableValid(tableName)) return ''
        try {
            var gr = new GlideRecord(tableName)
            if (!gr.isValidField(field)) return ''
            var element = gr.getElement(field)
            var ed = element && element.getED()
            if (!ed) return ''
            var type = String(ed.getInternalType() || '')
            if (type !== 'reference' && type !== 'glide_list') return ''
            return String(ed.getReference() || '')
        } catch (e) {
            return ''
        }
    },

    _stampSoftwareFields: function (gr, values) {
        if (!gr || !values) return
        // Reference fields after the string name, then name again so a
        // reference setValue cannot be the last write to the mandatory pair.
        if (values.software) this._stampField(gr, 'software', values.software)
        if (values.installed_on) this._stampField(gr, 'installed_on', values.installed_on)
        if (values.name) this._stampField(gr, 'name', values.name)
        if (values.installed_on && !gr.getValue('installed_on')) this._stampField(gr, 'installed_on', values.installed_on)
        if (values.name && !gr.getValue('name')) this._stampField(gr, 'name', values.name)
    },

    _stampField: function (gr, field, value) {
        if (!gr || !field || value === undefined || value === null || String(value) === '') return
        if (!gr.isValidField(field)) return
        var text = String(value)
        try {
            gr.setValue(field, text)
        } catch (e) {}
        try {
            gr[field] = text
        } catch (e2) {}
        try {
            var element = gr.getElement(field)
            if (element && element.setValue) element.setValue(text)
        } catch (e3) {}
    },

    _rememberSoftwareHold: function (item, gr) {
        if (!item) return
        item._bridge_held = {
            name: '',
            installed_on: '',
            software: '',
        }
        try {
            item._bridge_held.name = gr.getValue('name') || ''
            item._bridge_held.installed_on = gr.getValue('installed_on') || ''
            item._bridge_held.software = gr.getValue('software') || ''
        } catch (e) {}
    },

    /**
     * Localize Path A child foreign keys before the write.
     *
     * canCreate stays true and getLastErrorMessage stays empty when a before
     * rule calls setAbortAction because `software` (or software_model /
     * discovery_model) holds a source sys_id that is not a row here. NIC and
     * storage pass because their computer FK was already in the payload and
     * Record Mapping resolved it. The metadata writer allow-list is still only
     * sys_script, sc_cat_item, item_option_new, and sys_user_group — a global
     * GlideRecord would hit the same before rule.
     */
    _prepareCmdbChild: function (item, values, maps, createMissing) {
        if (!item || !values) return
        var translator = this.refs
        if (!translator || !translator.childReferenceFieldNames) {
            this._sealSoftwareInstance(item, values, maps, !!createMissing)
            return
        }
        if (!this._isCmdbChildItem(item)) {
            this._sealSoftwareInstance(item, values, maps, !!createMissing)
            return
        }
        this._coerceSoftwareIdentity(item, values)
        this._localizeChildValues(item, values, maps, !!createMissing)
        this._sealSoftwareInstance(item, values, maps, !!createMissing)
    },

    _isCmdbChildItem: function (item) {
        var translator = this.refs
        if (!translator || !translator.childIncludeFields) return false
        var names = [item.table, item.record_class]
        for (var i = 0; i < names.length; i++) {
            if (names[i] && translator.childIncludeFields(names[i]).length) return true
        }
        return false
    },

    _coerceSoftwareIdentity: function (item, values) {
        if (!this._isSoftwareItem(item, item.table)) return
        if (values.name) return
        var named = ''
        var keys = item.ref_keys && item.ref_keys.software && item.ref_keys.software.keys
        if (keys) named = keys.display_name || keys.name || ''
        if (!named && values.display_name) named = values.display_name
        if (!named && values.publisher && values.version) named = String(values.publisher) + ' ' + String(values.version)
        if (named) values.name = String(named).substr(0, 255)
    },

    _localizeChildValues: function (item, values, maps, createMissing) {
        var translator = this.refs
        var fieldNames = this._childFieldUnion(item, 'childReferenceFieldNames')
        for (var i = 0; i < fieldNames.length; i++) {
            var field = fieldNames[i]
            if (!Object.prototype.hasOwnProperty.call(values, field)) continue
            var raw = values[field]
            if (raw === undefined || raw === null || String(raw) === '') continue
            var spec =
                translator.childReferenceSpec(item.record_class || item.table, field) ||
                translator.childReferenceSpec(item.table, field)
            var refTable = (spec && spec.reference) || ''
            // The live dictionary wins over the hardcoded product-model spec.
            // On a PDI without SAM, software references cmdb_ci_spkg, and
            // cmdb_software_product_model is not a table.
            var dictRef =
                this._dictionaryReference(item.record_class || item.table, field) ||
                this._dictionaryReference(item.table, field)
            if (dictRef) refTable = dictRef
            else if (refTable && !this._tableValid(refTable)) refTable = ''
            if (refTable && this._rowExists(refTable, raw)) continue
            var sourceId = String(raw)
            var replacement = ''
            if (item.ref_keys && item.ref_keys[field]) {
                replacement = translator._lookupBusinessKey(item, field, spec || {}, refTable) || ''
            }
            if (!replacement && (field === 'software' || field === 'software_model')) {
                replacement = this._lookupSoftwareByName(item, field, refTable) || ''
            }
            if (
                !replacement &&
                createMissing &&
                (field === 'software' || field === 'software_model')
            ) {
                replacement = this._insertSoftwareDependency(item, field, { reference: refTable }, sourceId, maps) || ''
            }
            if (replacement && refTable && !this._rowExists(refTable, replacement)) replacement = ''
            if (replacement) {
                values[field] = replacement
                continue
            }
            if (createMissing && this._dropDanglingSoftwareRef(field, values)) delete values[field]
        }
    },

    _childFieldUnion: function (item, method) {
        var translator = this.refs
        var seen = {}
        var out = []
        var names = [item.table, item.record_class]
        for (var i = 0; i < names.length; i++) {
            if (!names[i] || !translator[method]) continue
            var list = translator[method](names[i]) || []
            for (var j = 0; j < list.length; j++) {
                if (!list[j] || seen[list[j]]) continue
                seen[list[j]] = true
                out.push(list[j])
            }
        }
        return out
    },

    /**
     * A dangling product reference aborts the install. Drop it only when the
     * row still has a name (and, when we have it, installed_on). installed_on,
     * cmdb_ci, computer, parent, and child stay so the error names them.
     */
    _dropDanglingSoftwareRef: function (field, values) {
        if (field !== 'software' && field !== 'software_model' && field !== 'discovery_model') return false
        return !!(values && values.name)
    },

    _lookupSoftwareByName: function (item, field, preferred) {
        var keys = item.ref_keys && item.ref_keys[field] && item.ref_keys[field].keys
        var name = keys ? keys.name || keys.display_name || '' : ''
        if (!name && item.ref_keys && item.ref_keys.software && item.ref_keys.software.keys) {
            var softwareKeys = item.ref_keys.software.keys
            name = softwareKeys.name || softwareKeys.display_name || ''
        }
        if (!name) return ''
        var tables = this._softwareTables(preferred, item, field)
        for (var i = 0; i < tables.length; i++) {
            var found = this._findNamedRow(tables[i], name)
            if (!found) continue
            if (!preferred || tables[i] === preferred || this._rowExists(preferred, found)) return found
        }
        return ''
    },

    _softwareTables: function (preferred, item, field) {
        var stamped = item.ref_keys && item.ref_keys[field] ? item.ref_keys[field].table : ''
        var names = [preferred, stamped, 'cmdb_ci_spkg', 'cmdb_software_product_model']
        var seen = {}
        var out = []
        for (var i = 0; i < names.length; i++) {
            if (!names[i] || seen[names[i]]) continue
            seen[names[i]] = true
            out.push(names[i])
        }
        return out
    },

    _findNamedRow: function (tableName, name) {
        if (!tableName || !name || !this._tableValid(tableName)) return ''
        try {
            var gr = new GlideRecord(tableName)
            if (gr.isValidField('name')) gr.addQuery('name', name)
            else return ''
            gr.setLimit(2)
            gr.query()
            if (!gr.next()) return ''
            var id = gr.getUniqueValue()
            if (gr.next()) return ''
            return id || ''
        } catch (e) {
            return ''
        }
    },

    /**
     * Create the missing software product as the integration user when the
     * source sys_id is not on this instance. Does not use the metadata writer
     * and does not grant admin. A failed create leaves the caller to drop the
     * dangling reference.
     */
    _insertSoftwareDependency: function (item, field, spec, sourceId, maps) {
        var keys = item.ref_keys && item.ref_keys[field] && item.ref_keys[field].keys
        var name = ''
        if (keys) name = keys.display_name || keys.name || ''
        if (!name && item.ref_keys && item.ref_keys.software && item.ref_keys.software.keys) {
            var softwareKeys = item.ref_keys.software.keys
            name = softwareKeys.display_name || softwareKeys.name || ''
        }
        if (!name) return ''
        var preferred = (spec && spec.reference) || ''
        var tables = this._softwareTables(preferred, item, field)
        var createOn = ''
        for (var i = 0; i < tables.length; i++) {
            if (this._tableValid(tables[i])) {
                createOn = tables[i]
                break
            }
        }
        if (!createOn) return ''
        var existing = this._findNamedRow(createOn, name)
        if (existing) {
            this._storeDependencyXref(item, field, sourceId, existing, createOn, maps)
            return existing
        }
        try {
            var gr = new GlideRecord(createOn)
            if (!gr.isValid()) return ''
            gr.initialize()
            if (gr.isValidField('name')) gr.setValue('name', String(name).substr(0, 255))
            if (gr.isValidField('display_name')) gr.setValue('display_name', String(name).substr(0, 255))
            var id = gr.insert()
            if (!id) return ''
            gs.info(
                '[bridge] created ' +
                    createOn +
                    ' ' +
                    id +
                    ' for software reference ' +
                    sourceId +
                    ' as ' +
                    (gs.getUserName() || '')
            )
            this._storeDependencyXref(item, field, sourceId, id, createOn, maps)
            return String(id)
        } catch (e) {
            gs.warn('[bridge] software dependency insert failed for ' + createOn + ': ' + e)
            return ''
        }
    },

    _storeDependencyXref: function (item, field, sourceId, targetId, tableName, maps) {
        if (!sourceId || !targetId || !tableName) return
        var peerId = maps && maps.peerId ? maps.peerId : ''
        if (maps && maps.xrefHits && peerId) maps.xrefHits[peerId + '|' + sourceId] = targetId
        if (!peerId) return
        try {
            var gr = new GlideRecord(BridgeConfig.TABLE.xref)
            gr.addQuery('peer', peerId)
            gr.addQuery('source_sys_id', sourceId)
            gr.addQuery('source_table', tableName)
            gr.setLimit(1)
            gr.query()
            if (gr.next()) {
                if (gr.getValue('target_sys_id') !== targetId) {
                    gr.setValue('target_sys_id', targetId)
                    gr.update()
                }
                return
            }
            gr.initialize()
            gr.setValue('peer', peerId)
            gr.setValue('source_table', tableName)
            gr.setValue('source_sys_id', sourceId)
            gr.setValue('target_sys_id', targetId)
            if (!gr.insert()) {
                gs.warn('[bridge] software dependency mapping was not saved for ' + field + ' ' + sourceId)
            }
        } catch (e) {
            gs.warn('[bridge] software dependency mapping failed: ' + e)
        }
    },

    _rowExists: function (tableName, sysId) {
        if (!tableName || !sysId) return false
        try {
            var gr = new GlideRecord(tableName)
            if (!gr.isValid()) return false
            return !!gr.get(sysId)
        } catch (e) {
            return false
        }
    },

    /**
     * Declared metadata tables. Scoped GlideRecord honors every matching ACL,
     * including Deny-Unless rules that an extra Allow-If cannot override.
     * The fallback writes the same row as the same user from global scope.
     *
     * cmdb_software_instance is not in this list. A global GlideRecord would
     * still run the same before rules, and the worker is not granted admin.
     * 0.4.7 seals name and installed_on and opens cross-scope create instead.
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
        var first = this._writeError(op, item.table, gr, op === 'update' ? sysId : '', item)
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
    _writeError: function (op, table, gr, sysId, item) {
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
        var sealed = this._softwareAbortDetail(item, gr, 'after')
        if (sealed) detail = detail ? detail + '; ' + sealed : sealed
        var childDetail = this._childWriteDetail(gr)
        if (childDetail) detail = detail ? detail + '; ' + childDetail : childDetail
        return where + ' returned no sys_id' + (can ? ' (' + can + ')' : '') + (detail ? ': ' + detail : '')
    },

    /**
     * payload vs the values read back from the GlideRecord before insert.
     * Post-insert getValue is not enough: a failed insert often clears the
     * record, so both mandatory fields look empty even when setValue held them
     * and a before rule aborted.
     */
    _softwareAbortDetail: function (item, gr, phase) {
        if (!item || !this._isSoftwareItem(item, item.table)) return ''
        var payload = item.values || {}
        var held = item._bridge_held || {}
        var parts = []
        parts.push(
            'payload name=' +
                this._diag(payload.name) +
                ' installed_on=' +
                this._diag(payload.installed_on) +
                ' software=' +
                this._diag(payload.software)
        )
        parts.push(
            'held before insert name=' +
                this._diag(held.name) +
                ' installed_on=' +
                this._diag(held.installed_on) +
                ' software=' +
                this._diag(held.software)
        )
        if (phase === 'after' && gr) {
            var afterName = ''
            var afterOn = ''
            try {
                afterName = gr.getValue('name') || ''
                afterOn = gr.getValue('installed_on') || ''
            } catch (e) {}
            parts.push('after insert name=' + this._diag(afterName) + ' installed_on=' + this._diag(afterOn))
            if ((held.name && !afterName) || (held.installed_on && !afterOn)) {
                parts.push('before-rule cleared name or installed_on during insert')
            }
        }
        if (!held.name || !held.installed_on) {
            parts.push('name and installed_on were not both on the GlideRecord before insert')
        }
        if (item._bridge_installed_on_note) parts.push(item._bridge_installed_on_note)
        if (item._bridge_software_note) parts.push(item._bridge_software_note)
        return parts.join('; ')
    },

    _diag: function (value) {
        if (value === undefined || value === null || String(value) === '') return '(empty)'
        var text = String(value)
        return text.length > 80 ? text.substr(0, 80) : text
    },

    /**
     * Names the fields a silent child-table abort usually cares about:
     * empty required columns, dangling references, and dictionary mandatory gaps.
     */
    _childWriteDetail: function (gr) {
        if (!gr) return ''
        var table = ''
        try {
            table = gr.getTableName() || ''
        } catch (e) {
            return ''
        }
        var translator = this.refs
        if (!translator || !translator.childRequiredFields) return ''
        var missing = []
        var required = translator.childRequiredFields(table) || []
        var i
        for (i = 0; i < required.length; i++) {
            if (gr.isValidField(required[i]) && !gr.getValue(required[i])) missing.push(required[i])
        }
        var dangling = []
        var names = translator.childReferenceFieldNames(table) || []
        for (i = 0; i < names.length; i++) {
            var field = names[i]
            if (!gr.isValidField(field)) continue
            var raw = gr.getValue(field)
            if (!raw) continue
            var spec = translator.childReferenceSpec(table, field)
            var ref = spec && spec.reference
            if (ref && !this._rowExists(ref, raw)) dangling.push(field + ' not in ' + ref)
        }
        var mandatory = this._mandatoryGaps(gr)
        var parts = []
        if (missing.length) parts.push('empty ' + missing.join(', '))
        if (dangling.length) parts.push(dangling.join('; '))
        if (mandatory.length) parts.push('mandatory ' + mandatory.join(', '))
        return parts.join('; ')
    },

    _mandatoryGaps: function (gr) {
        var gaps = []
        try {
            var elements = gr.getElements()
            if (!elements) return gaps
            var n = elements.size ? elements.size() : elements.length || 0
            for (var i = 0; i < n; i++) {
                var el = elements.get ? elements.get(i) : elements[i]
                if (!el || !el.getED) continue
                var ed = el.getED()
                if (!ed || !ed.isMandatory || !ed.isMandatory()) continue
                var name = el.getName ? String(el.getName()) : ''
                if (!name || name.indexOf('sys_') === 0) continue
                var val = gr.getValue(name)
                if (val === undefined || val === null || String(val) === '') gaps.push(name)
                if (gaps.length >= 8) break
            }
        } catch (ignore) {}
        return gaps
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
