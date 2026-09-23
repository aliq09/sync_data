import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-dual-write-shadow'],
        name: 'Bridge — Phase 1 dual-write shadow is best-effort',
        description:
            'Case 1 capture, drain, and apply stay in place. BridgeDualWrite exposes link and shadow hooks. dual_write defaults on. New product tables are installed.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-dual-write-shadow-step'],
            script: `(function () {
    assertEqual(typeof BridgeCapture, 'function', 'BridgeCapture should be defined');
    assertEqual(typeof BridgeTransport, 'function', 'BridgeTransport should be defined');
    assertEqual(typeof BridgeApply, 'function', 'BridgeApply should be defined');
    assertEqual(typeof BridgeSeed, 'function', 'BridgeSeed should be defined');
    assertEqual(typeof BridgeDualWrite, 'function', 'BridgeDualWrite should be defined');
    var dw = new BridgeDualWrite();
    assertEqual(typeof dw.linkPolicies, 'function', 'linkPolicies should exist');
    assertEqual(typeof dw.onRunOpened, 'function', 'onRunOpened should exist');
    assertEqual(typeof dw.onRunClosed, 'function', 'onRunClosed should exist');
    assertEqual(typeof dw.onOutboxSettled, 'function', 'onOutboxSettled should exist');
    assertEqual(typeof dw.onApplyOutcome, 'function', 'onApplyOutcome should exist');
    assertEqual(new BridgeConfig().isDualWrite(), true, 'dual_write defaults on');
    assertEqual(new GlideRecord('x_33764_sbridge_movement_config').isValid(), true, 'movement_config');
    assertEqual(new GlideRecord('x_33764_sbridge_data_execution').isValid(), true, 'data_execution');
    assertEqual(new GlideRecord('x_33764_sbridge_transfer').isValid(), true, 'transfer');
    assertEqual(new GlideRecord('x_33764_sbridge_transfer_audit').isValid(), true, 'transfer_audit');
    assertEqual(new GlideRecord('x_33764_sbridge_processing_error').isValid(), true, 'processing_error');
    assertEqual(new GlideRecord('x_33764_sbridge_record_result').isValid(), true, 'record_result');
    var dex = new GlideRecord('x_33764_sbridge_data_execution');
    assertEqual(dex.isValidField('name'), true, 'execution name snapshot');
    assertEqual(dex.isValidField('acknowledged_at'), true, 'ack milestone column exists');
    assertEqual(dex.isValidField('execution_state'), true, 'execution state');
    assertEqual(dex.isValidField('execution_result'), true, 'execution result');
})();`,
        })
    }
)
