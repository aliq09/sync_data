import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeDualWrite'],
    name: 'BridgeDualWrite',
    description:
        'Best-effort shadows for configuration, execution, transfer, and audit. Fills state, result, counts, and work notes. Never fails drain or apply.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-dual-write.js'),
})
