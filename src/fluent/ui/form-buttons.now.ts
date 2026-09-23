import { ClientScript } from '@servicenow/sdk/core'

ClientScript({
    $id: Now.ID['cs-hide-bottom-config-buttons'],
    name: 'Hide duplicate bottom form buttons',
    table: 'x_33764_sbridge_movement_config',
    type: 'onLoad',
    uiType: 'desktop',
    global: true,
    active: true,
    isolateScript: false,
    appliesExtended: false,
    description:
        'Classic UI paints form buttons on the top and bottom bars. Fluent has no top-only flag. This hides the bottom bar on the configuration form.',
    script: Now.include('../../scripts/ui/hide-bottom-buttons.client.js'),
})

ClientScript({
    $id: Now.ID['cs-hide-bottom-dex-buttons'],
    name: 'Hide duplicate bottom form buttons',
    table: 'x_33764_sbridge_data_execution',
    type: 'onLoad',
    uiType: 'desktop',
    global: true,
    active: true,
    isolateScript: false,
    appliesExtended: false,
    description:
        'Classic UI paints form buttons on the top and bottom bars. Fluent has no top-only flag. This hides the bottom bar on the data execution form.',
    script: Now.include('../../scripts/ui/hide-bottom-buttons.client.js'),
})
