/**
 * Default Data Executions visibility (0.4.2).
 *
 * Hide rows whose configuration is empty unless the caller asked for them
 * (configurationISEMPTY / configuration=NULL) or is loading one record by sys_id.
 * The Data Executions module filter is configurationISNOTEMPTY. This rule covers
 * list opens that do not go through that module. It does not delete anything.
 */
;(function executeRule(current) {
    if (!current || !current.isValid()) return
    try {
        if (gs.getSession().getClientData('sbridge_dex_count_orphans') === '1') return
    } catch (ignored) {}
    var query = current.getEncodedQuery() || ''
    if (query.indexOf('configurationISEMPTY') !== -1) return
    if (query.indexOf('configuration=NULL') !== -1) return
    if (query.indexOf('configurationISNOTEMPTY') !== -1) return
    if (query.indexOf('configurationISNOTNULL') !== -1) return
    if (/(^|\^)sys_id=[^^!]+/.test(query)) return
    if (/(^|\^)sys_idIN/.test(query)) return
    current.addNotNullQuery('configuration')
})(current, previous)
