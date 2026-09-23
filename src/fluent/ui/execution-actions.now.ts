import { UiAction } from '@servicenow/sdk/core'

const config = 'x_33764_sbridge_movement_config'
const dex = 'x_33764_sbridge_data_execution'
const listOff = {
    showButton: false,
    showBannerButton: false,
    showContextMenu: false,
    showListChoice: false,
    showLink: false,
}

UiAction({
    $id: Now.ID['ua-validate-config'],
    name: 'Validate Configuration',
    actionName: 'sbridge_validate_config',
    table: config,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 40,
    hint: 'Check this configuration without moving records',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'unstyled' },
    list: listOff,
    script: `(function () {
    var out = new SyncBridgeExecutionService().validate(current.getUniqueValue(), { trigger_type: 'manual' });
    if (out.status === 'invalid') gs.addErrorMessage(out.message || 'Configuration is invalid.');
    else gs.addInfoMessage(out.message || 'Configuration is valid.');
    action.setRedirectURL(current);
})();`,
})

UiAction({
    $id: Now.ID['ua-preview-records'],
    name: 'Preview Records',
    actionName: 'sbridge_preview_records',
    table: config,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 30,
    hint: 'Count and sample source rows. Does not change the target.',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'unstyled' },
    list: listOff,
    isolateScript: false,
    client: { isClient: true, onClick: 'sbridgePreviewRecords()' },
    script: Now.include('../../scripts/ui/preview-action.client.js'),
})

UiAction({
    $id: Now.ID['ua-dry-run'],
    name: 'Dry Run',
    actionName: 'sbridge_dry_run',
    table: config,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 20,
    hint: 'Create a dry-run data execution. Target business tables are not changed.',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'unstyled' },
    list: listOff,
    client: { isClient: true, onClick: 'sbridgeConfirmDryRun()' },
    script: `function sbridgeConfirmDryRun() {
    if (!confirm('Dry run creates a data execution and predicts insert, update, and skip counts. Target business tables are not changed.')) return false;
    gsftSubmit(null, g_form.getFormElement(), 'sbridge_dry_run');
}
if (typeof window == 'undefined') {
    var out = new SyncBridgeExecutionService().dryRun(current.getUniqueValue(), { trigger_type: 'manual' });
    if (out && out.ok && out.dex_id) {
        gs.addInfoMessage(out.message || ('Queued ' + out.number));
        action.setRedirectURL(current);
    } else {
        gs.addErrorMessage((out && out.message) || 'Dry run did not start.');
        if (out && out.dex_id) {
            var openDex = new GlideRecord('x_33764_sbridge_data_execution');
            if (openDex.get(out.dex_id)) action.setRedirectURL(openDex);
        } else {
            action.setRedirectURL(current);
        }
    }
}`,
})

UiAction({
    $id: Now.ID['ua-execute-now'],
    name: '▶ Execute Now',
    actionName: 'sbridge_execute_now',
    table: config,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 10,
    hint: 'Confirm, then queue a data execution. Transfer uses the existing drain.',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'primary' },
    list: listOff,
    isolateScript: false,
    client: { isClient: true, onClick: 'sbridgeExecuteNow()' },
    script: Now.include('../../scripts/ui/execute-action.client.js'),
})

UiAction({
    $id: Now.ID['ua-schedule-config'],
    name: 'Schedule',
    actionName: 'sbridge_schedule_config',
    table: config,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 50,
    hint: 'Create an execution schedule for this configuration',
    roles: ['x_33764_sbridge.admin'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'unstyled' },
    list: listOff,
    script: `(function () {
    action.setRedirectURL('x_33764_sbridge_execution_schedule.do?sys_id=-1&configuration=' + current.getUniqueValue());
})();`,
})

UiAction({
    $id: Now.ID['ua-clone-config'],
    name: 'Clone Configuration',
    actionName: 'sbridge_clone_config',
    table: config,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 200,
    hint: 'Copy this configuration. The copy stays inactive.',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'unstyled' },
    list: listOff,
    script: `(function () {
    var out = new SyncBridgeExecutionService().cloneConfiguration(current.getUniqueValue());
    if (!out || !out.ok || !out.configuration_id) {
        gs.addErrorMessage((out && out.message) || 'Clone failed.');
        action.setRedirectURL(current);
        return;
    }
    gs.addInfoMessage(out.message || 'Configuration cloned.');
    var copy = new GlideRecord('x_33764_sbridge_movement_config');
    if (copy.get(out.configuration_id)) action.setRedirectURL(copy);
})();`,
})

