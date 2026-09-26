/**
 * Data Execution hygiene (0.4.2).
 *
 * Before insert: refuse a row whose configuration is empty so drain polls,
 * backfill, and any other caller cannot land an orphan shell.
 * Before update: do not allow that orphan to become Completed / Successful.
 * Historical orphans are left in place (no delete).
 */
;(function executeRule(current, previous) {
    if (!current) return
    if (current.getValue('configuration')) return

    if (current.operation() === 'insert') {
        current.setAbortAction(true)
        gs.warn('[bridge] refused data execution insert without a configuration')
        return
    }

    var result = current.getValue('execution_result') || ''
    var state = current.getValue('execution_state') || ''
    var success = result === 'successful' || result === 'successful_with_warnings'
    if (state !== 'completed' || !success) return

    var priorState = previous ? previous.getValue('execution_state') || '' : ''
    var priorResult = previous ? previous.getValue('execution_result') || '' : ''
    current.setValue('execution_state', priorState || 'draft')
    current.setValue('execution_result', priorResult)
    gs.warn('[bridge] refused Completed/Successful on a data execution with an empty configuration')
})(current, previous)
