import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgePackExpand'],
    name: 'BridgePackExpand',
    description:
        'Path B pack expand. Resolves a Movement Pack into an ordered outbox under one data execution. Flow members are skipped.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-pack-expand.js'),
})
