import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['BridgeSeed'],
    name: 'BridgeSeed',
    description: 'Resumable bulk seed/backfill enqueue (batch 200).',
    accessibleFrom: 'package_private',
    active: true,
    script: Now.include('../../scripts/script-includes/bridge-seed.js'),
})
