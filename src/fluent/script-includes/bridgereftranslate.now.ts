import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeRefTranslate'],
    name: 'BridgeRefTranslate',
    description:
        'Reference translation for apply: user_name, group_name, identity, and Record Mapping (xref). 0.4.4 remaps Path A CMDB child foreign keys and Computer references the same way.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-ref-translate.js'),
})
