/**
 * BridgeRefTranslate — apply-side reference translation.
 *
 * user_name / group_name still resolve natural keys captured on the source.
 * xref / record_mapping / mapping / business_key remap a source sys_id through
 * Record Mapping (x_33764_sbridge_xref), then a business_key lookup when that
 * ref_map entry lists business_key and the payload carries ref_keys.
 *
 * Reference fields with no ref_map entry are remapped the same way when
 * reference handling is resolve (the movement-config default) and a mapping
 * exists. A miss leaves the source sys_id in place so Case 1 rows that have
 * no mapping stay as they were. identity and preserve never remap.
 * reference handling preserve skips that implicit path. Explicit xref still
 * nulls the field and reports it unresolved when both lookups miss.
 *
 * 0.4.4 adds the Path A child foreign keys (NIC, serial, storage, memory,
 * software install, filesystem, process, tcp, cmdb_rel_ci) and the standard
 * Computer references to that same xref-first path, including when element
 * metadata is missing. Capture stamps ref_keys; a miss on an implicit field
 * still keeps the source sys_id.
 */
var BRIDGE_CHILD_REFS = {
    cmdb_ci_network_adapter: {
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
    },
    cmdb_serial_number: {
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
    },
    cmdb_ci_disk: {
        computer: { reference: 'cmdb_ci_computer', business_key: 'name' },
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
    },
    cmdb_ci_disk_partition: {
        computer: { reference: 'cmdb_ci_computer', business_key: 'name' },
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
    },
    cmdb_ci_storage_device: {
        computer: { reference: 'cmdb_ci_computer', business_key: 'name' },
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
    },
    cmdb_ci_storage_volume: {
        computer: { reference: 'cmdb_ci_computer', business_key: 'name' },
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
    },
    cmdb_ci_memory_module: {
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
        computer: { reference: 'cmdb_ci_computer', business_key: 'name' },
    },
    cmdb_software_instance: {
        installed_on: { reference: 'cmdb_ci', business_key: 'name' },
        software: { reference: 'cmdb_software_product_model', business_key: 'name' },
    },
    cmdb_sam_sw_install: {
        installed_on: { reference: 'cmdb_ci', business_key: 'name' },
        software: { reference: 'cmdb_software_product_model', business_key: 'name' },
        software_model: { reference: 'cmdb_software_product_model', business_key: 'name' },
        discovery_model: { reference: 'cmdb_sam_sw_discovery_model', business_key: 'display_name' },
    },
    cmdb_ci_file_system: {
        computer: { reference: 'cmdb_ci_computer', business_key: 'name' },
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
    },
    cmdb_running_process: {
        computer: { reference: 'cmdb_ci_computer', business_key: 'name' },
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
    },
    cmdb_tcp: {
        computer: { reference: 'cmdb_ci_computer', business_key: 'name' },
        cmdb_ci: { reference: 'cmdb_ci', business_key: 'name' },
    },
    cmdb_rel_ci: {
        parent: { reference: 'cmdb_ci', business_key: 'name' },
        child: { reference: 'cmdb_ci', business_key: 'name' },
        type: { reference: 'cmdb_rel_type', business_key: 'name' },
    },
}

var BRIDGE_COMPUTER_REFS = {
    manufacturer: { reference: 'core_company', business_key: 'name' },
    company: { reference: 'core_company', business_key: 'name' },
    vendor: { reference: 'core_company', business_key: 'name' },
    model_id: { reference: 'cmdb_model', business_key: 'name' },
    location: { reference: 'cmn_location', business_key: 'name' },
    department: { reference: 'cmn_department', business_key: 'name' },
    cost_center: { reference: 'cmn_cost_center', business_key: 'name' },
    asset: { reference: 'alm_asset', business_key: 'asset_tag' },
}

var BRIDGE_COMPUTER_USER_FIELDS = {
    assigned_to: true,
    owned_by: true,
    managed_by: true,
    supported_by: true,
    most_frequent_user: true,
}

var BRIDGE_COMPUTER_GROUP_FIELDS = {
    support_group: true,
    assignment_group: true,
    managed_by_group: true,
}

var BridgeRefTranslate = Class.create()

