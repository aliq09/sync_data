/**
 * Fires due execution schedules. Calls executeScheduled only.
 * Does not call BridgeTransport or BridgeSeed directly.
 */
;(function runExecutionSchedules() {
    new SyncBridgeExecutionService().runDueSchedules()
})()
