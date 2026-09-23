import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeCapture'],
    name: 'BridgeCapture',
    description: 'After-BR enqueue only; no remote I/O.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-capture.js'),
})
