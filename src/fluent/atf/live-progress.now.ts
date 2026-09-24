import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-live-progress'],
        name: 'Bridge — live progress is computed and does not write',
        description:
            'Percent comes from execution state, counts, and milestones. Acknowledgement weight is 0 unless the execution requires it, then it is 9. No progress_percent column. No pause.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-live-progress-step'],
            script: `(function () {
    assertEqual(typeof SyncBridgeProgress, 'function', 'progress helper');
    assertEqual(typeof SyncBridgeExecutionService.prototype.getLiveProgress, 'function', 'service read');
    assertEqual(typeof SyncBridgeExecutionAjax.prototype.getLiveProgress, 'function', 'ajax read');
    assertEqual(typeof SyncBridgeExecutionService.prototype.pause, 'undefined', 'pause stays absent');
    var dex = new GlideRecord('x_33764_sbridge_data_execution');
    assertEqual(dex.isValidField('progress_percent'), false, 'no progress percent column');
    assertEqual(dex.isValidField('current_stage'), false, 'no current stage column');
    assertEqual(dex.isValidField('progress_message'), false, 'no progress message column');
    var calc = new SyncBridgeProgress();
    function row(extra) {
        var base = {
            number: 'DEX000012',
            execution_state: 'queued',
            execution_result: '',
            execution_mode: 'execute',
            selected_count: 0,
            sent_count: 0,
            inserted_count: 0,
            updated_count: 0,
            skipped_count: 0,
            failed_count: 0,
            source_read_completed_at: '',
            transfer_sent_at: '',
            transfer_completed_at: '',
            target_received_at: '',
            target_processing_completed_at: '',
            queued_at: '',
            started_at: '',
        };
        var key;
        for (key in extra) base[key] = extra[key];
        return base;
    }
    var queued = calc.compute(row({ execution_state: 'queued', queued_at: '2026-01-01 00:00:00' }));
    assertEqual(queued.percent, 3, 'queued weight');
    assertEqual(queued.stage_key, 'queued', 'queued stage');
    assertEqual(queued.ack_skipped, true, 'ack skipped on queued');
    var validating = calc.compute(row({ execution_state: 'validating' }));
    assertEqual(validating.percent, 8, 'validating is prior queued plus its weight');
    var reading = calc.compute(row({ execution_state: 'reading_source', selected_count: 200 }));
    assertEqual(reading.percent, 14, 'reading floor without a total');
    assertEqual(reading.indeterminate, true, 'reading pulses inside the band');
    assertEqual(reading.message, 'Reading source — 200 selected so far', 'reading message');
    var readDone = calc.compute(row({
        execution_state: 'reading_source',
        selected_count: 200,
        source_read_completed_at: '2026-01-01 00:01:00',
    }));
    assertEqual(readDone.percent, 40, 'reading milestone fills the stage');
    assertEqual(readDone.indeterminate, false, 'milestone is determinate');
    var transfer = calc.compute(row({
        execution_state: 'sending',
        selected_count: 200,
        sent_count: 40,
    }));
    assertEqual(transfer.percent, 47, 'sent over selected');
    assertEqual(transfer.message, 'Transferring — 40/200 sent', 'transfer message');
    var applied = calc.compute(row({
        execution_state: 'processing_target',
        selected_count: 200,
        sent_count: 200,
        updated_count: 38,
        failed_count: 2,
    }));
    assertEqual(applied.percent, 79, 'outcome ratio inside target');
    assertEqual(applied.message, 'Applied — 38 updated, 2 failed', 'applied message');
    var warned = calc.compute(row({
        execution_state: 'completed',
        execution_result: 'successful_with_warnings',
        selected_count: 10,
        sent_count: 10,
    }));
    assertEqual(warned.percent, 100, 'warnings are still complete');
    assertEqual(warned.stage_key, 'completed', 'result is not the stage');
    assertEqual(warned.message, 'Completed — Successful with warnings', 'warning summary');
    var again = calc.compute(row({
        execution_state: 'completed',
        execution_result: 'successful_with_warnings',
        selected_count: 10,
        sent_count: 10,
    }));
    assertEqual(again.percent, warned.percent, 'same snapshot same percent');
    var cancelled = calc.compute(row({
        execution_state: 'cancelled',
        execution_result: 'cancelled',
        queued_at: '2026-01-01 00:00:00',
    }));
    assertEqual(cancelled.percent, 3, 'cancel freezes queued percent');
    assertEqual(cancelled.percent < 100, true, 'cancel is not complete');
    var ack = calc.compute(row({ execution_state: 'awaiting_acknowledgement', selected_count: 5, sent_count: 5 }));
    assertEqual(ack.ack_skipped, true, 'ack flag off stays skipped');
    assertEqual(ack.stage_key, 'finalising', 'ack stage hidden when disabled');
    assertEqual(ack.message, 'Acknowledgement skipped (not enabled)', 'ack copy when disabled');
    assertEqual(ack.percent < 100, true, 'ack does not complete the run');
    var ackOn = calc.compute(row({
        execution_state: 'awaiting_acknowledgement',
        selected_count: 5,
        sent_count: 5,
        ack_enabled: true,
        ack_stage: 'received',
        target_received_at: '2026-01-01 00:02:00',
    }));
    assertEqual(ackOn.ack_skipped, false, 'ack enabled is not skipped');
    assertEqual(ackOn.stage_key, 'ack', 'ack stage visible');
    assertEqual(ackOn.message, 'Awaiting acknowledgement — RECEIVED', 'received copy');
    assertEqual(ackOn.percent, 95, 'ack weight 9 sits on top of 86');
    var ackDone = calc.compute(row({
        execution_state: 'awaiting_acknowledgement',
        ack_enabled: true,
        ack_stage: 'completed',
        updated_count: 1,
        inserted_count: 0,
        selected_count: 1,
        sent_count: 1,
    }));
    assertEqual(ackDone.ack_skipped, false, 'completed ack still enabled');
    assertEqual(ackDone.message, 'Acknowledgement COMPLETED — 1 updated, 0 inserted', 'completed ack copy');
    var ackFailed = calc.compute(row({
        execution_state: 'awaiting_acknowledgement',
        ack_enabled: true,
        ack_stage: 'failed',
        ack_error: 'peer does not support ACK',
    }));
    assertEqual(ackFailed.message, 'Acknowledgement FAILED — peer does not support ACK', 'failed ack copy');
    var dry = calc.compute(row({
        execution_mode: 'dry_run',
        execution_state: 'reading_source',
        selected_count: 5,
        source_read_completed_at: '2026-01-01 00:01:00',
    }));
    assertEqual(dry.percent, 95, 'dry run folds transfer and target into reading');
    assertEqual(dry.ack_skipped, true, 'dry run skips ack');
    assertEqual(dry.message.indexOf('Dry run — ') === 0, true, 'dry run copy');
    var dryAck = calc.compute(row({
        execution_mode: 'dry_run',
        execution_state: 'reading_source',
        ack_enabled: true,
        selected_count: 5,
        source_read_completed_at: '2026-01-01 00:01:00',
    }));
    assertEqual(dryAck.ack_skipped, true, 'dry run ignores ack_enabled');
    assertEqual(dryAck.percent, 95, 'dry run weight unchanged when ack flag is on');
    var missing = new SyncBridgeExecutionService().getLiveProgress('');
    assertEqual(missing.ok, false, 'empty id does not write a row');
    assertEqual(missing.ack_skipped, true, 'empty payload still skips ack');
})();`,
        })
    }
)
