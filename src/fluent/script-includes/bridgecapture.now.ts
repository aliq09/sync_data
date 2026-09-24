import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeCapture'],
    name: 'BridgeCapture',
    description:
        'After-BR enqueue only; no remote I/O. Public so the global capture business rule can call it. Computer rows also merge the cmdb_ci_computer include-list.',
    accessibleFrom: 'public',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-capture.js'),
})
