import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['SyncBridgeExecutionService'],
    name: 'SyncBridgeExecutionService',
    description:
        'Execution controller. Validate, preview, dry run, execute, and schedule all enter here. Transfer stays on BridgeSeed and the existing drain.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/sync-bridge-execution-service.js'),
})
