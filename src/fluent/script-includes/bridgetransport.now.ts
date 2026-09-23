import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeTransport'],
    name: 'BridgeTransport',
    description: 'Drain outbox to peer with claim, backoff, batch POST.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-transport.js'),
})
