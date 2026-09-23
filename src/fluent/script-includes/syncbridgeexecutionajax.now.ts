import { Acl, ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['SyncBridgeExecutionAjax'],
    name: 'SyncBridgeExecutionAjax',
    description:
        'Client-callable wrapper for configuration-form Preview, Execute Now, and live progress. Delegates to SyncBridgeExecutionService.',
    clientCallable: true,
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/sync-bridge-execution-ajax.js'),
})

Acl({
    $id: Now.ID['acl-ajax-execution'],
    type: 'client_callable_script_include',
    operation: 'execute',
    name: 'SyncBridgeExecutionAjax',
    roles: ['x_33764_sbridge.reader', 'x_33764_sbridge.operator'],
    adminOverrides: true,
    description:
        'Readers can poll live progress. Operators can also preview and execute. Execute and dry run still require the operator role inside the service.',
})
