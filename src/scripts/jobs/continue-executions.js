/**
 * Pages controller executions. Calls SyncBridgeExecutionService only.
 * BridgeTransport stays on the existing outbox drain job.
 */
;(function continueExecutions() {
    new SyncBridgeExecutionService().continueQueued()
})()
