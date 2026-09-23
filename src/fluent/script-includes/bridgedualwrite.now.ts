import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeDualWrite'],
    name: 'BridgeDualWrite',
    description:
        'Phase 1 best-effort shadows for configuration, execution, transfer, and audit. Never fails drain or apply.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-dual-write.js'),
})
