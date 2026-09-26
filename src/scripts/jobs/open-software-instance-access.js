/**
 * 0.4.7. Runs once, from its own sys_script_fix record, after the
 * worker Allow rules and cross-scope privileges load.
 *
 * Opens Can read / Can create / Can update and Accessible from = All
 * application scopes on cmdb_software_instance, and on cmdb_ci_spkg when
 * that table exists. A cross-scope privilege cannot exceed those flags.
 * canCreate() only checks the ACL, so an insert can return no sys_id
 * while canCreate stays true when Can create is unchecked.
 *
 * Does not grant admin. Does not publish SyncBridgeMetadataWrite.
 * Does not touch cmdb_sam_sw_install.
 */
;(function openSoftwareInstanceAccess() {
    var TABLES = ['cmdb_software_instance', 'cmdb_ci_spkg']
    for (var i = 0; i < TABLES.length; i++) {
        try {
            openTable(TABLES[i])
        } catch (e) {
            gs.error('[bridge] application access for ' + TABLES[i] + ' threw: ' + e)
        }
    }

    function openTable(tableName) {
        var gr = new GlideRecord('sys_db_object')
        gr.addQuery('name', tableName)
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) {
            gs.info('[bridge] no sys_db_object named ' + tableName + '; software apply does not require it')
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
                        ' Can read/create/update was not saved. In the Global application, open the table and check Can read, Can create, and Can update. Admin was not granted.'
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
