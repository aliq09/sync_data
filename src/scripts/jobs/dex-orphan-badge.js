/**
 * Admin badge when orphan Data Executions still exist (0.4.2).
 * Shown on the configuration and data execution forms. Not a delete.
 */
;(function executeRule(current) {
    if (!gs.hasRole('x_33764_sbridge.admin') && !gs.hasRole('admin')) return
    var count = 0
    var ga = new GlideAggregate('x_33764_sbridge_data_execution')
    if (!ga.isValid()) return
    ga.addEncodedQuery('configurationISEMPTY')
    ga.addAggregate('COUNT')
    try {
        gs.getSession().putClientData('sbridge_dex_count_orphans', '1')
        ga.query()
    } finally {
        try {
            gs.getSession().putClientData('sbridge_dex_count_orphans', '')
        } catch (ignoredClear) {}
    }
    if (ga.next()) count = parseInt(ga.getAggregate('COUNT'), 10) || 0
    if (count < 1) return
    gs.addInfoMessage(
        'Sync Bridge: ' +
            count +
            ' orphan data execution(s) have an empty Configuration. They are not successful movements. ' +
            'The Data Executions list uses configurationISNOTEMPTY. Review them with configurationISEMPTY ' +
            '(Data Movement → Orphan executions). This application does not delete them.'
    )
})(current, previous)
