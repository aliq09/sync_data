import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgePolicyHelper'],
    name: 'BridgePolicyHelper',
    description: 'Ensure declarative capture Business Rule for a policy table.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-policy-helper.js'),
})
