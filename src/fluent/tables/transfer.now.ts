import {
    Table,
    StringColumn,
    IntegerColumn,
    ReferenceColumn,
    TableNameColumn,
} from '@servicenow/sdk/core'

/**
 * Transfer (TRN…) — one outbox payload under a Data Execution.
 * Dual-written from the physical outbox. The outbox remains the Case 1 queue.
 * correlation_id and stage are present for a later acknowledgement phase.
 * Case 1 writes only queued / sent / failed / dead / rejected from today's apply result.
 */
export const x_33764_sbridge_transfer = Table({
    name: 'x_33764_sbridge_transfer',
    label: 'Transfer',
    display: 'number',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.reader',
    autoNumber: {
        prefix: 'TRN',
        number: 1,
        numberOfDigits: 6,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        legacy_key: StringColumn({
            label: 'Shadow key',
            hint: 'Idempotency key, outbox:<outbox sys_id>.',
            maxLength: 160,
            readOnly: true,
        }),
        execution: ReferenceColumn({
            label: 'Data execution',
            referenceTable: 'x_33764_sbridge_data_execution',
        }),
        outbox: ReferenceColumn({
            label: 'Outbound queue entry',
            hint: 'Case 1 outbox row this transfer shadows.',
            referenceTable: 'x_33764_sbridge_outbox',
        }),
        correlation_id: StringColumn({
            label: 'Correlation ID',
            hint: 'Local stub (SB- plus outbox sys_id). Not sent on the Case 1 /apply contract.',
            maxLength: 80,
        }),
        stage: StringColumn({
            label: 'Stage',
            default: 'queued',
            hint: 'Case 1 sets queued, sent, failed, dead, or rejected. Later ACK stages are reserved and unused.',
            choices: {
                queued: 'Queued',
                sent: 'Sent',
                failed: 'Failed',
                dead: 'Dead',
                rejected: 'Rejected',
                received: 'Received',
                validated: 'Validated',
                accepted: 'Accepted',
                processed: 'Processed',
                completed: 'Completed',
            },
        }),
        transport_status: StringColumn({
            label: 'Transport status',
            default: 'pending',
            choices: {
                pending: 'Pending',
                success: 'Success',
                failed: 'Failed',
            },
        }),
        http_status: IntegerColumn({ label: 'HTTP status' }),
        record_count: IntegerColumn({ label: 'Record count', default: 1 }),
        source_instance: ReferenceColumn({
            label: 'Source instance',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        target_instance: ReferenceColumn({
            label: 'Target instance',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        source_table: TableNameColumn({ label: 'Source table' }),
        source_sys_id: StringColumn({ label: 'Source record', maxLength: 32 }),
        operation: StringColumn({
            label: 'Operation',
            choices: {
                insert: 'Insert',
                update: 'Update',
                delete: 'Delete',
            },
        }),
        attempts: IntegerColumn({ label: 'Send attempts', default: 0 }),
        error: StringColumn({ label: 'Error', maxLength: 4000 }),
    },
    index: [
        { name: 'idx_trn_outbox', unique: false, element: 'outbox' },
        { name: 'idx_trn_key', unique: false, element: 'legacy_key' },
        { name: 'idx_trn_exec', unique: false, element: 'execution' },
        { name: 'idx_trn_stage', unique: false, element: 'stage' },
    ],
})
