import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-execution-control'],
        name: 'Bridge — Phase 5 execution controller is the only entry',
        description:
            'SyncBridgeExecutionService exposes validate, preview, dry run, execute, and schedule. Case 1 capture, drain, and apply stay in place. There is no pause.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-execution-control-step'],
            script: `(function () {
    assertEqual(typeof BridgeCapture, 'function', 'BridgeCapture should stay defined');
    assertEqual(typeof BridgeTransport, 'function', 'BridgeTransport should stay defined');
    assertEqual(typeof BridgeApply, 'function', 'BridgeApply should stay defined');
    assertEqual(typeof BridgeSeed, 'function', 'BridgeSeed should stay defined');
    assertEqual(typeof BridgeSeed.prototype.seedPolicy, 'function', 'seedPolicy stays policy-id');
    assertEqual(typeof SyncBridgeExecutionService, 'function', 'execution controller');
    var svc = new SyncBridgeExecutionService();
    assertEqual(typeof svc.validate, 'function', 'validate');
    assertEqual(typeof svc.preview, 'function', 'preview');
    assertEqual(typeof svc.dryRun, 'function', 'dry run');
    assertEqual(typeof svc.execute, 'function', 'execute');
    assertEqual(typeof svc.executeScheduled, 'function', 'executeScheduled');
    assertEqual(typeof svc.cancel, 'function', 'cancel');
    assertEqual(typeof svc.retry, 'function', 'retry');
    assertEqual(typeof svc.reconcile, 'function', 'reconcile stub');
    assertEqual(typeof svc.executeFromFlow, 'function', 'flow hook');
    assertEqual(typeof svc.pause, 'undefined', 'pause is not part of this release');
    assertEqual(typeof SyncBridgeExecutionAjax, 'function', 'form dialog ajax');
    assertEqual(typeof SyncBridgeExecutionAjax.prototype.preview, 'function', 'ajax preview');
    assertEqual(typeof SyncBridgeExecutionAjax.prototype.executeNow, 'function', 'ajax execute');
    assertEqual(new GlideRecord('x_33764_sbridge_execution_schedule').isValid(), true, 'execution schedule table');
    var dex = new GlideRecord('x_33764_sbridge_data_execution');
    assertEqual(dex.isValidField('execution_mode'), true, 'execution mode');
    assertEqual(dex.isValidField('trigger_type'), true, 'trigger type');
    assertEqual(dex.isValidField('triggered_by'), true, 'triggered by');
    assertEqual(dex.isValidField('trigger_reference'), true, 'trigger reference');
    assertEqual(dex.isValidField('queued_at'), true, 'queued at');
    assertEqual(dex.isValidField('schedule'), true, 'schedule reference');
    assertEqual(dex.isValidField('acknowledged_at'), true, 'ack milestone column');
    var cfg = new GlideRecord('x_33764_sbridge_movement_config');
    assertEqual(cfg.isValidField('concurrent_execution_policy'), true, 'concurrent policy');
    assertEqual(cfg.isValidField('last_execution'), true, 'last execution');
    assertEqual(cfg.isValidField('last_result'), true, 'last result');
    assertEqual(cfg.isValidField('last_run_at'), true, 'last run');
    assertEqual(cfg.isValidField('next_execution_at'), true, 'next execution');
    assertEqual(cfg.isValidField('last_validation_status'), true, 'validation status');
    var dw = new BridgeDualWrite();
    assertEqual(typeof dw.attachControllerRun, 'function', 'controller open path');
    assertEqual(typeof dw.onRunOpened, 'function', 'Case 1 run shadow path');
})();`,
        })
    }
)
