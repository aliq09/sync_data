import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeApi'],
    name: 'BridgeApi',
    description: 'Scripted REST handlers: apply, staged ack, seed, ensure_capture.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-api.js'),
})