BridgeRefTranslate.prototype = {
    initialize: function () {},

    /**
     * Build lookup maps once per batch.
     * @returns {{usersByName: Object, groupsByName: Object, peerId: string, xrefHits: Object, fieldKinds: Object}}
     */
    prepare: function (items, peerId) {
        return {
            usersByName: {},
            groupsByName: {},
            peerId: peerId || '',
            xrefHits: {},
            fieldKinds: {},
            handling: {},
            referenceHandling: 'resolve',
        }
    },

    /**
     * @returns {{values: Object, unresolved: Array}}
     */
    translate: function (item, refMap, maps) {
        var values = {}
        var unresolved = []
        var src = (item && item.values) || {}
        refMap = refMap || {}
        maps = maps || this.prepare(null, '')
        if (!maps.xrefHits) maps.xrefHits = {}
        if (!maps.fieldKinds) maps.fieldKinds = {}
        var tableName = (item && item.table) || ''
        var handling = maps.referenceHandling || 'resolve'

        for (var field in src) {
            if (!Object.prototype.hasOwnProperty.call(src, field)) continue
            var spec = refMap[field] || {}
            var strategy = spec.strategy || ''
            var implicitNatural = false
            var hinted = item && item.natural_keys ? item.natural_keys[field] : ''
            if (!strategy && (hinted === 'user_name' || hinted === 'group_name')) {
                strategy = hinted
                implicitNatural = true
            }

            if (strategy === 'identity' || strategy === 'preserve') {
                values[field] = src[field]
                continue
            }
            if (strategy === 'null_and_flag') {
                values[field] = ''
                continue
            }
            if (strategy === 'user_name') {
                var uname = src[field]
                if (!uname) {
                    values[field] = ''
                    continue
                }
                var uid = maps.usersByName[uname] || this._lookupUser(uname)
                if (uid) {
                    maps.usersByName[uname] = uid
                    values[field] = uid
                } else {
                    values[field] = ''
                    if (!implicitNatural) unresolved.push({ field: field, strategy: strategy, key: uname })
                }
                continue
            }
            if (strategy === 'group_name') {
                var gname = src[field]
                if (!gname) {
                    values[field] = ''
                    continue
                }
                var gid = maps.groupsByName[gname] || this._lookupGroup(gname)
                if (gid) {
                    maps.groupsByName[gname] = gid
                    values[field] = gid
                } else {
                    values[field] = ''
                    if (!implicitNatural) unresolved.push({ field: field, strategy: strategy, key: gname })
                }
                continue
            }
            if (this._isXrefStrategy(strategy)) {
                this._applyXref(values, unresolved, item, field, src[field], spec, maps, tableName, true)
                continue
            }
            if (!strategy || strategy === 'resolve') {
                if (handling === 'preserve') {
                    values[field] = src[field]
                    continue
                }
                if (handling === 'null_and_flag' && this._isRemappableReference(tableName, field, src[field], maps)) {
                    values[field] = ''
                    if (src[field]) {
                        unresolved.push({ field: field, strategy: 'null_and_flag', key: String(src[field]) })
                    }
                    continue
                }
                if (this._isRemappableReference(tableName, field, src[field], maps)) {
                    this._applyXref(values, unresolved, item, field, src[field], spec, maps, tableName, false)
                    continue
                }
                values[field] = src[field]
                continue
            }
            values[field] = src[field]
        }
        return { values: values, unresolved: unresolved }
    },

    /**
     * Path A child foreign key, walking the table's parents so a subclass still matches.
     * @returns {{reference: string, business_key: string}|null}
     */
    childReferenceSpec: function (tableName, field) {
        if (!tableName || !field) return null
        var chain = this._ancestry(tableName)
        for (var i = 0; i < chain.length; i++) {
            var tableSpecs = BRIDGE_CHILD_REFS[chain[i]]
            if (tableSpecs && tableSpecs[field]) return tableSpecs[field]
        }
        return null
    },

    /**
     * Standard Computer reference. Not used for user or group fields.
     * @returns {{reference: string, business_key: string}|null}
     */
    computerReferenceSpec: function (field) {
        if (!field || !BRIDGE_COMPUTER_REFS[field]) return null
        return BRIDGE_COMPUTER_REFS[field]
    },

    isComputerUserField: function (field) {
        return !!BRIDGE_COMPUTER_USER_FIELDS[field]
    },

    isComputerGroupField: function (field) {
        return !!BRIDGE_COMPUTER_GROUP_FIELDS[field]
    },

    _withStampedKey: function (spec, item, field) {
        spec = spec || {}
        if (this._businessKeyFields(spec).length) return spec
        var stamped = item && item.ref_keys ? item.ref_keys[field] : null
        if (!stamped || !stamped.keys) return spec
        var names = []
        for (var key in stamped.keys) {
            if (!Object.prototype.hasOwnProperty.call(stamped.keys, key)) continue
            names.push(key)
        }
        if (!names.length) return spec
        return {
            strategy: spec.strategy || 'xref',
            table: stamped.table || spec.table || spec.source_table || spec.reference || '',
            business_key: names.join(','),
        }
    },

    _isXrefStrategy: function (strategy) {
        return (
            strategy === 'xref' ||
            strategy === 'record_mapping' ||
            strategy === 'mapping' ||
            strategy === 'business_key'
        )
    },

    _isRemappableReference: function (tableName, field, raw, maps) {
        if (raw === undefined || raw === null || String(raw) === '') return false
        var kind = this._fieldKind(tableName, field, maps)
        if (kind.type !== 'reference' && kind.type !== 'glide_list') return false
        if (kind.reference === 'sys_user' || kind.reference === 'sys_user_group') return false
        return true
    },

    _applyXref: function (values, unresolved, item, field, raw, spec, maps, tableName, explicit) {
        spec = this._withStampedKey(spec, item, field)
        var kind = this._fieldKind(tableName, field, maps)
        if (kind.type === 'glide_list') {
            var parts = String(raw || '').split(',')
            var out = []
            var anyUnresolved = false
            for (var i = 0; i < parts.length; i++) {
                var piece = String(parts[i] || '').replace(/^\s+|\s+$/g, '')
                if (!piece) continue
                var one = this._remapSysId(piece, spec, maps, kind.reference, explicit, item, field)
                if (one.unresolved) anyUnresolved = true
                if (one.value) out.push(one.value)
            }
            values[field] = out.join(',')
            if (anyUnresolved) unresolved.push({ field: field, strategy: 'xref', key: String(raw || '') })
            return
        }
        var mapped = this._remapSysId(raw, spec, maps, kind.reference, explicit, item, field)
        values[field] = mapped.value
        if (mapped.unresolved) {
            unresolved.push({ field: field, strategy: spec.strategy || 'xref', key: String(raw || '') })
        }
    },

    _remapSysId: function (sourceId, spec, maps, fallbackTable, explicit, item, field) {
        var raw = sourceId === undefined || sourceId === null ? '' : String(sourceId)
        if (!raw) return { value: '', unresolved: false }
        var preferred = (spec && (spec.table || spec.source_table || spec.reference)) || fallbackTable || ''
        var target = this._lookupXref(maps.peerId || '', raw, preferred, maps)
        if (target) return { value: target, unresolved: false }
        var byKey = this._lookupBusinessKey(item, field, spec, preferred)
        if (byKey) return { value: byKey, unresolved: false }
        if (explicit) return { value: '', unresolved: true }
        return { value: raw, unresolved: false }
    },

    _lookupXref: function (peerId, sourceSysId, preferredTable, maps) {
        if (!peerId || !sourceSysId) return ''
        if (!maps.xrefHits) maps.xrefHits = {}
        var cacheKey = peerId + '|' + sourceSysId
        if (Object.prototype.hasOwnProperty.call(maps.xrefHits, cacheKey)) return maps.xrefHits[cacheKey] || ''

        var target = ''
        if (preferredTable) target = this._queryXref(peerId, sourceSysId, preferredTable)
        if (!target) target = this._queryXref(peerId, sourceSysId, '')
        maps.xrefHits[cacheKey] = target || ''
        return target || ''
    },

    _queryXref: function (peerId, sourceSysId, tableName) {
        var gr = new GlideRecord(BridgeConfig.TABLE.xref)
        gr.addQuery('peer', peerId)
        gr.addQuery('source_sys_id', sourceSysId)
        if (tableName) gr.addQuery('source_table', tableName)
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) return ''
        return gr.getValue('target_sys_id') || ''
    },

    _lookupBusinessKey: function (item, field, spec, fallbackTable) {
        var fields = this._businessKeyFields(spec)
        if (!fields.length) return ''
        var stamped = item && item.ref_keys && item.ref_keys[field]
        var keys = stamped && stamped.keys
        if (!keys) return ''
        var table = (stamped && stamped.table) || (spec && (spec.table || spec.source_table)) || fallbackTable
        if (!table) return ''
        var gr
        try {
            gr = new GlideRecord(table)
        } catch (e) {
            return ''
        }
        if (!gr.isValid()) return ''
        for (var i = 0; i < fields.length; i++) {
            var keyName = fields[i]
            if (!gr.isValidField(keyName)) return ''
            var keyValue = keys[keyName]
            if (keyValue === undefined || keyValue === null || String(keyValue) === '') return ''
            gr.addQuery(keyName, String(keyValue))
        }
        gr.setLimit(2)
        gr.query()
        if (!gr.next()) return ''
        var id = gr.getUniqueValue()
        if (gr.next()) return ''
        return id || ''
    },

    /** String, comma-separated string, or array. Keep aligned with BridgeCapture._businessKeyFields. */
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

    _fieldKind: function (tableName, field, maps) {
        if (!maps.fieldKinds) maps.fieldKinds = {}
        var key = (tableName || '') + '.' + field
        if (maps.fieldKinds[key]) return maps.fieldKinds[key]
        var kind = { type: '', reference: '' }
        if (tableName && field) {
            try {
                var gr = new GlideRecord(tableName)
                if (gr.isValid() && gr.isValidField(field)) {
                    var element = gr.getElement(field)
                    var ed = element && element.getED()
                    if (ed) {
                        kind.type = String(ed.getInternalType() || '')
                        if (kind.type === 'reference' || kind.type === 'glide_list') {
                            kind.reference = String(ed.getReference() || '')
                        }
                    }
                }
            } catch (e) {
                kind = { type: '', reference: '' }
            }
        }
        if (!kind.type || (kind.type !== 'reference' && kind.type !== 'glide_list')) {
            var known = this._knownReference(tableName, field)
            if (known) kind = { type: 'reference', reference: known }
        }
        maps.fieldKinds[key] = kind
        return kind
    },

    /**
     * Dictionary fallback when element metadata is missing or not a reference.
     * Case 2 alm_hardware.ci stays here. 0.4.4 adds Path A child FKs and Computer refs.
     */
    _knownReference: function (tableName, field) {
        if (field === 'ci' && (tableName === 'alm_hardware' || tableName === 'alm_asset')) return 'cmdb_ci'
        if (field === 'cat_item' && tableName === 'item_option_new') return 'sc_cat_item'
        var child = this.childReferenceSpec(tableName, field)
        if (child && child.reference) return child.reference
        if (this._isComputerTableName(tableName)) {
            var computer = this.computerReferenceSpec(field)
            if (computer && computer.reference) return computer.reference
        }
        return ''
    },

    _isComputerTableName: function (tableName) {
        if (!tableName) return false
        if (tableName === 'cmdb_ci_computer') return true
        var chain = this._ancestry(tableName)
        for (var i = 0; i < chain.length; i++) {
            if (chain[i] === 'cmdb_ci_computer') return true
        }
        return false
    },

    _ancestry: function (tableName) {
        if (!tableName) return []
        if (!this._ancestryCache) this._ancestryCache = {}
        if (this._ancestryCache[tableName]) return this._ancestryCache[tableName]
        var chain = [tableName]
        try {
            var walked = this._config().tableAncestry(tableName)
            if (walked && walked.length) chain = walked
        } catch (e) {
            chain = [tableName]
        }
        this._ancestryCache[tableName] = chain
        return chain
    },

    _config: function () {
        if (!this._cfg) this._cfg = new BridgeConfig()
        return this._cfg
    },

    _lookupUser: function (userName) {
        var gr = new GlideRecord('sys_user')
        gr.addQuery('user_name', userName)
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr.getUniqueValue() : ''
    },

    _lookupGroup: function (name) {
        var gr = new GlideRecord('sys_user_group')
        gr.addQuery('name', name)
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr.getUniqueValue() : ''
    },

    type: 'BridgeRefTranslate',
}
