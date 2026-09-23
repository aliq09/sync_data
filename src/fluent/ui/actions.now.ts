import { UiAction } from '@servicenow/sdk/core'

UiAction({
    $id: Now.ID['ua-view-latest-execution'],
    name: 'View latest execution',
    actionName: 'view_latest_execution',
    table: 'x_33764_sbridge_movement_config',
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 100,
    hint: 'Open the newest data execution for this configuration',
    roles: ['x_33764_sbridge.reader'],
    form: {
        showButton: true,
    },
    script: `(function () {
    var dex = new GlideRecord('x_33764_sbridge_data_execution');
    dex.addQuery('configuration', current.getUniqueValue());
    dex.orderByDesc('sys_created_on');
    dex.setLimit(1);
    dex.query();
    if (dex.next()) {
        action.setRedirectURL(dex);
        return;
    }
    gs.addInfoMessage('No data execution exists for this configuration yet.');
    action.setRedirectURL(current);
})();`,
})
