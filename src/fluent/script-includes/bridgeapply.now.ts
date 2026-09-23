import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeApply'],
    name: 'BridgeApply',
    description: 'Idempotent apply on the twin: sequence, ownership, write, receipt.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-apply.js'),
})
