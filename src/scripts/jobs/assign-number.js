/**
 * Before insert for Data Execution (DEX) and Transfer (TRN).
 * Runs as part of GlideRecord.insert(). Assigns only when number is nil or blank.
 * Uses the platform counter (sys_number: prefix + 6 digits) via GlideNumberManager,
 * then NumberManager, then a direct sys_number update. Never writes epoch milliseconds.
 * Skips when the column default already stored DEX###### / TRN######.
 */
;(function executeRule(current) {
    if (!current) return
    var existing = current.getValue('number')
    if (existing) return

    var table = current.getTableName()
    var assigned = assignPlatformNumber(table)
    if (assigned) current.setValue('number', assigned)
    else gs.warn('[bridge] platform number was not assigned for ' + table)

    function assignPlatformNumber(tableName) {
        var fromManager = ''
        try {
            fromManager = new GlideNumberManager(tableName).getNextObjNumberPadded()
        } catch (e1) {
            gs.warn('[bridge] GlideNumberManager failed for ' + tableName + ': ' + e1)
        }
        if (fromManager) return fromManager
        try {
            fromManager = new NumberManager(tableName).getNextObjNumberPadded()
        } catch (e2) {
            gs.warn('[bridge] NumberManager failed for ' + tableName + ': ' + e2)
        }
        if (fromManager) return fromManager
        return assignFromSysNumber(tableName)
    }

    function assignFromSysNumber(tableName) {
        var row = new GlideRecord('sys_number')
        if (!row.isValid()) return ''
        row.addQuery('category', tableName)
        row.setLimit(1)
        row.query()
        if (!row.next()) return ''
        var prefix = row.getValue('prefix') || ''
        var digits = parseInt(row.getValue('maximum_digits'), 10) || 6
        var n = parseInt(row.getValue('number'), 10)
        if (isNaN(n) || n < 1) n = 1
        var padded = String(n)
        while (padded.length < digits) padded = '0' + padded
        row.setValue('number', String(n + 1))
        if (!row.update()) {
            gs.warn('[bridge] sys_number update failed for ' + tableName)
            return ''
        }
        return prefix + padded
    }
})(current, previous)
