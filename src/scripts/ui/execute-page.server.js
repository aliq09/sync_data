/**
 * Confirmation page. Calls the execution controller only.
 */
var configId = typeof config_id !== 'undefined' ? String(config_id) : ''
var chosen = typeof intent !== 'undefined' ? String(intent) : 'execute'
var svc = new SyncBridgeExecutionService()
var out =
    chosen === 'dry_run'
        ? svc.dryRun(configId, { trigger_type: 'manual', trigger_reference: 'execute-page' })
        : svc.execute(configId, { trigger_type: 'manual', trigger_reference: 'execute-page' })
if (out && out.ok && out.dex_id) {
    gs.addInfoMessage(out.message || 'Queued ' + (out.number || 'data execution') + '.')
    response.sendRedirect('x_33764_sbridge_data_execution.do?sys_id=' + out.dex_id)
} else {
    gs.addErrorMessage((out && out.message) || 'Unable to start the execution.')
    if (out && out.dex_id) response.sendRedirect('x_33764_sbridge_data_execution.do?sys_id=' + out.dex_id)
    else response.sendRedirect('x_33764_sbridge_movement_config.do?sys_id=' + configId)
}
