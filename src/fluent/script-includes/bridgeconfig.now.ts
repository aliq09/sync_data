import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeConfig'],
    name: 'BridgeConfig',
    description: 'Shared lookups: properties, local peer, policies, capture coverage.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-config.js'),
})
