import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeAck'],
    name: 'BridgeAck',
    description:
        'Staged acknowledgement: correlation on the wire, inbound v1/ack, terminal callback, and acknowledgement timeout. Does not replace drain or apply.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-ack.js'),
})
