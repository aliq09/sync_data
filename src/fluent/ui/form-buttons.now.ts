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
    $id: Now.ID['cs-live-execution-progress'],
    name: 'Live execution progress',
    table: 'x_33764_sbridge_movement_config',
    type: 'onLoad',
    uiType: 'desktop',
    global: true,
    active: true,
    order: 200,
    isolateScript: false,
    appliesExtended: false,
    description:
        'Polls SyncBridgeExecutionAjax.getLiveProgress under the form header. Stops on a terminal or idle snapshot. Does not invent percent from elapsed time.',
    script: Now.include('../../scripts/ui/live-progress.client.js'),
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
