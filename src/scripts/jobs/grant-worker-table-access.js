/**
 * Runs after application files load (sys_script_fix.before = false).
 *
 * Two install-time grants the worker needs before the next apply:
 *
 * 1. Direct x_33764_sbridge.worker on the integration user. Operator
 *    contains that role, but inherited sys_user_has_role rows are not
 *    always rebuilt before the next REST call. The ACLs also list
 *    operator so an existing operator still matches.
 *
 * 2. Can read / Can create / Can update on the global tables apply
 *    writes. A cross-scope privilege cannot exceed those flags. OOB,
 *    sys_script and sc_cat_item (and often sys_user_group) leave Can
 *    create and Can update unchecked, so a scoped GlideRecord.insert
 *    returns no sys_id even when the ACL would allow the user.
 *    This script runs as the installing admin. It does not impersonate
 *    anyone, and apply itself never elevates.
 */
;(function grantWorkerTableAccess() {
    var TABLES = ['sys_script', 'sc_cat_item', 'item_option_new', 'sys_user_group']
    var ROLE = 'x_33764_sbridge.worker'

    try {
        grantWorkerRole(ROLE)
    } catch (e) {
        gs.error('[bridge] could not grant ' + ROLE + ': ' + e)
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
