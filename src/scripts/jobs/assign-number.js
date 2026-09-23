/**
 * Before-insert number for Data Execution (DEX) and Transfer (TRN).
 * Table autoNumber also ships a sys_number record. This fills the field when the
 * platform has not already assigned one. Case 1 tables are not numbered here.
 */
;(function executeRule(current) {
    if (!current || current.getValue('number')) return
    var table = current.getTableName()
    var prefix = 'DEX'
    if (table === 'x_33764_sbridge_transfer') prefix = 'TRN'
    try {
        var mgr = new NumberManager(table)
        var assigned = mgr.getNextObjNumberPadded()
        if (assigned) {
            current.setValue('number', assigned)
            return
        }
    } catch (e) {
        gs.warn('[bridge] NumberManager failed for ' + table + ': ' + e)
    }
    current.setValue('number', prefix + new GlideDateTime().getNumericValue())
})(current, previous)