UiAction({
    $id: Now.ID['ua-activate-config'],
    name: 'Activate',
    actionName: 'sbridge_activate_config',
    table: config,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 210,
    condition: 'current.active == false',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'unstyled' },
    list: listOff,
    script: `(function () {
    var out = new SyncBridgeExecutionService().setActive(current.getUniqueValue(), true);
    gs.addInfoMessage((out && out.message) || 'Configuration activated.');
    action.setRedirectURL(current);
})();`,
})

UiAction({
    $id: Now.ID['ua-deactivate-config'],
    name: 'Deactivate',
    actionName: 'sbridge_deactivate_config',
    table: config,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 220,
    condition: 'current.active == true',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'unstyled' },
    list: listOff,
    script: `(function () {
    var out = new SyncBridgeExecutionService().setActive(current.getUniqueValue(), false);
    gs.addInfoMessage((out && out.message) || 'Configuration deactivated.');
    action.setRedirectURL(current);
})();`,
})

UiAction({
    $id: Now.ID['ua-cancel-dex'],
    name: 'Cancel',
    actionName: 'sbridge_cancel_dex',
    table: dex,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 10,
    condition:
        "current.execution_state == 'draft' || current.execution_state == 'queued' || current.execution_state == 'validating' || current.execution_state == 'preparing' || current.execution_state == 'reading_source'",
    hint: 'Stop further enqueue. Rows already in the outbox may still drain.',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'destructive' },
    list: listOff,
    client: { isClient: true, onClick: 'sbridgeConfirmCancel()' },
    script: `function sbridgeConfirmCancel() {
    if (!confirm('Cancel this execution? Further enqueue stops. Rows already in the outbox may still drain. This is not a rollback.')) return false;
    gsftSubmit(null, g_form.getFormElement(), 'sbridge_cancel_dex');
}
if (typeof window == 'undefined') {
    var out = new SyncBridgeExecutionService().cancel(current.getUniqueValue());
    if (out && out.ok) gs.addInfoMessage(out.message || 'Cancelled.');
    else gs.addErrorMessage((out && out.message) || 'Cancel failed.');
    action.setRedirectURL(current);
}`,
})

UiAction({
    $id: Now.ID['ua-retry-dex'],
    name: 'Retry Failed',
    actionName: 'sbridge_retry_dex',
    table: dex,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 20,
    condition: "current.failed_count > 0 && current.execution_state == 'completed'",
    hint: 'Queue a new execution for this configuration. It re-reads the source. It does not extract only failed rows.',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'unstyled' },
    list: listOff,
    script: `(function () {
    var out = new SyncBridgeExecutionService().retry(current.getUniqueValue());
    if (out && out.ok && out.dex_id) {
        gs.addInfoMessage(out.message || ('Queued ' + out.number));
        var created = new GlideRecord('x_33764_sbridge_data_execution');
        if (created.get(out.dex_id)) {
            action.setRedirectURL(created);
            return;
        }
    }
    gs.addErrorMessage((out && out.message) || 'Retry did not start.');
    if (out && out.dex_id) {
        var existing = new GlideRecord('x_33764_sbridge_data_execution');
        if (existing.get(out.dex_id)) {
            action.setRedirectURL(existing);
            return;
        }
    }
    action.setRedirectURL(current);
})();`,
})

UiAction({
    $id: Now.ID['ua-reconcile-dex'],
    name: 'Reconcile',
    actionName: 'sbridge_reconcile_dex',
    table: dex,
    active: true,
    showInsert: false,
    showUpdate: true,
    order: 30,
    condition: "current.execution_state == 'completed'",
    hint: 'Not available in 0.3.0. Does not change target data.',
    roles: ['x_33764_sbridge.operator'],
    form: { showButton: true, showContextMenu: false, showLink: false, style: 'unstyled' },
    list: listOff,
    script: `(function () {
    var out = new SyncBridgeExecutionService().reconcile(current.getUniqueValue());
    gs.addInfoMessage((out && out.message) || 'Reconcile is not available in this release.');
    action.setRedirectURL(current);
})();`,
})
