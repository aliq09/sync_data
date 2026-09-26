import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeCapture'],
    name: 'BridgeCapture',
    description:
        'After-BR enqueue only; no remote I/O. Public so the global capture business rule can call it. Computer rows merge the cmdb_ci_computer include-list. Path A children merge name and foreign keys, including software installed_on.',
    accessibleFrom: 'public',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-capture.js'),
})
