/**
 * 0.5.1. Runs once from its own sys_script_fix record.
 *
 * Scoped GlideRecord.setValue on cmdb_software_instance does not keep field
 * values for the integration user, including the string name. canCreate()
 * still returns true because that checks the ACL, not the cross-scope
 * element. This publishes global.SyncBridgeSoftwareWrite, which inserts and
 * updates that one table as the same user. It does not grant admin and it
 * does not add the table to SyncBridgeMetadataWrite.
 *
 * 0.4.9 already published insert. verifyWriter requires update as well, so
 * this record replaces the global script when update is missing.
 *
 * Fluent cannot declare apiName global.*. UpdateManager2 is not used.
 * The Table API call sets sysparm_transaction_scope=global, same as the
 * 0.4.5 metadata writer publish.
 */
;(function publishSoftwareWriter() {
    var WRITER = 'SyncBridgeSoftwareWrite'
    var MARKER = 'sbridge-software-writer=0.5.2'
    var script = softwareWriterScript()

    try {
        if (verifyWriter(false)) {
            gs.info('[bridge] software writer callable as global.' + WRITER + ' update=yes marker=0.5.2')
            return
        }
    } catch (checkErr) {
        gs.warn('[bridge] software writer check threw: ' + checkErr)
    }

    var api = publishViaTableApi(script)
    if (verifyWriter(true)) {
        deleteAppCopies()
        return
    }

    stampGlobal(script)
    if (verifyWriter(true)) {
        deleteAppCopies()
        return
    }

    var queued = queueGlobalPublish(script)
    gs.error(
        '[bridge] SyncBridgeSoftwareWrite 0.5.2 is not stored in global yet. Table API status=' +
            api.status +
            (api.detail ? ' ' + api.detail : '') +
            (queued
                ? '. Queued a one-time sys_trigger. Confirm the log line software writer callable as global.SyncBridgeSoftwareWrite update=yes marker=0.5.2.'
                : '. The one-time sys_trigger was not queued.') +
            ' If the log line is missing, PATCH sys_script_include global.SyncBridgeSoftwareWrite with softwareWriterScript() from src/scripts/jobs/publish-software-writer.js. The stored script must contain ' +
            MARKER +
            '.'
    )

    function publishViaTableApi(body) {
        var out = { ok: false, status: 0, detail: '' }
        var base = instanceUri()
        if (!base) {
            out.detail = 'glide.servlet.uri is empty'
            gs.warn('[bridge] software writer table api skipped: ' + out.detail)
            return out
        }
        var existing = writerId(true)
        var method = existing ? 'PATCH' : 'POST'
        var endpoint = base + 'api/now/table/sys_script_include'
        if (existing) endpoint += '/' + existing
        endpoint += '?sysparm_transaction_scope=global'
        var payload = {
            name: WRITER,
            script: body,
            active: 'true',
            access: 'public',
            api_name: 'global.' + WRITER,
            caller_access: '1',
            client_callable: 'false',
            description:
                'Sync Bridge insert and update for cmdb_software_instance. Runs as the integration user. Does not grant admin.',
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
            var raw = ''
            try {
                raw = response.getBody() || ''
            } catch (ignoreBody) {
                raw = ''
            }
            out.detail = tableApiDetail(raw)
            out.ok = out.status >= 200 && out.status < 300
            gs.info(
                '[bridge] software writer table api ' +
                    method +
                    ' sysparm_transaction_scope=global status=' +
                    out.status +
                    (out.detail ? ' ' + out.detail : '') +
                    (token ? '' : ' (no session token)')
            )
        } catch (apiErr) {
            out.detail = apiErr + ''
            gs.warn('[bridge] software writer table api threw: ' + apiErr)
        }
        return out
    }

    function queueGlobalPublish(body) {
        var ready = new GlideRecord('sys_trigger')
        if (!ready.isValid()) return false
        ready.addQuery('name', 'Sync Bridge publish software writer 0.5.2')
        ready.addQuery('state', '0')
        ready.setLimit(1)
        ready.query()
        if (ready.next()) return true
        var when = new GlideDateTime()
        when.addSeconds(15)
        var trigger = new GlideRecord('sys_trigger')
        trigger.initialize()
        trigger.setValue('name', 'Sync Bridge publish software writer 0.5.2')
        trigger.setValue('script', globalPublishScript(body))
        trigger.setValue('trigger_type', '0')
        trigger.setValue('state', '0')
        trigger.setValue('next_action', when)
        if (trigger.isValidField('job_id')) trigger.setValue('job_id', '81c92ce9c0a8016400e5f0d2f784ea78')
        var id = ''
        try {
            id = trigger.insert() || ''
        } catch (queueErr) {
            gs.warn('[bridge] software writer sys_trigger insert threw: ' + queueErr)
            return false
        }
        if (!id) return false
        gs.info('[bridge] queued global software writer publish trigger=' + id)
        return true
    }

    function globalPublishScript(body) {
        return [
            '(function publishSyncBridgeSoftwareWriter() {',
            '  var WRITER = "SyncBridgeSoftwareWrite";',
            '  var scriptBody = ' + JSON.stringify(body) + ';',
            '  try { gs.setCurrentApplicationId("global"); } catch (scopeErr) { gs.warn("[bridge] software writer setCurrentApplicationId(global) refused: " + scopeErr); }',
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
            '  gr.setValue("description", "Sync Bridge insert and update for cmdb_software_instance. Runs as the integration user. Does not grant admin.");',
            '  if (gr.isValidField("api_name")) gr.setValue("api_name", "global." + WRITER);',
            '  if (gr.isValidField("sys_scope")) gr.setValue("sys_scope", "global");',
            '  if (gr.isValidField("sys_package")) gr.setValue("sys_package", "global");',
            '  var id = exists ? gr.update() : gr.insert();',
            '  var check = new GlideRecord("sys_script_include");',
            '  if (!id || !check.get(id)) {',
            '    gs.error("[bridge] global software writer publish failed");',
            '    return;',
            '  }',
            '  var callable = false;',
            '  try {',
            '    var writer = new SyncBridgeSoftwareWrite();',
            '    callable = !!(writer && typeof writer.insert === "function" && typeof writer.update === "function");',
            '  } catch (callErr) {',
            '    gs.error("[bridge] global.SyncBridgeSoftwareWrite is not callable: " + callErr);',
            '  }',
            '  if (!callable || (check.getValue("sys_scope") || "") !== "global" || check.getValue("api_name") !== "global." + WRITER) {',
            '    gs.error("[bridge] software writer publish left scope=" + check.getValue("sys_scope") + " api_name=" + check.getValue("api_name") + " update=" + (callable ? "yes" : "no"));',
            '    return;',
            '  }',
            '  var stored = check.getValue("script") || "";',
            '  if (stored.indexOf("sbridge-software-writer=0.5.2") === -1) {',
            '    gs.error("[bridge] software writer trigger did not store sbridge-software-writer=0.5.2. PATCH sys_script_include global.SyncBridgeSoftwareWrite from src/scripts/jobs/publish-software-writer.js softwareWriterScript().");',
            '    return;',
            '  }',
            '  gs.info("[bridge] software writer callable as global.SyncBridgeSoftwareWrite update=yes marker=0.5.2 scope=global api_name=" + check.getValue("api_name") + " access=" + check.getValue("access"));',
            '})();',
        ].join('\n')
    }

    function stampGlobal(body) {
        var id = writerId(true)
        if (!id) {
            gs.warn('[bridge] software writer stamp skipped: no global sys_script_include row')
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
            gs.warn('[bridge] software writer setCurrentApplicationId(global) refused: ' + scopeErr)
        }
        try {
            var gr = new GlideRecord('sys_script_include')
            if (!gr.get(id)) return
            gr.setWorkflow(false)
            gr.setValue('script', body)
            gr.setValue('active', true)
            gr.setValue('access', 'public')
            if (gr.isValidField('api_name')) gr.setValue('api_name', 'global.' + WRITER)
            if (gr.isValidField('sys_scope')) gr.setValue('sys_scope', 'global')
            if (gr.isValidField('sys_package')) gr.setValue('sys_package', 'global')
            var updated = gr.update()
            var saved = new GlideRecord('sys_script_include')
            var stored = saved.get(id) ? saved.getValue('script') || '' : ''
            gs.info(
                '[bridge] software writer stamp update=' +
                    updated +
                    ' marker=' +
                    (stored.indexOf(MARKER) !== -1 ? '0.5.2' : 'missing') +
                    ' scope=' +
                    (saved.getValue('sys_scope') || '')
            )
        } finally {
            if (switched && previous) {
                try {
                    gs.setCurrentApplicationId(previous)
                } catch (restoreErr) {
                    gs.warn('[bridge] could not restore application after software writer stamp: ' + restoreErr)
                }
            }
        }
    }

    function verifyWriter(log) {
        var row = new GlideRecord('sys_script_include')
        row.addQuery('name', WRITER)
        row.addQuery('sys_scope', 'global')
        row.addQuery('api_name', 'global.' + WRITER)
        row.setLimit(1)
        row.query()
        if (!row.next()) return false
        var body = row.getValue('script') || ''
        var scriptCurrent = body.indexOf(MARKER) !== -1 && body.indexOf('update: function') !== -1
        var callable = false
        var updateLive = false
        try {
            var writer = new global.SyncBridgeSoftwareWrite()
            callable = !!(writer && typeof writer.insert === 'function')
            updateLive = !!(writer && typeof writer.update === 'function')
        } catch (e) {
            if (log) gs.warn('[bridge] global.' + WRITER + ' is not callable yet: ' + e)
            return false
        }
        // The stored script is the source of truth. A cached update() from
        // 0.5.1 is not enough: 0.5.1's fix script returned before the Table
        // API wrote this body on the PDIs.
        if (!scriptCurrent) return false
        if (!callable || !updateLive) {
            if (log) {
                gs.info(
                    '[bridge] software writer script is stored with ' +
                        MARKER +
                        ' but the class cache does not expose update yet'
                )
            }
            return true
        }
        if (log) {
            gs.info(
                '[bridge] software writer callable as global.' +
                    WRITER +
                    ' update=yes marker=0.5.2 scope=global api_name=' +
                    row.getValue('api_name') +
                    ' access=' +
                    row.getValue('access')
            )
        }
        return true
    }

    function writerId(globalOnly) {
        var gr = new GlideRecord('sys_script_include')
        gr.addQuery('name', WRITER)
        if (globalOnly) gr.addQuery('sys_scope', 'global')
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr.getUniqueValue() : ''
    }

    function deleteAppCopies() {
        var gr = new GlideRecord('sys_script_include')
        gr.addQuery('name', WRITER)
        gr.addQuery('sys_scope', '!=', 'global')
        gr.query()
        while (gr.next()) {
            var id = gr.getUniqueValue()
            if (!gr.deleteRecord()) gs.warn('[bridge] could not remove non-global software writer ' + id)
        }
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

    function tableApiDetail(raw) {
        if (!raw) return ''
        try {
            var parsed = JSON.parse(raw)
            if (parsed.error) return ((parsed.error.message || '') + ' ' + (parsed.error.detail || '')).substring(0, 300)
            var result = parsed.result || {}
            return ('scope=' + (result.sys_scope || '') + ' api_name=' + (result.api_name || '')).substring(0, 300)
        } catch (e) {
            return String(raw).substring(0, 300)
        }
    }

    function softwareWriterScript() {
        return [
            '/* sbridge-software-writer=0.5.2 */',
            'var SyncBridgeSoftwareWrite = Class.create();',
            'SyncBridgeSoftwareWrite.prototype = {',
            '    initialize: function () {},',
            '    insert: function (valuesJson, token, preserveId) {',
            '        var gate = this._gate(token, valuesJson);',
            '        if (gate.error) return gate;',
            "        var table = 'cmdb_software_instance';",
            '        var gr = new GlideRecord(table);',
            "        if (!gr.isValid()) return { error: 'invalid table ' + table };",
            '        gr.initialize();',
            '        if (preserveId) {',
            '            var clash = new GlideRecord(table);',
            '            if (clash.get(preserveId)) {',
            "                return { error: 'sys_id ' + preserveId + ' already exists in ' + table };",
            '            }',
            '            gr.setNewGuidValue(preserveId);',
            '        }',
            '        var applied = this._applyFields(gr, gate.values);',
            '        if (!applied.ok) return { error: applied.hold };',
            '        var id = gr.insert();',
            '        if (!id) {',
            "            var detail = '';",
            "            try { detail = gr.getLastErrorMessage() || ''; } catch (dErr) { detail = ''; }",
            "            return { error: 'global insert into ' + table + ' returned no sys_id' + (detail ? ': ' + detail : '') + '; ' + applied.hold };",
            '        }',
            "        gs.info('[bridge] software writer insert ' + id + ' user=' + (gs.getUserName() || '') + ' ' + applied.hold);",
            "        return { sys_id: id + '', hold: applied.hold, operation: 'insert' };",
            '    },',
            '    update: function (targetSysId, valuesJson, token) {',
            '        var gate = this._gate(token, valuesJson);',
            '        if (gate.error) return gate;',
            "        var id = targetSysId ? String(targetSysId) : '';",
            "        if (!id) return { error: 'software update requires a target sys_id' };",
            "        var table = 'cmdb_software_instance';",
            '        var gr = new GlideRecord(table);',
            "        if (!gr.isValid()) return { error: 'invalid table ' + table };",
            "        if (!gr.get(id)) return { error: 'cmdb_software_instance ' + id + ' was not found for update' };",
            '        var applied = this._applyFields(gr, gate.values);',
            '        if (!applied.ok) return { error: applied.hold };',
            '        var updated = gr.update();',
            '        if (!updated) {',
            "            var detail = '';",
            "            try { detail = gr.getLastErrorMessage() || ''; } catch (dErr) { detail = ''; }",
            "            return { error: 'global update of ' + table + ' ' + id + ' returned no sys_id' + (detail ? ': ' + detail : '') + '; ' + applied.hold };",
            '        }',
            "        gs.info('[bridge] software writer update ' + updated + ' user=' + (gs.getUserName() || '') + ' ' + applied.hold);",
            "        return { sys_id: updated + '', hold: applied.hold, operation: 'update' };",
            '    },',
            '    _gate: function (token, valuesJson) {',
            "        if (!this._tokenOk(token)) return { error: 'software write is only available to apply' };",
            "        if (!this._callerOk()) return { error: 'software write refused for this user' };",
            '        var values = {};',
            '        try { values = valuesJson ? JSON.parse(valuesJson) : {}; } catch (parseErr) {',
            "            return { error: 'software values were not valid JSON' };",
            '        }',
            '        return { values: values };',
            '    },',
            '    _applyFields: function (gr, values) {',
            "        var fields = ['name', 'installed_on', 'software', 'version', 'edition', 'publisher', 'display_name', 'prod_id', 'install_date'];",
            '        var bits = [];',
            '        var i;',
            '        values = values || {};',
            '        for (i = 0; i < fields.length; i++) bits.push(this._setOne(gr, fields[i], values));',
            '        var known = {};',
            '        for (i = 0; i < fields.length; i++) known[fields[i]] = true;',
            '        for (var extra in values) {',
            '            if (!Object.prototype.hasOwnProperty.call(values, extra) || known[extra]) continue;',
            '            if (extra === "sys_id" || (extra.indexOf("sys_") === 0 && extra !== "sys_domain")) continue;',
            '            this._setOne(gr, extra, values);',
            '        }',
            "        var name = '';",
            "        var installed = '';",
            "        try { name = gr.getValue('name') || ''; installed = gr.getValue('installed_on') || ''; } catch (hErr) {}",
            "        var wantedName = values.name ? String(values.name) : '';",
            "        var wantedOn = values.installed_on ? String(values.installed_on) : '';",
            '        var ok = !!(wantedName && wantedOn && name === wantedName && installed === wantedOn);',
            "        var hold = 'hold-after-setValue ' + bits.join(' ') + ' sameGr=true scope=global';",
            '        return { ok: ok, hold: hold };',
            '    },',
            '    _setOne: function (gr, field, values) {',
            '        var text = values[field] === undefined || values[field] === null ? "" : String(values[field]);',
            '        var valid = false;',
            '        try { valid = !!gr.isValidField(field); } catch (vErr) { valid = false; }',
            "        var ret = 'not-called';",
            '        if (valid && text) {',
            '            try {',
            '                var returned = gr.setValue(field, text);',
            "                ret = returned === undefined || returned === null ? 'undefined' : String(returned);",
            "            } catch (setErr) { ret = 'threw:' + setErr; }",
            '        }',
            "        var held = '';",
            "        try { held = gr.getValue(field) || ''; } catch (gErr) { held = ''; }",
            "        var canWrite = '';",
            '        if (valid && text && held !== text) {',
            '            try {',
            '                var element = gr.getElement(field);',
            "                if (element && element.canWrite) canWrite = element.canWrite() ? 'true' : 'false';",
            "            } catch (cErr) { canWrite = 'threw'; }",
            '        }',
            "        return field + '=' + (held || '(empty)') + ' isValidField=' + (valid ? 'true' : 'false') + ' setValue=' + ret + (canWrite ? ' canWrite=' + canWrite : '');",
            '    },',
            '    _tokenOk: function (token) {',
            "        var expected = '';",
            "        try { expected = gs.getSession().getClientData('x_33764_sbridge.sw_write') || ''; } catch (e) { expected = ''; }",
            '        if (!expected) {',
            "            try { expected = gs.getSession().getProperty('x_33764_sbridge.sw_write') || ''; } catch (e2) { expected = ''; }",
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
            "    type: 'SyncBridgeSoftwareWrite'",
            '};',
        ].join('\n')
    }
})()
