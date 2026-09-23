import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['SyncBridgeProgress'],
    name: 'SyncBridgeProgress',
    description:
        'Deterministic live-progress percent from an existing data execution snapshot. Pure function. Acknowledgement weight is 0 until 0.4.0.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/sync-bridge-progress.js'),
})
