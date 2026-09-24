import {
    Table,
    StringColumn,
    IntegerColumn,
    DateTimeColumn,
    ReferenceColumn,
    TableNameColumn,
} from '@servicenow/sdk/core'

/**
 * Transfer Audit — evidence a payload crossed the boundary. Absorbs delivery receipts
 * in the operator UX. Send and receive rows come from /apply. message_type ack is the
 * staged acknowledgement written on both instances in 0.4.0.
 */
export const x_33764_sbridge_transfer_audit = Table({
    name: 'x_33764_sbridge_transfer_audit',
    label: 'Transfer Audit',
    display: 'transaction_id',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.reader',
    schema: {
        legacy_key: StringColumn({
            label: 'Shadow key',
            hint: 'Idempotency key. Source uses outbox:<id>. Target uses receipt:<id> or apply:<peer>:<source>:<seq>.',
            maxLength: 160,
            readOnly: true,
        }),
        direction: StringColumn({
            label: 'Direction',
            choices: {
                outbound: 'Outbound',
                inbound: 'Inbound',
            },
        }),
        message_type: StringColumn({
            label: 'Message type',
            choices: {
                send: 'Send',
                receive: 'Receive',
                ack: 'Ack',
            },
        }),
        result: StringColumn({ label: 'Result', maxLength: 40 }),
        correlation_id: StringColumn({
            label: 'Correlation ID',
            hint: 'Same value on both instances. Sent on /apply and on every ACK.',
            maxLength: 80,
        }),
        ack_stage: StringColumn({
            label: 'ACK stage',
            hint: 'Staged acknowledgement. 0.4.0 writes received and the terminal stage (completed, failed, or rejected).',
            maxLength: 40,
            choices: {
                received: 'Received',
                validated: 'Validated',
                accepted: 'Accepted',
                processed: 'Processed',
                completed: 'Completed',
                rejected: 'Rejected',
                failed: 'Failed',
            },
        }),
        local_instance: ReferenceColumn({
            label: 'Local instance',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        remote_instance: ReferenceColumn({
            label: 'Remote instance',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        transaction_id: StringColumn({ label: 'Transaction ID', maxLength: 40 }),
        sequence: IntegerColumn({ label: 'Sequence' }),
        record_count: IntegerColumn({ label: 'Record count', default: 1 }),
        payload_hash: StringColumn({ label: 'Payload hash', maxLength: 64 }),
        source_table: TableNameColumn({ label: 'Source table' }),
        source_sys_id: StringColumn({ label: 'Source record', maxLength: 32 }),
        target_sys_id: StringColumn({ label: 'Target record', maxLength: 32 }),
        sent_at: DateTimeColumn({ label: 'Sent at' }),
        remote_received_at: DateTimeColumn({ label: 'Remote received at' }),
        acknowledged_at: DateTimeColumn({
            label: 'Acknowledged at',
            hint: 'Set on the source when a terminal ACK is applied.',
        }),
        http_status: IntegerColumn({ label: 'HTTP status' }),
        error: StringColumn({ label: 'Error', maxLength: 4000 }),
        retry_count: IntegerColumn({ label: 'Retry count', default: 0 }),
        remote_audit_id: StringColumn({
            label: 'Remote audit ID',
            hint: 'The other instance Transfer Audit sys_id, when the ACK body includes remote_audit_id.',
            maxLength: 32,
        }),
        transfer: ReferenceColumn({
            label: 'Transfer',
            referenceTable: 'x_33764_sbridge_transfer',
        }),
        execution: ReferenceColumn({
            label: 'Data execution',
            referenceTable: 'x_33764_sbridge_data_execution',
        }),
        outbox: ReferenceColumn({
            label: 'Outbound queue entry',
            referenceTable: 'x_33764_sbridge_outbox',
        }),
        receipt: ReferenceColumn({
            label: 'Delivery receipt',
            hint: 'Case 1 receipt this audit row shadows on the target.',
            referenceTable: 'x_33764_sbridge_receipt',
        }),
    },
    index: [
        { name: 'idx_aud_key', unique: false, element: 'legacy_key' },
        { name: 'idx_aud_transfer', unique: false, element: 'transfer' },
        { name: 'idx_aud_exec', unique: false, element: 'execution' },
        { name: 'idx_aud_receipt', unique: false, element: 'receipt' },
        { name: 'idx_aud_corr', unique: false, element: 'correlation_id' },
    ],
})
