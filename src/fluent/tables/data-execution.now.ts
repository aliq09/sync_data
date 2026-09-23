import {
    Table,
    StringColumn,
    IntegerColumn,
    DateTimeColumn,
    ReferenceColumn,
    TableNameColumn,
    JsonColumn,
    GenericColumn,
} from '@servicenow/sdk/core'

/**
 * Data Execution (DEX…) — one run of a configuration.
 * config_snapshot is written once at start and not revised when the configuration changes.
 * State and Result stay separate. Case 1 still closes from the current /apply contract.
 *
 * Numbering is the table autoNumber (prefix DEX, 6 digits). Inserts leave `number` empty
 * so the platform assigns DEX000001. Do not script prefix + epoch milliseconds.
 * acknowledged_at and acknowledged_count stay empty until a later acknowledgement phase.
 */
export const x_33764_sbridge_data_execution = Table({
    name: 'x_33764_sbridge_data_execution',
    label: 'Data Execution',
    display: 'number',
    audit: true,
    liveFeed: true,
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.reader',
    autoNumber: {
        prefix: 'DEX',
        number: 1,
        numberOfDigits: 6,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        name: StringColumn({
            label: 'Name',
            hint: 'Configuration name frozen when the execution started.',
            maxLength: 200,
            readOnly: true,
        }),
        legacy_key: StringColumn({
            label: 'Shadow key',
            hint: 'Idempotency key, run:<sync run sys_id> for dual-write rows.',
            maxLength: 160,
            readOnly: true,
        }),
        configuration: ReferenceColumn({
            label: 'Configuration',
            referenceTable: 'x_33764_sbridge_movement_config',
        }),
        run: ReferenceColumn({
            label: 'Sync run',
            hint: 'Case 1 sync run this execution shadows.',
            referenceTable: 'x_33764_sbridge_run',
        }),
        config_snapshot: JsonColumn({
            label: 'Configuration snapshot',
            hint: 'Frozen at start. Later configuration edits do not rewrite this JSON.',
            readOnly: true,
        }),
        source_instance: ReferenceColumn({
            label: 'Source instance',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        target_instance: ReferenceColumn({
            label: 'Target instance',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        source_table: TableNameColumn({ label: 'Source table' }),
        target_table: TableNameColumn({ label: 'Target table' }),
        filter_snapshot: StringColumn({ label: 'Filter snapshot', maxLength: 4000, readOnly: true }),
        initiated_by: StringColumn({ label: 'Initiated by', maxLength: 100 }),
        execution_state: StringColumn({
            label: 'State',
            default: 'draft',
            choices: {
                draft: 'Draft',
                queued: 'Queued',
                preparing: 'Preparing',
                reading_source: 'Reading Source',
                sending: 'Sending',
                awaiting_receipt: 'Awaiting Receipt',
                received: 'Received',
                processing_target: 'Processing Target',
                awaiting_acknowledgement: 'Awaiting Acknowledgement',
                finalising: 'Finalising',
                completed: 'Completed',
                cancelled: 'Cancelled',
            },
        }),
        execution_result: StringColumn({
            label: 'Result',
            choices: {
                successful: 'Successful',
                successful_with_warnings: 'Successful with Warnings',
                partially_completed: 'Partially Completed',
                failed: 'Failed',
                cancelled: 'Cancelled',
            },
        }),
        selected_count: IntegerColumn({ label: 'Selected', default: 0 }),
        sent_count: IntegerColumn({ label: 'Sent', default: 0 }),
        received_count: IntegerColumn({ label: 'Received', default: 0 }),
        inserted_count: IntegerColumn({ label: 'Inserted', default: 0 }),
        updated_count: IntegerColumn({ label: 'Updated', default: 0 }),
        skipped_count: IntegerColumn({ label: 'Skipped', default: 0 }),
        failed_count: IntegerColumn({ label: 'Failed', default: 0 }),
        acknowledged_count: IntegerColumn({
            label: 'Acknowledged',
            hint: 'Left empty until staged acknowledgement. Phase 2 does not write a count here.',
        }),
        started_at: DateTimeColumn({ label: 'Started at' }),
        source_read_completed_at: DateTimeColumn({ label: 'Source read completed at' }),
        transfer_sent_at: DateTimeColumn({ label: 'Transfer sent at' }),
        target_received_at: DateTimeColumn({ label: 'Target received at' }),
        target_processing_completed_at: DateTimeColumn({ label: 'Target processing completed at' }),
        acknowledged_at: DateTimeColumn({
            label: 'Acknowledged at',
            hint: 'Left empty until staged acknowledgement. Shown blank on the timeline.',
        }),
        transfer_completed_at: DateTimeColumn({ label: 'Transfer completed at' }),
        execution_completed_at: DateTimeColumn({ label: 'Execution completed at' }),
        duration_seconds: IntegerColumn({
            label: 'Duration seconds',
            hint: 'Filled when the execution completes. Blank while it is still running.',
        }),
        work_notes: GenericColumn({
            columnType: 'journal_input',
            label: 'Work notes',
            maxLength: 4000,
            spellCheck: true,
        }),
        comments: GenericColumn({
            columnType: 'journal_input',
            label: 'Additional comments',
            maxLength: 4000,
            spellCheck: true,
        }),
        comments_and_work_notes: GenericColumn({
            columnType: 'journal_list',
            dependent: 'comments,work_notes',
            label: 'Comments and Work notes',
            maxLength: 4000,
        }),
    },
    index: [
        { name: 'idx_dex_run', unique: false, element: 'run' },
        { name: 'idx_dex_key', unique: false, element: 'legacy_key' },
        { name: 'idx_dex_state', unique: false, element: 'execution_state' },
    ],
})
