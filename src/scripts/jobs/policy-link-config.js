/**
 * After save, link this sync policy to a Data Movement Configuration.
 * setWorkflow(false) inside the helper avoids re-entry. Failures are logged only.
 */
;(function executeRule(current) {
    if (!current) return
    try {
        new BridgeDualWrite().linkPolicy(current)
    } catch (e) {
        gs.warn('[bridge] dual-write policy link failed (ignored): ' + e)
    }
})(current, previous)
