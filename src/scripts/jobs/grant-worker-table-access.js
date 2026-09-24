/**
 * Runs after application files load (sys_script_fix.before = false).
 *
 * Install-time setup for metadata apply:
 *
 * 1. Direct x_33764_sbridge.worker on the integration user. Operator
 *    contains that role, but inherited sys_user_has_role rows are not
 *    always rebuilt before the next REST call. The ACLs also list
 *    operator so an existing operator still matches. This script logs
 *    whether worker and operator are actually on the user. It does not
 *    grant operator, and it never grants admin.
 *
 * 2. Can read / Can create / Can update on the global tables apply
 *    writes. A cross-scope privilege cannot exceed those flags.
 *
 * 3. global.SyncBridgeMetadataWrite. Fluent cannot declare apiName
 *    global.* (the SDK requires x_33764_sbridge.*), and a scoped
 *    GlideRecord insert is stamped with this application's scope, so
 *    the 0.4.3 payload never created a global script include. This
 *    script publishes one: loadXML into global, or insert then move
 *    the row to global, with Accessible from = All application scopes
 *    and Caller Access = Caller Tracking. Apply calls
 *    new global.SyncBridgeMetadataWrite().
 */
;(function grantWorkerTableAccess() {
    var TABLES = ['sys_script', 'sc_cat_item', 'item_option_new', 'sys_user_group']
    var ROLE = 'x_33764_sbridge.worker'
    var WRITER = 'SyncBridgeMetadataWrite'
    var WRITER_ID = 'e7c4b2a19f6d4e0a8b3c5d7e1f9a0b2c'

    try {
        grantWorkerRole(ROLE)
    } catch (e) {
        gs.error('[bridge] could not grant ' + ROLE + ': ' + e)
    }

    try {
        reportIntegrationRoles()
    } catch (e) {
        gs.error('[bridge] could not read integration user roles: ' + e)
    }

    try {
        installMetadataWriter()
    } catch (e) {
        gs.error('[bridge] could not install ' + WRITER + ': ' + e)
    }

    for (var i = 0; i < TABLES.length; i++) {
        try {
            openTable(TABLES[i])
        } catch (e) {
            gs.error('[bridge] application access for ' + TABLES[i] + ' threw: ' + e)
        }
    }

    function grantWorkerRole(roleName) {
        var userName = (gs.getProperty('x_33764_sbridge.integration_user', 'sbridge.worker') || 'sbridge.worker').trim()
        if (!userName) {
            gs.warn('[bridge] integration_user is blank; worker role was not assigned')
            return
        }

        var user = new GlideRecord('sys_user')
        user.addQuery('user_name', userName)
        user.setLimit(1)
        user.query()
        if (!user.next()) {
            gs.warn('[bridge] no sys_user named ' + userName + '; assign ' + roleName + ' when that account is created')
            return
        }

        var role = new GlideRecord('sys_user_role')
        role.addQuery('name', roleName)
        role.setLimit(1)
        role.query()
        if (!role.next()) {
            gs.warn('[bridge] role ' + roleName + ' is not installed yet')
            return
        }

        var has = new GlideRecord('sys_user_has_role')
        has.addQuery('user', user.getUniqueValue())
        has.addQuery('role', role.getUniqueValue())
        has.setLimit(1)
        has.query()
        if (has.next()) {
            gs.info('[bridge] ' + userName + ' already has ' + roleName)
            return
        }

        has.initialize()
        has.setValue('user', user.getUniqueValue())
        has.setValue('role', role.getUniqueValue())
        if (has.isValidField('inherited')) has.setValue('inherited', false)
        if (has.isValidField('state')) has.setValue('state', 'active')
        var id = has.insert()
        gs.info(
            '[bridge] granted ' +
                roleName +
                ' to ' +
                userName +
                ' -> ' +
                id +
                (id ? '' : ' ' + lastError(has))
        )
    }

    function openTable(tableName) {
        var gr = new GlideRecord('sys_db_object')
        gr.addQuery('name', tableName)
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) {
            gs.warn('[bridge] no sys_db_object named ' + tableName)
            return
        }

        if (alreadyOpen(gr)) {
            gs.info('[bridge] ' + tableName + ' already allows cross-scope read/create/update')
            return
        }

        var previous = ''
        try {
            previous = gs.getCurrentApplicationId() + ''
        } catch (ignore) {
            previous = ''
        }

        var globalScope = globalScopeId()
        var switched = false
        try {
            writeAccess(gr)
            var updated = gr.update()
            if (!isOpen(tableName) && globalScope && globalScope !== previous) {
                try {
                    gs.setCurrentApplicationId(globalScope)
                    switched = true
                } catch (scopeErr) {
                    gs.warn('[bridge] setCurrentApplicationId(global) refused: ' + scopeErr)
                }
                if (switched) {
                    gr = new GlideRecord('sys_db_object')
                    gr.addQuery('name', tableName)
                    gr.setLimit(1)
                    gr.query()
                    if (gr.next()) {
                        writeAccess(gr)
                        updated = gr.update()
                    }
                }
            }
            var saved = readTable(tableName)
            var open = saved && alreadyOpen(saved)
            gs.info(
                '[bridge] ' +
                    tableName +
                    ' application access update=' +
                    updated +
                    ' read=' +
                    (saved ? saved.getValue('read_access') : '') +
                    ' create=' +
                    (saved ? saved.getValue('create_access') : '') +
                    ' update=' +
                    (saved ? saved.getValue('update_access') : '') +
                    ' access=' +
                    (saved ? saved.getValue('access') : '') +
                    (updated ? '' : ' ' + lastError(gr))
            )
            if (!open) {
                gs.warn(
                    '[bridge] ' +
                        tableName +
                        ' Can read/create/update was not saved. In the Global application, open the table and check Can read, Can create, and Can update. A cross-scope privilege cannot raise that ceiling.'
                )
            }
        } finally {
            if (switched && previous) {
                try {
                    gs.setCurrentApplicationId(previous)
                } catch (restoreErr) {
                    gs.warn('[bridge] could not restore application id: ' + restoreErr)
                }
            }
        }
    }

    function writeAccess(gr) {
        if (gr.getValue('access') !== 'public') gr.setValue('access', 'public')
        gr.setValue('read_access', true)
        gr.setValue('create_access', true)
        gr.setValue('update_access', true)
    }

    function isOpen(tableName) {
        var row = readTable(tableName)
        return !!(row && alreadyOpen(row))
    }

    function readTable(tableName) {
        var check = new GlideRecord('sys_db_object')
        check.addQuery('name', tableName)
        check.setLimit(1)
        check.query()
        return check.next() ? check : null
    }

    function alreadyOpen(gr) {
        return (
            gr.getValue('access') === 'public' &&
            truthy(gr.getValue('read_access')) &&
            truthy(gr.getValue('create_access')) &&
            truthy(gr.getValue('update_access'))
        )
    }

    function truthy(value) {
        return value === true || value === 'true' || value === '1'
    }

    function reportIntegrationRoles() {
        var userName = (gs.getProperty('x_33764_sbridge.integration_user', 'sbridge.worker') || 'sbridge.worker').trim()
        if (!userName) {
            gs.warn('[bridge] integration_user is blank; role check skipped')
            return
        }
        var user = new GlideRecord('sys_user')
        user.addQuery('user_name', userName)
        user.setLimit(1)
        user.query()
        if (!user.next()) {
            gs.warn('[bridge] no sys_user named ' + userName + '; worker and operator are not assigned')
            return
        }
        var names = ['x_33764_sbridge.worker', 'x_33764_sbridge.operator', 'admin']
        var found = {}
        var roleIds = {}
        for (var i = 0; i < names.length; i++) found[names[i]] = false
        var role = new GlideRecord('sys_user_role')
        role.addQuery('name', 'IN', names.join(','))
        role.query()
        while (role.next()) roleIds[role.getUniqueValue()] = role.getValue('name')
        var has = new GlideRecord('sys_user_has_role')
        has.addQuery('user', user.getUniqueValue())
        has.addEncodedQuery('state=active^ORstateISEMPTY')
        has.query()
        while (has.next()) {
            var roleName = roleIds[has.getValue('role')]
            if (roleName) found[roleName] = true
        }
        gs.info(
            '[bridge] ' +
                userName +
                ' roles worker=' +
                found['x_33764_sbridge.worker'] +
                ' operator=' +
                found['x_33764_sbridge.operator'] +
                ' admin=' +
                found.admin +
                ' (admin is not granted)'
        )
        if (!found['x_33764_sbridge.operator']) {
            gs.warn('[bridge] ' + userName + ' does not have x_33764_sbridge.operator. Apply ACLs also list worker. Operator is the UI role and was not granted.')
        }
    }

    function installMetadataWriter() {
        var script = metadataWriterScript()
        if (verifyWriter(true)) {
            stampWriter(writerId(true), script)
            verifyWriter(false)
            return
        }

        try {
            loadWriterXml(script)
        } catch (e) {
            gs.warn('[bridge] metadata writer loadXML refused: ' + e)
        }
        if (verifyWriter()) {
            deleteAppCopies()
            return
        }

        var id = writerId(false)
        if (!id) id = insertWriter(script)
        if (id) publishGlobal(id, script)
        if (verifyWriter()) deleteAppCopies()
    }

    function writerId(globalOnly) {
        var gr = new GlideRecord('sys_script_include')
        gr.addQuery('name', WRITER)
        if (globalOnly) gr.addQuery('sys_scope', 'global')
        gr.query()
        var other = ''
        while (gr.next()) {
            if ((gr.getValue('sys_scope') || '') === 'global') return gr.getUniqueValue()
            if (!other) other = gr.getUniqueValue()
        }
        return globalOnly ? '' : other
    }

    function insertWriter(script) {
        var gr = new GlideRecord('sys_script_include')
        gr.initialize()
        fillWriter(gr, script, false)
        var id = gr.insert()
        if (!id) {
            gs.error('[bridge] metadata writer insert failed ' + lastError(gr))
            return ''
        }
        gs.info('[bridge] metadata writer inserted ' + id + ' scope=' + gr.getValue('sys_scope'))
        return id
    }

    function publishGlobal(id, script) {
        var gr = new GlideRecord('sys_script_include')
        if (!gr.get(id)) return
        if ((gr.getValue('sys_scope') || '') === 'global') {
            stampWriter(id, script)
            return
        }

        var previous = ''
        var switched = false
        try {
            previous = gs.getCurrentApplicationId() + ''
        } catch (ignore) {
            previous = ''
        }
        try {
            gs.setCurrentApplicationId('global')
            switched = true
        } catch (scopeErr) {
            gs.warn('[bridge] setCurrentApplicationId(global) refused: ' + scopeErr)
        }
        try {
            try {
                var response = sn_gfiles.GlobalApp.moveMetadata(id, 'global')
                var ok = response && response.success && response.success()
                var message = response && response.getErrorMessage ? response.getErrorMessage() : ''
                gs.info('[bridge] moveMetadata to global success=' + ok + (message ? ' ' + message : ''))
            } catch (moveErr) {
                gs.warn('[bridge] GlobalApp.moveMetadata refused: ' + moveErr)
            }
            stampWriter(id, script)
        } finally {
            if (switched && previous) {
                try {
                    gs.setCurrentApplicationId(previous)
                } catch (restoreErr) {
                    gs.warn('[bridge] could not restore application after metadata writer: ' + restoreErr)
                }
            }
        }
    }

    function stampWriter(id, script) {
        if (!id) return
        var gr = new GlideRecord('sys_script_include')
        if (!gr.get(id)) return
        gr.setWorkflow(false)
        fillWriter(gr, script, true)
        var updated = gr.update()
        var saved = new GlideRecord('sys_script_include')
        saved.get(id)
        gs.info(
            '[bridge] metadata writer stamp update=' +
                updated +
                ' scope=' +
                (saved.getValue('sys_scope') || '') +
                ' api=' +
                (saved.getValue('api_name') || '') +
                ' access=' +
                (saved.getValue('access') || '') +
                ' caller_access=' +
                (saved.getValue('caller_access') || 'none') +
                (updated ? '' : ' ' + lastError(gr))
        )
    }

    function fillWriter(gr, script, forceGlobal) {
        gr.setValue('name', WRITER)
        gr.setValue('script', script)
        gr.setValue('active', true)
        gr.setValue('access', 'public')
        if (gr.isValidField('client_callable')) gr.setValue('client_callable', false)
        if (gr.isValidField('caller_access')) gr.setValue('caller_access', '1')
        gr.setValue(
            'description',
            'Sync Bridge apply fallback for sys_script, sc_cat_item, item_option_new, and sys_user_group. Runs as the integration user. Does not grant admin.'
        )
        if (forceGlobal || (gr.getValue('sys_scope') || '') === 'global') {
            if (gr.isValidField('sys_scope')) gr.setValue('sys_scope', 'global')
            if (gr.isValidField('sys_package')) gr.setValue('sys_package', 'global')
            if (gr.isValidField('api_name')) gr.setValue('api_name', 'global.' + WRITER)
        }
    }

    function loadWriterXml(script) {
        var xml = [
            '<?xml version="1.0"?>',
            '<record_update table="sys_script_include">',
            '<sys_script_include action="INSERT_OR_UPDATE">',
            '<sys_id>' + WRITER_ID + '</sys_id>',
            '<sys_scope display_value="global">global</sys_scope>',
            '<sys_package display_value="Global">global</sys_package>',
            '<sys_class_name>sys_script_include</sys_class_name>',
            '<sys_update_name>sys_script_include_' + WRITER_ID + '</sys_update_name>',
            '<access>public</access>',
            '<active>true</active>',
            '<api_name>global.' + WRITER + '</api_name>',
            '<caller_access>1</caller_access>',
            '<client_callable>false</client_callable>',
            '<name>' + WRITER + '</name>',
            '<description>Sync Bridge apply fallback. Runs as the integration user. Does not grant admin.</description>',
            '<script><![CDATA[' + script + ']]></script>',
            '</sys_script_include>',
            '</record_update>',
        ].join('')
        var um
        try {
            um = new GlideUpdateManager2()
        } catch (first) {
            um = new global.GlideUpdateManager2()
        }
        var result = um.loadXML(xml)
        gs.info('[bridge] metadata writer loadXML result=' + result)
    }

    function verifyWriter(quiet) {
        var gr = new GlideRecord('sys_script_include')
        gr.addQuery('name', WRITER)
        gr.addQuery('sys_scope', 'global')
        gr.addQuery('api_name', 'global.' + WRITER)
        gr.addQuery('access', 'public')
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) {
            if (!quiet) {
                gs.error(
                    '[bridge] SyncBridgeMetadataWrite is not in global with api_name global.' +
                        WRITER +
                        ' and access public'
                )
            }
            return false
        }
        try {
            var writer = new global.SyncBridgeMetadataWrite()
            if (!writer || typeof writer.write !== 'function') {
                gs.error('[bridge] global.SyncBridgeMetadataWrite has no write()')
                return false
            }
        } catch (e) {
            gs.error('[bridge] global.SyncBridgeMetadataWrite is not callable: ' + e)
            return false
        }
        gs.info(
            '[bridge] metadata writer callable as global.SyncBridgeMetadataWrite scope=global api_name=' +
                gr.getValue('api_name') +
                ' access=public caller_access=' +
                (gr.getValue('caller_access') || 'none')
        )
        return true
    }

    function deleteAppCopies() {
        var gr = new GlideRecord('sys_script_include')
        gr.addQuery('name', WRITER)
        gr.addQuery('sys_scope', '!=', 'global')
        gr.query()
        while (gr.next()) {
            var id = gr.getUniqueValue()
            var scope = gr.getValue('sys_scope') || ''
            if (gr.deleteRecord()) gs.info('[bridge] removed non-global metadata writer ' + id + ' scope=' + scope)
            else gs.warn('[bridge] could not remove non-global metadata writer ' + id + ' scope=' + scope)
        }
    }

    function metadataWriterScript() {
        return [
            'var SyncBridgeMetadataWrite = Class.create();',
            'SyncBridgeMetadataWrite.prototype = {',
            '    initialize: function () {},',
            '    write: function (op, table, sysId, valuesJson, token) {',
            '        var allowed = { sys_script: true, sc_cat_item: true, item_option_new: true, sys_user_group: true };',
            "        if (op !== 'insert' && op !== 'update') return { error: 'operation not allowed' };",
            "        if (!allowed[table]) return { error: 'table not in metadata write list' };",
            "        if (!this._tokenOk(token)) return { error: 'metadata write is only available to apply' };",
            "        if (!this._callerOk()) return { error: 'metadata write refused for this user' };",
            '        var values = {};',
            '        try { values = valuesJson ? JSON.parse(valuesJson) : {}; } catch (parseErr) { return { error: "metadata values were not valid JSON" }; }',
            "        if (!values || typeof values !== 'object') return { error: 'metadata values were empty' };",
            '        var gr = new GlideRecord(table);',
            "        if (!gr.isValid()) return { error: 'invalid table ' + table };",
            "        if (op === 'update') {",
            "            if (!sysId || !gr.get(sysId)) return { error: 'update target missing' };",
            '        } else {',
            '            gr.initialize();',
            '            if (sysId) gr.setNewGuidValue(sysId);',
            '        }',
            '        this._setValues(gr, values);',
            "        var id = op === 'update' ? gr.update() : gr.insert();",
            '        if (!id) {',
            "            var detail = '';",
            "            try { detail = gr.getLastErrorMessage() || ''; } catch (ignore) { detail = ''; }",
            "            return { error: 'global ' + op + ' into ' + table + ' returned no sys_id' + (detail ? ': ' + detail : '') };",
            '        }',
            "        gs.info('[bridge] metadata writer ' + op + ' ' + table + ' ' + id + ' user=' + gs.getUserName());",
            "        return { sys_id: id + '' };",
            '    },',
            '    _tokenOk: function (token) {',
            "        var expected = '';",
            "        try { expected = gs.getSession().getClientData('x_33764_sbridge.meta_write') || ''; } catch (e) { expected = ''; }",
            '        if (!expected) {',
            "            try { expected = gs.getSession().getProperty('x_33764_sbridge.meta_write') || ''; } catch (e2) { expected = ''; }",
            '        }',
            '        return !!(token && expected && String(token) === String(expected));',
            '    },',
            '    _callerOk: function () {',
            "        var expected = 'sbridge.worker';",
            "        try { expected = (gs.getProperty('x_33764_sbridge.integration_user', 'sbridge.worker') || 'sbridge.worker').trim(); } catch (e) {}",
            "        var name = '';",
            "        try { name = (gs.getUserName() || '').trim(); } catch (e2) { name = ''; }",
            '        if (expected && name === expected) return true;',
            '        try {',
            "            if (gs.hasRole('x_33764_sbridge.worker') || gs.hasRole('x_33764_sbridge.operator')) return true;",
            '        } catch (e3) {}',
            '        return false;',
            '    },',
            '    _setValues: function (gr, values) {',
            '        for (var field in values) {',
            '            if (!Object.prototype.hasOwnProperty.call(values, field)) continue;',
            "            if (field === 'sys_id') continue;",
            "            if (field.indexOf('sys_') === 0 && field !== 'sys_domain') continue;",
            '            if (!gr.isValidField(field)) continue;',
            '            var value = values[field];',
            "            if (value === undefined || value === null) value = '';",
            '            gr.setValue(field, value);',
            '        }',
            '    },',
            "    type: 'SyncBridgeMetadataWrite'",
            '};',
        ].join('\n')
    }

    function globalScopeId() {
        var scope = new GlideRecord('sys_scope')
        scope.addQuery('scope', 'global')
        scope.setLimit(1)
        scope.query()
        return scope.next() ? scope.getUniqueValue() : ''
    }

    function lastError(gr) {
        try {
            return gr.getLastErrorMessage() || ''
        } catch (ignore) {
            return ''
        }
    }
})()
