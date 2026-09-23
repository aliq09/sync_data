/**
 * Before insert for Data Execution (DEX) and Transfer (TRN).
 * Assigns only when number is nil or blank, from the platform counter (sys_number,
 * prefix + 6 digits). Skips when the column default already filled DEX###### / TRN######.
 * Never writes prefix + GlideDateTime milliseconds (that produced DEX1790…).
 */
;(function executeRule(current) {
    if (!current) return
    var existing = current.getValue('number')
    if (existing) return

    var table = current.getTableName()
    var assigned = ''
    try {
        var scoped = new GlideNumberManager(table)
        assigned = scoped.getNextObjNumberPadded()
    } catch (e1) {
        gs.warn('[bridge] GlideNumberManager failed for ' + table + ': ' + e1)
    }
    if (!assigned) {
        try {
            var mgr = new NumberManager(table)
            assigned = mgr.getNextObjNumberPadded()
        } catch (e2) {
            gs.warn('[bridge] NumberManager failed for ' + table + ': ' + e2)
        }
    }
    if (assigned) current.setValue('number', assigned)
    else gs.warn('[bridge] platform number was not assigned for ' + table)
})(current, previous)
