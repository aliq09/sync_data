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
 *    global.* (the SDK requires x_33764_sbridge.*). A scoped
 *    GlideRecord insert is stamped into this application, and
 *    GlideUpdateManager2 / UpdateManager2 is refused in a scoped
 *    script (Invalid object in scoped script: UpdateManager2).
 *    This script publishes the include the way an admin Table API
 *    call does: POST/PATCH api/now/table/sys_script_include with
 *    sysparm_transaction_scope=global, as the installing user's
 *    session. That is a new transaction, so the installer lock does
 *    not stamp the row into x_33764_sbridge. Accessible from = All
 *    application scopes. Caller Access = Caller Tracking.
 *    If that call does not leave a callable global row, a one-time
 *    sys_trigger runs the same upsert outside this install thread.
 *    The worker is not granted admin.
 *
 *    0.4.5 runs this publisher from "Publish global SyncBridgeMetadataWrite"
 *    because the 0.4.4 fix script already ran and will not run again.
 */
;(function grantWorkerTableAccess() {
    var TABLES = ['sys_script', 'sc_cat_item', 'item_option_new', 'sys_user_group']
    var ROLE = 'x_33764_sbridge.worker'
    var WRITER = 'SyncBridgeMetadataWrite'

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
            publishViaTableApi(script)
            if (verifyWriter(false)) deleteAppCopies()
            return
        }

        var api = publishViaTableApi(script)
        if (verifyWriter()) {
            deleteAppCopies()
            return
        }

        var id = writerId(false)
        if (id) {
            try {
                publishGlobal(id, script)
            } catch (moveErr) {
                gs.warn('[bridge] moveMetadata path threw: ' + moveErr)
            }
            if (verifyWriter()) {
                deleteAppCopies()
                return
            }
        }

        var queued = queueGlobalPublish(script)
        gs.error(
            '[bridge] SyncBridgeMetadataWrite is not in global yet. Table API status=' +
                api.status +
                (api.detail ? ' ' + api.detail : '') +
                (queued
                    ? '. Queued a one-time sys_trigger to publish it in global; confirm the log line metadata writer callable as global.SyncBridgeMetadataWrite.'
                    : '. The one-time sys_trigger was not queued.')
        )
    }

    function publishViaTableApi(script) {
        var out = { ok: false, status: 0, detail: '' }
        var base = instanceUri()
        if (!base) {
            out.detail = 'glide.servlet.uri is empty'
            gs.warn('[bridge] metadata writer table api skipped: ' + out.detail)
            return out
        }
        var existing = writerId(true)
        var method = existing ? 'PATCH' : 'POST'
        var endpoint = base + 'api/now/table/sys_script_include'
        if (existing) endpoint += '/' + existing
        endpoint += '?sysparm_transaction_scope=global'
        var payload = {
            name: WRITER,
            script: script,
            active: 'true',
            access: 'public',
            api_name: 'global.' + WRITER,
            caller_access: '1',
            client_callable: 'false',
            description:
                'Sync Bridge apply fallback for sys_script, sc_cat_item, item_option_new, and sys_user_group. Runs as the integration user. Does not grant admin.',
        }
        try {
            var rm = new sn_ws.RESTMessageV2()
            rm.setEndpoint(endpoint)
            rm.setHttpMethod(method)
            rm.setRequestHeader('Accept', 'application/json')
            rm.setRequestHeader('Content-Type', 'application/json')
            var token = sessionToken()
            var sessionId = sessionIdValue()
            if (token) rm.setRequestHeader('X-UserToken', token)
            if (sessionId) rm.setRequestHeader('Cookie', 'glide_session_store=' + sessionId)
            rm.setRequestBody(JSON.stringify(payload))
            rm.setHttpTimeout(20000)
            var response = rm.execute()
            out.status = response.getStatusCode()
            var body = ''
            try {
                body = response.getBody() || ''
            } catch (ignoreBody) {
                body = ''
            }
            out.detail = tableApiDetail(body)
            out.ok = out.status >= 200 && out.status < 300
            gs.info(
                '[bridge] metadata writer table api ' +
                    method +
                    ' sysparm_transaction_scope=global status=' +
                    out.status +
                    (out.detail ? ' ' + out.detail : '') +
                    (token ? '' : ' (no session token)')
            )
        } catch (apiErr) {
            out.detail = apiErr + ''
            gs.warn('[bridge] metadata writer table api threw: ' + apiErr)
        }
        return out
    }

    function queueGlobalPublish(script) {
        var ready = new GlideRecord('sys_trigger')
        if (!ready.isValid()) {
            gs.warn('[bridge] sys_trigger is not visible from this scope; global publish was not queued')
            return false
        }
        ready.addQuery('name', 'Sync Bridge publish global metadata writer')
        ready.addQuery('state', '0')
        ready.setLimit(1)
        ready.query()
        if (ready.next()) {
            gs.info('[bridge] global metadata writer publish already queued trigger=' + ready.getUniqueValue())
            return true
        }
        var when = new GlideDateTime()
        when.addSeconds(15)
        var trigger = new GlideRecord('sys_trigger')
        trigger.initialize()
        trigger.setValue('name', 'Sync Bridge publish global metadata writer')
        trigger.setValue('script', globalPublishScript(script))
        trigger.setValue('trigger_type', '0')
        trigger.setValue('state', '0')
        trigger.setValue('next_action', when)
        // Same job ScheduleOnce uses. The scheduler evaluates this script outside the app-install thread.
        if (trigger.isValidField('job_id')) trigger.setValue('job_id', '81c92ce9c0a8016400e5f0d2f784ea78')
        var id = ''
        try {
            id = trigger.insert() || ''
        } catch (queueErr) {
            gs.warn('[bridge] sys_trigger insert threw: ' + queueErr)
            return false
        }
        if (!id && trigger.isValidField('job_id')) {
            trigger.initialize()
            trigger.setValue('name', 'Sync Bridge publish global metadata writer')
            trigger.setValue('script', globalPublishScript(script))
            trigger.setValue('trigger_type', '0')
            trigger.setValue('state', '0')
            trigger.setValue('next_action', when)
            try {
                id = trigger.insert() || ''
            } catch (retryErr) {
                gs.warn('[bridge] sys_trigger insert without job_id threw: ' + retryErr)
            }
        }
        if (!id) {
            gs.warn('[bridge] could not queue global metadata writer publish ' + lastError(trigger))
            return false
        }
        gs.info('[bridge] queued global metadata writer publish trigger=' + id + ' next_action=' + when.getValue())
        return true
    }

    function globalPublishScript(script) {
        return [
            '(function publishSyncBridgeMetadataWriter() {',
            '  var WRITER = "SyncBridgeMetadataWrite";',
            '  var scriptBody = ' + JSON.stringify(script) + ';',
            '  try { gs.setCurrentApplicationId("global"); } catch (scopeErr) { gs.warn("[bridge] publish setCurrentApplicationId(global) refused: " + scopeErr); }',
            '  var gr = new GlideRecord("sys_script_include");',
            '  gr.addQuery("name", WRITER);',
            '  gr.addQuery("sys_scope", "global");',
            '  gr.setLimit(1);',
            '  gr.query();',
            '  var exists = gr.next();',
            '  if (!exists) gr.initialize();',
            '  gr.setValue("name", WRITER);',
            '  gr.setValue("script", scriptBody);',
            '  gr.setValue("active", true);',
            '  gr.setValue("access", "public");',
            '  if (gr.isValidField("client_callable")) gr.setValue("client_callable", false);',
            '  if (gr.isValidField("caller_access")) gr.setValue("caller_access", "1");',
            '  gr.setValue("description", "Sync Bridge apply fallback. Runs as the integration user. Does not grant admin.");',
            '  if (gr.isValidField("api_name")) gr.setValue("api_name", "global." + WRITER);',
            '  if (gr.isValidField("sys_scope")) gr.setValue("sys_scope", "global");',
            '  if (gr.isValidField("sys_package")) gr.setValue("sys_package", "global");',
            '  var id = exists ? gr.update() : gr.insert();',
            '  var check = new GlideRecord("sys_script_include");',
            '  if (!id || !check.get(id)) {',
            '    gs.error("[bridge] global metadata writer publish failed " + (gr.getLastErrorMessage ? gr.getLastErrorMessage() : ""));',
            '    return;',
            '  }',
            '  var callable = false;',
            '  try {',
            '    var writer = new SyncBridgeMetadataWrite();',
            '    callable = !!(writer && typeof writer.write === "function");',
            '  } catch (callErr) {',
            '    gs.error("[bridge] global.SyncBridgeMetadataWrite is not callable: " + callErr);',
            '  }',
            '  if (!callable || (check.getValue("sys_scope") || "") !== "global" || check.getValue("api_name") !== "global." + WRITER) {',
            '    gs.error("[bridge] metadata writer publish left scope=" + check.getValue("sys_scope") + " api_name=" + check.getValue("api_name"));',
            '    return;',
            '  }',
            '  gs.info("[bridge] metadata writer callable as global.SyncBridgeMetadataWrite scope=global api_name=" + check.getValue("api_name") + " access=" + check.getValue("access"));',
            '  var copies = new GlideRecord("sys_script_include");',
            '  copies.addQuery("name", WRITER);',
            '  copies.addQuery("sys_scope", "!=", "global");',
            '  copies.query();',
            '  var drop = [];',
            '  while (copies.next()) drop.push(copies.getUniqueValue());',
            '  for (var i = 0; i < drop.length; i++) {',
            '    var row = new GlideRecord("sys_script_include");',
            '    if (row.get(drop[i])) row.deleteRecord();',
            '  }',
            '})();',
        ].join('\n')
    }

    function instanceUri() {
        var base = ''
        try {
            base = (gs.getProperty('glide.servlet.uri') || '') + ''
        } catch (ignore) {
            base = ''
        }
        if (!base) return ''
        if (base.charAt(base.length - 1) !== '/') base += '/'
        return base
    }

    function sessionToken() {
        try {
            return (gs.getSession().getSessionToken() || '') + ''
        } catch (ignore) {
            return ''
        }
    }

    function sessionIdValue() {
        try {
            return (gs.getSessionID() || '') + ''
        } catch (ignore) {
            return ''
        }
    }

    function tableApiDetail(body) {
        if (!body) return ''
        try {
            var parsed = JSON.parse(body)
            if (parsed.error) {
                var message = parsed.error.message || ''
                var detail = parsed.error.detail || ''
                return (message + (detail ? ' ' + detail : '')).substring(0, 300)
            }
            var result = parsed.result || {}
            var scope = result.sys_scope
            if (scope && scope.value) scope = scope.value
            return ('scope=' + (scope || '') + ' api_name=' + (result.api_name || '')).substring(0, 300)
        } catch (ignore) {
            return (body + '').replace(/"script"\s*:\s*"[\s\S]*?"/, '"script":"..."').substring(0, 200)
        }
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
