/**
 * Keeps next_execution on the schedule row. No transfer logic.
 * The session flag stops the controller's own update from re-entering this rule.
 */
;(function refreshExecutionSchedule(current) {
    if (!current) return
    var key = 'x_33764_sbridge.refresh.' + current.getUniqueValue()
    var session = gs.getSession()
    if (session.getClientData(key) === '1') return
    session.putClientData(key, '1')
    try {
        new SyncBridgeExecutionService().refreshSchedule(current.getUniqueValue())
    } finally {
        session.putClientData(key, '')
    }
})(current, previous)
