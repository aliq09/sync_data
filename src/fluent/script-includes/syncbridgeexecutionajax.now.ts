import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['SyncBridgeExecutionAjax'],
    name: 'SyncBridgeExecutionAjax',
    description:
        'Client-callable wrapper for configuration-form Preview and Execute Now dialogs. Delegates to SyncBridgeExecutionService.',
    clientCallable: true,
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/sync-bridge-execution-ajax.js'),
})
