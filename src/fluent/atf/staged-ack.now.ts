import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-staged-ack'],
        name: 'Bridge — staged acknowledgement is idempotent and optional',
        description:
            '0.4.0 correlation and v1/ack. ack_required defaults off so Case 1 completes on /apply. When required, HTTP 200 does not set a successful result. The same terminal ACK twice does not double counts.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-staged-ack-step'],
            script: `(function () {
    assertEqual(typeof BridgeAck, 'function', 'BridgeAck');
    assertEqual(typeof BridgeApi.prototype.ack, 'function', 'v1 ack handler');
    assertEqual(BridgeAck.correlationFor('abc123'), 'SB-abc123', 'correlation stub');
    var missing = new BridgeAck().handleInboundAck({ ack_stage: 'completed' });
    assertEqual(missing.ok, false, 'missing correlation rejected');
    assertEqual(missing.status, 400, 'missing correlation is 400');
    var badStage = new BridgeAck().handleInboundAck({ correlation_id: 'SB-x', ack_stage: '' });
    assertEqual(badStage.status, 400, 'missing stage is 400');
    var built = new BridgeAck().buildTerminal(
        { correlation_id: 'SB-wire', op: 'update', source_sys_id: 'src1' },
        { status: 'rejected', error: 'no active inbound policy' }
    );
    assertEqual(built.ack_stage, 'rejected', 'processing reject is a rejected ack');
    assertEqual(built.result, 'rejected', 'rejected result');
    assertEqual(built.correlation_id, 'SB-wire', 'correlation on the ack body');
    var applied = new BridgeAck().buildTerminal(
        { correlation_id: 'SB-wire', op: 'update', source_sys_id: 'src1' },
        { status: 'applied' }
    );
    assertEqual(applied.ack_stage, 'completed', 'applied is completed');
    assertEqual(applied.counts.updated, 1, 'update count');
    var cfg = new GlideRecord('x_33764_sbridge_movement_config');
    assertEqual(cfg.isValidField('ack_required'), true, 'ack_required column');
    var stamp = gs.generateGUID();
    var correlation = 'SB-ATF' + stamp;
    var ids = { audits: [], transfers: [], dex: [], configs: [] };
    function drop(table, id) {
        if (!id) return;
        var gr = new GlideRecord(table);
        if (gr.get(id)) {
            gr.setWorkflow(false);
            gr.deleteRecord();
        }
    }
    function cleanup() {
        var aud = new GlideRecord('x_33764_sbridge_transfer_audit');
        aud.addQuery('correlation_id', 'STARTSWITH', 'SB-ATF' + stamp);
        aud.query();
        while (aud.next()) ids.audits.push(aud.getUniqueValue());
        var i;
        for (i = 0; i < ids.audits.length; i++) drop('x_33764_sbridge_transfer_audit', ids.audits[i]);
        for (i = 0; i < ids.transfers.length; i++) drop('x_33764_sbridge_transfer', ids.transfers[i]);
        for (i = 0; i < ids.dex.length; i++) drop('x_33764_sbridge_data_execution', ids.dex[i]);
        for (i = 0; i < ids.configs.length; i++) drop('x_33764_sbridge_movement_config', ids.configs[i]);
    }
    try {
        cfg.newRecord();
        cfg.setValue('name', 'ATF ACK ' + stamp);
        cfg.setValue('direction', 'outbound');
        cfg.setValue('source_table', 'cmn_department');
        cfg.setValue('ack_required', false);
        var configId = cfg.insert();
        ids.configs.push(configId);
        assertTrue(!!configId, 'config insert');
        var off = new GlideRecord('x_33764_sbridge_movement_config');
        assertTrue(off.get(configId), 'config read');
        assertEqual(new BridgeAck().requiredForConfig(off), false, 'flag off is not required');
        off.setValue('ack_required', true);
        off.setWorkflow(false);
        off.update();
        assertEqual(new BridgeAck().requiredForConfig(off), true, 'flag on is required');

        var choice = new GlideRecord('x_33764_sbridge_transfer_audit');
        choice.newRecord();
        choice.setValue('legacy_key', 'atf-choice-' + stamp);
        choice.setValue('message_type', 'ack');
        choice.setValue('ack_stage', 'completed');
        choice.setValue('correlation_id', correlation + '-choice');
        choice.setValue('direction', 'inbound');
        var choiceId = choice.insert();
        assertTrue(!!choiceId, 'ack message type insert');
        var choiceRow = new GlideRecord('x_33764_sbridge_transfer_audit');
        assertTrue(choiceRow.get(choiceId), 'ack row read');
        assertEqual(choiceRow.getValue('message_type'), 'ack', 'message_type ack');

        var dex = new GlideRecord('x_33764_sbridge_data_execution');
        dex.newRecord();
        var dexId = dex.getUniqueValue();
        dex.setValue('legacy_key', 'ctrl:' + dexId);
        dex.setValue('configuration', configId);
        dex.setValue('execution_state', 'sending');
        dex.setValue('execution_mode', 'execute');
        dex.setValue('selected_count', 1);
        dex.setValue('source_read_completed_at', new GlideDateTime().getValue());
        dex.setValue('config_snapshot', JSON.stringify({ ack_required: true, contract: 'case1_apply' }));
        assertTrue(!!dex.insert(), 'dex insert');
        ids.dex.push(dexId);

        var trn = new GlideRecord('x_33764_sbridge_transfer');
        trn.newRecord();
        trn.setValue('legacy_key', 'outbox:atf' + stamp);
        trn.setValue('execution', dexId);
        trn.setValue('correlation_id', correlation);
        trn.setValue('stage', 'sent');
        trn.setValue('transport_status', 'success');
        trn.setValue('http_status', 200);
        trn.setValue('source_table', 'cmn_department');
        var trnId = trn.insert();
        assertTrue(!!trnId, 'transfer insert');
        ids.transfers.push(trnId);

        new BridgeDualWrite().completeControllerIfReady(dexId);
        var held = new GlideRecord('x_33764_sbridge_data_execution');
        assertTrue(held.get(dexId), 'held dex');
        assertEqual(held.getValue('execution_result') || '', '', 'http 200 does not set a result');
        assertEqual(held.getValue('execution_state'), 'awaiting_acknowledgement', 'waits for acknowledgement');

        var ack = new BridgeAck();
        var received = ack.handleInboundAck({ correlation_id: correlation, ack_stage: 'received', record_count: 1, result: 'received' });
        assertEqual(received.ok, true, 'received accepted');
        assertEqual(received.duplicate, false, 'received first time');
        var receivedAgain = ack.handleInboundAck({ correlation_id: correlation, ack_stage: 'received', record_count: 1, result: 'received' });
        assertEqual(receivedAgain.duplicate, true, 'received redelivery');
        var mid = new GlideRecord('x_33764_sbridge_data_execution');
        mid.get(dexId);
        assertEqual(parseInt(mid.getValue('received_count'), 10) || 0, 1, 'received count once');
        assertEqual(mid.getValue('execution_result') || '', '', 'received is not success');
        assertTrue(!!mid.getValue('target_received_at'), 'target received at');

        var done = ack.handleInboundAck({
            correlation_id: correlation,
            ack_stage: 'completed',
            record_count: 1,
            result: 'successful',
            counts: { inserted: 0, updated: 1, skipped: 0, failed: 0 },
        });
        assertEqual(done.ok, true, 'completed accepted');
        assertEqual(done.duplicate, false, 'completed first time');
        var fin = new GlideRecord('x_33764_sbridge_data_execution');
        fin.get(dexId);
        assertEqual(fin.getValue('execution_state'), 'completed', 'terminal ack completes');
        assertEqual(fin.getValue('execution_result'), 'successful', 'result comes from the ack');
        assertTrue(!!fin.getValue('acknowledged_at'), 'acknowledged at');
        assertEqual(parseInt(fin.getValue('acknowledged_count'), 10) || 0, 1, 'acknowledged once');
        var doneAgain = ack.handleInboundAck({
            correlation_id: correlation,
            ack_stage: 'completed',
            record_count: 1,
            result: 'successful',
            counts: { updated: 1 },
        });
        assertEqual(doneAgain.duplicate, true, 'terminal redelivery');
        var fin2 = new GlideRecord('x_33764_sbridge_data_execution');
        fin2.get(dexId);
        assertEqual(parseInt(fin2.getValue('acknowledged_count'), 10) || 0, 1, 'count not doubled');

        var cfgOff = new GlideRecord('x_33764_sbridge_movement_config');
        cfgOff.newRecord();
        cfgOff.setValue('name', 'ATF ACK OFF ' + stamp);
        cfgOff.setValue('direction', 'outbound');
        cfgOff.setValue('source_table', 'cmn_department');
        cfgOff.setValue('ack_required', false);
        var cfgOffId = cfgOff.insert();
        ids.configs.push(cfgOffId);
        var dexOff = new GlideRecord('x_33764_sbridge_data_execution');
        dexOff.newRecord();
        var dexOffId = dexOff.getUniqueValue();
        dexOff.setValue('legacy_key', 'ctrl:' + dexOffId);
        dexOff.setValue('configuration', cfgOffId);
        dexOff.setValue('execution_state', 'sending');
        dexOff.setValue('execution_mode', 'execute');
        dexOff.setValue('selected_count', 1);
        dexOff.setValue('source_read_completed_at', new GlideDateTime().getValue());
        dexOff.setValue('config_snapshot', JSON.stringify({ ack_required: false, contract: 'case1_apply' }));
        assertTrue(!!dexOff.insert(), 'flag off dex');
        ids.dex.push(dexOffId);
        var trnOff = new GlideRecord('x_33764_sbridge_transfer');
        trnOff.newRecord();
        trnOff.setValue('legacy_key', 'outbox:atfoff' + stamp);
        trnOff.setValue('execution', dexOffId);
        trnOff.setValue('correlation_id', correlation + '-off');
        trnOff.setValue('stage', 'sent');
        trnOff.setValue('transport_status', 'success');
        trnOff.setValue('http_status', 200);
        var trnOffId = trnOff.insert();
        assertTrue(!!trnOffId, 'flag off transfer');
        ids.transfers.push(trnOffId);
        new BridgeDualWrite().completeControllerIfReady(dexOffId);
        var offDone = new GlideRecord('x_33764_sbridge_data_execution');
        offDone.get(dexOffId);
        assertEqual(offDone.getValue('execution_state'), 'completed', 'flag off still completes');
        assertEqual(offDone.getValue('execution_result'), 'successful', 'flag off uses the apply result');
        assertEqual(offDone.getValue('acknowledged_at') || '', '', 'flag off leaves acknowledgement empty');
    } finally {
        cleanup();
    }
})();`,
        })
    }
)
