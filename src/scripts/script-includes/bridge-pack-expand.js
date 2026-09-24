/**
 * BridgePackExpand — Path B related-pack expand.
 *
 * One Execute Now on a pack configuration resolves the pack root, walks
 * members in apply order, and enqueues one outbox under the controller DEX.
 * Drain sends that outbox by pack_seq, so parents land before children and
 * cmdb_rel_ci is last. Apply reuses Record Mapping for declared FK fields.
 *
 * Flow graph_kind values are stored on the member and skipped here.
 * This script does not start a Flow and does not read sys_hub_*.
 *
 * Path A BridgeSeed.seedPolicy is not used for a pack run.
 */
var BridgePackExpand = Class.create()

BridgePackExpand.FLOW_KINDS = {
    flow: true,
    flow_trigger: true,
    flow_variable: true,
    flow_logic: true,
    flow_action: true,
    flow_step: true,
    pill: true,
}

BridgePackExpand.ID_CAP = 2000

BridgePackExpand.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
        this.capture = new BridgeCapture()
    },

    /**
     * @param {GlideRecord|object} cfg movement configuration
     * @returns {boolean}
     */
    isPackConfig: function (cfg) {
        if (!cfg || !cfg.getValue || !cfg.isValidField || !cfg.isValidField('config_type')) return false
        return String(cfg.getValue('config_type') || '') === 'pack'
    },

    /**
     * Table name from a GlideRecord or a plain object (ATF).
     * @returns {string}
     */
    memberTableName: function (member) {
        if (!member) return ''
        if (member.getValue) return member.getValue('source_table') || ''
        return member.source_table || member.table || ''
    },

    /**
     * apply_order, then name. cmdb_rel_ci is moved to the end without
     * changing the relative order of the other members.
     * @param {Array} members
     * @returns {Array}
     */
    orderedMembers: function (members) {
        var normal = []
        var relationships = []
        var list = members || []
        for (var i = 0; i < list.length; i++) {
            if (this.memberTableName(list[i]) === 'cmdb_rel_ci') relationships.push(list[i])
            else normal.push(list[i])
        }
        var self = this
        var compare = function (a, b) {
            return self._compareMembers(a, b)
        }
        normal.sort(compare)
        relationships.sort(compare)
        var out = []
        for (var n = 0; n < normal.length; n++) out.push(normal[n])
        for (var r = 0; r < relationships.length; r++) out.push(relationships[r])
        return out
    },

    /**
     * @returns {{ok:boolean, reason:string, name:string, active:string, root_table:string, root_filter:string, tables:string[]}}
     */
    planByName: function (packName) {
        var pack = new GlideRecord('x_33764_sbridge_movement_pack')
        pack.addQuery('name', packName)
        pack.setLimit(1)
        pack.query()
        if (!pack.next()) return { ok: false, reason: 'pack not found', name: packName || '', tables: [] }
        return this.plan(pack.getUniqueValue())
    },

    /**
     * @returns {{ok:boolean, reason:string, name:string, active:string, root_table:string, root_filter:string, tables:string[], members:Array}}
     */
    plan: function (packId) {
        var empty = { ok: false, reason: '', name: '', active: 'no', root_table: '', root_filter: '', tables: [], members: [] }
        var pack = new GlideRecord('x_33764_sbridge_movement_pack')
        if (!packId || !pack.get(packId)) {
            empty.reason = 'pack not found'
            return empty
        }
        var members = this.orderedMembers(this._loadMembers(pack.getUniqueValue(), true))
        var tables = []
        var described = []
        for (var i = 0; i < members.length; i++) {
            var tableName = this.memberTableName(members[i])
            tables.push(tableName)
            described.push({
                table: tableName,
                name: members[i].getValue('name') || '',
                apply_order: parseInt(members[i].getValue('apply_order'), 10) || 0,
                expand_mode: members[i].getValue('expand_mode') || '',
                parent_field: members[i].getValue('parent_field') || '',
                fk_remap_fields: members[i].getValue('fk_remap_fields') || '',
                graph_kind: members[i].getValue('graph_kind') || 'record',
                active: members[i].getValue('active') === '1' ? 'yes' : 'no',
            })
        }
        return {
            ok: true,
            reason: '',
            name: pack.getValue('name') || '',
            active: pack.getValue('active') === '1' ? 'yes' : 'no',
            root_table: pack.getValue('root_table') || '',
            root_filter: pack.getValue('root_filter') || '',
            tables: tables,
            members: described,
        }
    },

    /**
     * Enqueue one page of the pack into the shared outbox / DEX.
     * @returns {object}
     */
    seedPack: function (cfg, opts) {
        return this._page(cfg, opts || {}, true)
    },

    /**
     * Dry-run page. Same cursor, no outbox rows.
     * @returns {object}
     */
    readPage: function (cfg, opts) {
        return this._page(cfg, opts || {}, false)
    },

    /**
     * Read-only sample for Preview Records.
     */
    previewSample: function (cfg, sampleLimit) {
        var loaded = this._loadPackRun(cfg, {})
        if (!loaded.ok) {
            return { ok: false, matched: 0, sample: [], order: '', message: loaded.reason }
        }
        var limit = parseInt(sampleLimit, 10)
        if (isNaN(limit) || limit < 1) limit = 50
        if (limit > 100) limit = 100
        var rootIds = this._rootIds(loaded.pack, loaded.rootFilter)
        var prior = []
        var matched = 0
        var sample = []
        for (var i = 0; i < loaded.members.length; i++) {
            var member = loaded.members[i]
            if (this._isFlowKind(member)) continue
            var ids = this._idsForMember(member, loaded, rootIds, prior)
            var count = this._countMember(member, loaded, ids)
            matched += count
            if (sample.length < limit) {
                var gr = this._queryMember(member, loaded, ids, '')
                if (gr) {
                    gr.setLimit(limit - sample.length)
                    gr.query()
                    while (gr.next() && sample.length < limit) {
                        sample.push({
                            source_sys_id: gr.getUniqueValue(),
                            table: gr.getTableName(),
                            name: this._rowName(gr),
                        })
                    }
                }
            }
            if (!this._isFlowKind(member)) prior = prior.concat(this._collectIds(member, loaded, ids))
        }
        return {
            ok: true,
            matched: matched,
            sample: sample,
            order: this._orderText(loaded.members),
            message: '',
        }
    },

    _page: function (cfg, opts, enqueue) {
        var summary = {
            enqueued: 0,
            scanned: 0,
            done: false,
            failed: false,
            run_id: opts.runId || '',
            cursor: '',
            reason: '',
            order: '',
            rows: [],
        }
        if (!this.config.isEnabled()) {
            summary.reason = 'disabled by ' + BridgeConfig.PROP.enabled
            summary.failed = true
            return summary
        }
        var loaded = this._loadPackRun(cfg, opts)
        if (!loaded.ok) {
            summary.reason = loaded.reason
            summary.failed = true
            return summary
        }
        summary.order = this._orderText(loaded.members)

        var executionId = opts.executionId || ''
        if (executionId && this._executionCancelled(executionId)) {
            summary.reason = 'execution cancelled'
            summary.done = true
            return summary
        }

        var batchSize = parseInt(opts.batchSize, 10)
        if (isNaN(batchSize) || batchSize < 1) batchSize = this.config.intProp(BridgeConfig.PROP.batchSize, 200)
        if (batchSize > 1000) batchSize = 1000

        var runGr = this._openRun(cfg, loaded, opts)
        if (!runGr) {
            summary.reason = 'could not open the pack seed run'
            summary.failed = true
            return summary
        }
        summary.run_id = runGr.getUniqueValue()
        if (executionId) this._stampRunOnExecution(executionId, summary.run_id)
        try {
            if (executionId) new BridgeDualWrite().attachControllerRun(executionId, summary.run_id)
            else if (enqueue) new BridgeDualWrite().onRunOpened(summary.run_id)
        } catch (e) {
            gs.warn('[bridge] pack dual-write open failed (ignored): ' + e)
        }

        var members = loaded.members
        var index = this._memberIndex(members, runGr.getValue('seed_member'))
        var cursor = runGr.getValue('seed_cursor') || ''
        var seedSeq = parseInt(runGr.getValue('seed_seq'), 10) || 0
        if (index < 0) {
            index = 0
            cursor = ''
            seedSeq = 0
        }

        var rootIds = this._rootIds(loaded.pack, loaded.rootFilter)

        while (summary.scanned < batchSize && index < members.length) {
            var member = members[index]
            if (this._isFlowKind(member)) {
                gs.info(
                    '[bridge] pack member ' +
                        (member.getValue('name') || member.getUniqueValue()) +
                        ' graph_kind=' +
                        (member.getValue('graph_kind') || '') +
                        ' skipped. Flow is not executed in 0.5.0.'
                )
                index++
                cursor = ''
                seedSeq = 0
                continue
            }
            var tableName = this.memberTableName(member)
            if (!tableName || !new GlideRecord(tableName).isValid()) {
                summary.reason = 'member table ' + (tableName || '(blank)') + ' is not valid'
                summary.failed = true
                break
            }
            // No roots means there is nothing to fan out. Encoded members such as
            // shared packages stay on the source until a root row matches.
            if (rootIds.length === 0 && (member.getValue('expand_mode') || '') !== 'root_filter') {
                index++
                cursor = ''
                seedSeq = 0
                continue
            }
            var priorCache = this._priorIds(members, index, loaded, rootIds)
            var ids = this._idsForMember(member, loaded, rootIds, priorCache, 0)

            var limit = batchSize - summary.scanned
            var gr = this._queryMember(member, loaded, ids, cursor)
            var pageCount = 0
            if (gr) {
                gr.setLimit(limit)
                gr.query()
                var position = index + 1
                while (gr.next()) {
                    pageCount++
                    summary.scanned++
                    cursor = gr.getUniqueValue()
                    seedSeq++
                    var packSeq = position * 1000000 + seedSeq
                    if (enqueue) {
                        if (this._enqueue(gr, cfg, loaded, member, summary.run_id, executionId, packSeq)) summary.enqueued++
                    } else {
                        summary.rows.push({
                            table: gr.getTableName(),
                            source_sys_id: gr.getUniqueValue(),
                            name: this._rowName(gr),
                        })
                    }
                }
            }
            if (pageCount < limit) {
                index++
                cursor = ''
                seedSeq = 0
            } else {
                break
            }
        }

        var done = !summary.failed && index >= members.length
        summary.done = done
        summary.cursor = cursor
        var currentMember = ''
        if (!done && index >= 0 && index < members.length) currentMember = members[index].getUniqueValue()
        if (runGr.get(summary.run_id)) {
            runGr.setValue('seed_cursor', done ? '' : cursor)
            if (runGr.isValidField('seed_member')) runGr.setValue('seed_member', done ? '' : currentMember)
            if (runGr.isValidField('seed_seq')) runGr.setValue('seed_seq', done ? 0 : seedSeq)
            var processed = parseInt(runGr.getValue('processed'), 10) || 0
            runGr.setValue('processed', processed + (enqueue ? summary.enqueued : summary.scanned))
            if (done) runGr.setValue('ended', new GlideDateTime().getValue())
            runGr.update()
        }
        if (enqueue) {
            try {
                new BridgeDualWrite().onSeedPage(summary.run_id, summary)
            } catch (e2) {
                gs.warn('[bridge] pack dual-write page failed (ignored): ' + e2)
            }
        }
        return summary
    },

    _loadPackRun: function (cfg, opts) {
        var out = { ok: false, reason: '', pack: null, members: [], peerId: '', rootFilter: '' }
        if (!cfg || !cfg.getValue) {
            out.reason = 'configuration not found'
            return out
        }
        if (!this.isPackConfig(cfg)) {
            out.reason = 'configuration is not a pack'
            return out
        }
        var packId = cfg.getValue('pack') || ''
        var pack = new GlideRecord('x_33764_sbridge_movement_pack')
        if (!packId || !pack.get(packId)) {
            out.reason = 'movement pack was not found'
            return out
        }
        if (pack.getValue('active') !== '1') {
            out.reason = 'movement pack is inactive'
            return out
        }
        var rootTable = pack.getValue('root_table') || ''
        if (!rootTable || !new GlideRecord(rootTable).isValid()) {
            out.reason = 'pack root table ' + (rootTable || '(blank)') + ' is not valid'
            return out
        }
        var members = this.orderedMembers(this._loadMembers(pack.getUniqueValue(), true))
        if (!members.length) {
            out.reason = 'movement pack has no active members'
            return out
        }
        var peerId = cfg.getValue('target_instance') || ''
        if (!peerId) {
            out.reason = 'configuration has no target instance'
            return out
        }
        var localPeer = this.config.localPeerId()
        if (!localPeer) {
            out.reason = 'local peer not configured'
            return out
        }
        var sourceInstance = cfg.getValue('source_instance') || ''
        if (sourceInstance && sourceInstance !== localPeer) {
            out.reason = 'this instance is not the configuration source instance'
            return out
        }
        if (peerId === localPeer) {
            out.reason = 'target instance is the local instance'
            return out
        }
        out.ok = true
        out.pack = pack
        out.members = members
        out.peerId = peerId
        out.rootFilter = pack.getValue('root_filter') || ''
        out.localPeer = localPeer
        out.opts = opts || {}
        return out
    },

    _loadMembers: function (packId, activeOnly) {
        var rows = []
        var gr = new GlideRecord('x_33764_sbridge_pack_member')
        gr.addQuery('pack', packId)
        if (activeOnly) gr.addQuery('active', true)
        gr.orderBy('apply_order')
        gr.orderBy('name')
        gr.query()
        while (gr.next()) {
            var copy = new GlideRecord('x_33764_sbridge_pack_member')
            if (copy.get(gr.getUniqueValue())) rows.push(copy)
        }
        return rows
    },

    _openRun: function (cfg, loaded, opts) {
        var runGr = new GlideRecord(BridgeConfig.TABLE.run)
        var runId = opts.runId || ''
        if (runId && runGr.get(runId)) return runGr
        runGr.initialize()
        runGr.setValue('type', 'bulk_seed')
        runGr.setValue('peer', loaded.peerId)
        runGr.setValue('started', new GlideDateTime().getValue())
        runGr.setValue('processed', 0)
        runGr.setValue('failed', 0)
        if (cfg.getValue('policy') && runGr.isValidField('seed_policy')) runGr.setValue('seed_policy', cfg.getValue('policy'))
        if (runGr.isValidField('seed_seq')) runGr.setValue('seed_seq', 0)
        var id = runGr.insert()
        if (!id || !runGr.get(id)) return null
        return runGr
    },

    _memberIndex: function (members, memberId) {
        if (!memberId) return 0
        for (var i = 0; i < members.length; i++) {
            if (members[i].getUniqueValue() === memberId) return i
        }
        return -1
    },

    _rootIds: function (pack, rootFilter) {
        var tableName = pack.getValue('root_table') || ''
        var gr = new GlideRecord(tableName)
        if (!gr.isValid()) return []
        if (rootFilter) gr.addEncodedQuery(rootFilter)
        gr.orderBy('sys_id')
        gr.setLimit(BridgePackExpand.ID_CAP)
        gr.query()
        var ids = []
        while (gr.next()) ids.push(gr.getUniqueValue())
        return this._cleanIds(ids)
    },

    _priorIds: function (members, index, loaded, rootIds) {
        var ids = []
        for (var i = 0; i < index; i++) {
            var member = members[i]
            if (this._isFlowKind(member)) continue
            var scopeIds = this._idsForMember(member, loaded, rootIds, ids)
            ids = ids.concat(this._collectIds(member, loaded, scopeIds))
            if (ids.length >= BridgePackExpand.ID_CAP) break
        }
        return this._cleanIds(ids)
    },

    _collectIds: function (member, loaded, ids) {
        var gr = this._queryMember(member, loaded, ids, '')
        if (!gr) return []
        gr.setLimit(BridgePackExpand.ID_CAP)
        gr.query()
        var out = []
        while (gr.next()) out.push(gr.getUniqueValue())
        return out
    },

    _idsForMember: function (member, loaded, rootIds, priorIds, depth) {
        if (!depth) depth = 0
        if (depth > 6) return []
        var parentMemberId = member.getValue('parent_member') || ''
        if (parentMemberId && parentMemberId !== member.getUniqueValue()) {
            var parent = new GlideRecord('x_33764_sbridge_pack_member')
            if (parent.get(parentMemberId)) {
                var parentIds = this._idsForMember(parent, loaded, rootIds, priorIds, depth + 1)
                return this._collectIds(parent, loaded, parentIds)
            }
        }
        var scope = member.getValue('id_scope') || 'roots'
        if (scope === 'none') return []
        if (scope === 'prior_records') return this._cleanIds(priorIds || [])
        if (scope === 'roots_and_prior') return this._cleanIds((rootIds || []).concat(priorIds || []))
        return this._cleanIds(rootIds || [])
    },

    _needsIds: function (member) {
        var mode = member.getValue('expand_mode') || ''
        return mode === 'parent_in' || mode === 'any_reference_in'
    },

    _queryMember: function (member, loaded, ids, cursor) {
        var tableName = this.memberTableName(member)
        var gr = new GlideRecord(tableName)
        if (!gr.isValid()) return null
        var mode = member.getValue('expand_mode') || 'parent_in'
        if (mode === 'root_filter') {
            if (loaded.rootFilter) gr.addEncodedQuery(loaded.rootFilter)
        } else if (mode === 'encoded_query') {
            var query = member.getValue('expand_query') || ''
            if (query) gr.addEncodedQuery(query)
        } else {
            var fields = this._split(member.getValue('parent_field'))
            var clean = this._cleanIds(ids || [])
            if (!fields.length || !clean.length) return null
            this._addIdQuery(gr, fields, clean)
        }
        if (cursor) gr.addQuery('sys_id', '>', cursor)
        gr.orderBy('sys_id')
        return gr
    },

    _countMember: function (member, loaded, ids) {
        var tableName = this.memberTableName(member)
        if (!tableName) return 0
        var ga = new GlideAggregate(tableName)
        if (!ga.isValid()) return 0
        var mode = member.getValue('expand_mode') || 'parent_in'
        if (mode === 'root_filter') {
            if (loaded.rootFilter) ga.addEncodedQuery(loaded.rootFilter)
        } else if (mode === 'encoded_query') {
            var query = member.getValue('expand_query') || ''
            if (query) ga.addEncodedQuery(query)
        } else {
            var fields = this._split(member.getValue('parent_field'))
            var clean = this._cleanIds(ids || [])
            if (!fields.length || !clean.length) return 0
            this._addIdQuery(ga, fields, clean)
        }
        ga.addAggregate('COUNT')
        ga.query()
        if (!ga.next()) return 0
        return parseInt(ga.getAggregate('COUNT'), 10) || 0
    },

    _addIdQuery: function (gr, fields, ids) {
        var chunks = []
        var i
        for (i = 0; i < ids.length; i += 100) chunks.push(ids.slice(i, i + 100).join(','))
        var qc = null
        for (var f = 0; f < fields.length; f++) {
            for (var c = 0; c < chunks.length; c++) {
                if (!qc) qc = gr.addQuery(fields[f], 'IN', chunks[c])
                else qc.addOrCondition(fields[f], 'IN', chunks[c])
            }
        }
    },

    _enqueue: function (current, cfg, loaded, member, runId, executionId, packSeq) {
        var policy = this._syntheticPolicy(cfg, loaded, member)
        var fk = this._fkMap(member)
        var extra = {
            pack_seq: packSeq,
            pack: loaded.pack.getUniqueValue(),
            pack_member: member.getUniqueValue(),
            pack_order: parseInt(member.getValue('apply_order'), 10) || 0,
            pack_fk: fk,
        }
        return new BridgeSeed()._enqueueSeed(
            current,
            policy,
            loaded.localPeer,
            this.memberTableName(member),
            runId,
            executionId,
            extra
        )
    },

    _syntheticPolicy: function (cfg, loaded, member) {
        var mode = cfg.getValue('apply_mode') || 'direct'
        if (mode !== 'cmdb') mode = 'direct'
        var match = member.getValue('match_strategy') || 'mapping'
        return {
            sys_id: cfg.getValue('policy') || loaded.pack.getUniqueValue(),
            peer: loaded.peerId,
            table: this.memberTableName(member),
            direction: 'outbound',
            mode: mode,
            field_list: member.getValue('field_list') || '',
            condition: '',
            ref_map: JSON.stringify(this._captureRefMap(member)),
            target_map: '',
            target_table: this.memberTableName(member),
            owner_peer: cfg.getValue('source_instance') || loaded.localPeer || '',
            propagate_deletes: cfg.getValue('propagate_deletes') === '1',
            preserve_sys_id: match === 'sys_id' || cfg.getValue('preserve_sys_id') === '1',
        }
    },

    /**
     * Capture stamps ref_keys. strategy xref is capture-only.
     * Apply reads payload.pack_fk and keeps the implicit Record Mapping path
     * so a miss does not blank installed_on before the software-instance seal.
     */
    _captureRefMap: function (member) {
        var map = {}
        var fk = this._fkMap(member)
        for (var field in fk) {
            if (!Object.prototype.hasOwnProperty.call(fk, field)) continue
            map[field] = {
                strategy: 'xref',
                table: fk[field].table || fk[field].reference || '',
                business_key: fk[field].business_key || 'name',
            }
        }
        return map
    },

    _fkMap: function (member) {
        var map = {}
        var tableName = this.memberTableName(member)
        var names = this._split(member.getValue('fk_remap_fields'))
        var refs = new BridgeRefTranslate()
        for (var i = 0; i < names.length; i++) {
            var field = names[i]
            if (refs.isComputerUserField(field) || refs.isComputerGroupField(field)) continue
            var spec = refs.childReferenceSpec(tableName, field) || {}
            map[field] = {
                reference: spec.reference || '',
                table: spec.reference || spec.table || '',
                business_key: spec.business_key || 'name',
            }
        }
        return map
    },

    _orderText: function (members) {
        var names = []
        for (var i = 0; i < members.length; i++) names.push(this.memberTableName(members[i]))
        return names.join(',')
    },

    _isFlowKind: function (member) {
        var kind = ''
        if (member && member.getValue) kind = member.getValue('graph_kind') || 'record'
        else if (member) kind = member.graph_kind || 'record'
        return !!BridgePackExpand.FLOW_KINDS[kind]
    },

    _compareMembers: function (a, b) {
        var ak = this._sortKey(a)
        var bk = this._sortKey(b)
        if (ak.order !== bk.order) return ak.order - bk.order
        if (ak.name < bk.name) return -1
        if (ak.name > bk.name) return 1
        if (ak.id < bk.id) return -1
        if (ak.id > bk.id) return 1
        return 0
    },

    _sortKey: function (member) {
        if (member && member.getValue) {
            var order = parseInt(member.getValue('apply_order'), 10)
            return {
                order: isNaN(order) ? 0 : order,
                name: member.getValue('name') || '',
                id: member.getUniqueValue() || '',
            }
        }
        var plain = parseInt(member && member.apply_order, 10)
        return {
            order: isNaN(plain) ? 0 : plain,
            name: (member && member.name) || '',
            id: (member && (member.sys_id || member.id)) || '',
        }
    },

    _split: function (raw) {
        var parts = String(raw || '').split(',')
        var out = []
        var seen = {}
        for (var i = 0; i < parts.length; i++) {
            var name = String(parts[i] || '').replace(/^\s+|\s+$/g, '')
            if (!name || seen[name]) continue
            seen[name] = true
            out.push(name)
        }
        return out
    },

    _cleanIds: function (ids) {
        var out = []
        var seen = {}
        var list = ids || []
        for (var i = 0; i < list.length; i++) {
            var id = String(list[i] || '').toLowerCase()
            if (!/^[0-9a-f]{32}$/.test(id)) continue
            if (seen[id]) continue
            seen[id] = true
            out.push(id)
            if (out.length >= BridgePackExpand.ID_CAP) break
        }
        return out
    },

    _rowName: function (gr) {
        if (gr.isValidField('name') && gr.getValue('name')) return String(gr.getValue('name')).substr(0, 140)
        if (gr.isValidField('number') && gr.getValue('number')) return String(gr.getValue('number')).substr(0, 140)
        return gr.getUniqueValue()
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

    type: 'BridgePackExpand',
}
