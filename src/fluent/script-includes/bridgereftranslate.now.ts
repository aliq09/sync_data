import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeRefTranslate'],
    name: 'BridgeRefTranslate',
    description:
        'Reference translation for apply: user_name, group_name, identity, and Record Mapping (xref). Path A child foreign keys and the software-instance include-list live here.',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-ref-translate.js'),
})
