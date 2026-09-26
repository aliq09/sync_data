import {
    Table,
    BooleanColumn,
    StringColumn,
    IntegerColumn,
    ConditionsColumn,
    FieldListColumn,
    TableNameColumn,
    ReferenceColumn,
    DateTimeColumn,
    GenericColumn,
} from '@servicenow/sdk/core'

/**
 * Data Movement Configuration — what should move.
 * Phase 1 rows are linked from sync policies. Capture still reads the policy.
 */
export const x_33764_sbridge_movement_config = Table({
    name: 'x_33764_sbridge_movement_config',
    label: 'Data Movement Configuration',
    display: 'name',
    audit: true,
    liveFeed: true,
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        name: StringColumn({ label: 'Name', mandatory: true, maxLength: 200 }),
        active: BooleanColumn({ label: 'Active', default: true }),
        config_type: StringColumn({
            label: 'Configuration type',
            mandatory: true,
            default: 'table',
            hint: 'Table is one Path A table. Pack expands a Movement Pack into ordered child tables under one data execution.',
            choices: {
                table: 'Table',
                pack: 'Pack',
            },
        }),
        pack: ReferenceColumn({
            label: 'Movement pack',
            referenceTable: 'x_33764_sbridge_movement_pack',
            hint: 'Used when Configuration type is Pack. Execute Now expands this pack. Path A table configurations leave this empty.',
        }),
        direction: StringColumn({
            label: 'Direction',
            mandatory: true,
            default: 'outbound',
            choices: {
                outbound: 'Outbound',
                inbound: 'Inbound',
                bidirectional: 'Bidirectional',
            },
        }),
        description: StringColumn({ label: 'Description', maxLength: 4000 }),
        source_instance: ReferenceColumn({
            label: 'Source instance',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        target_instance: ReferenceColumn({
            label: 'Target instance',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        source_table: TableNameColumn({ label: 'Source table', mandatory: true }),
        target_table: TableNameColumn({ label: 'Target table' }),
        filter: ConditionsColumn({
            label: 'Filter',
            dependent: 'source_table',
            hint: 'Preview, dry run, and the execution snapshot. Execute does not replace a filter you already saved with the sync policy condition. BridgeSeed still sends the policy condition. Clear this filter to copy the policy condition on the next policy link.',
        }),
        operation: StringColumn({
            label: 'Operation',
            default: 'upsert',
            choices: {
                upsert: 'Upsert',
                insert: 'Insert',
                update: 'Update',
                delete: 'Delete',
            },
        }),
        match_strategy: StringColumn({
            label: 'Match strategy',
            default: 'mapping',
            choices: {
                sys_id: 'sys_id',
                business_key: 'Business key',
                mapping: 'Record mapping',
            },
        }),
        reference_handling: StringColumn({
            label: 'Reference handling',
            hint: 'Resolve (default) remaps reference fields through Record Mapping on apply. Preserve keeps the source sys_id. A per-field identity or preserve entry on the sync policy Reference field map overrides this.',
            default: 'resolve',
            choices: {
                resolve: 'Resolve references',
                null_and_flag: 'Null and flag',
                preserve: 'Preserve sys_id',
            },
        }),
        apply_mode: StringColumn({
            label: 'Apply mode',
            default: 'direct',
            choices: {
                direct: 'Direct record apply',
                cmdb: 'CMDB via IRE',
            },
        }),
        field_list: FieldListColumn({ label: 'Fields to sync', dependent: 'source_table' }),
        preserve_sys_id: BooleanColumn({ label: 'Preserve sys_id on target', default: false }),
        propagate_deletes: BooleanColumn({ label: 'Propagate deletes', default: false }),
        batch_size: IntegerColumn({ label: 'Batch size', default: 250 }),
        ack_required: BooleanColumn({
            label: 'Require acknowledgement',
            hint: 'Default off. When true, a successful POST to /apply is transport only. The execution result is set from the staged ACK (RECEIVED, then COMPLETED, FAILED, or REJECTED). Leave false until both peers are on 0.4.0.',
            default: false,
        }),
        policy: ReferenceColumn({
            label: 'Sync policy',
            hint: 'Case 1 policy this configuration shadows. Capture still uses the policy. Execute resolves this policy for BridgeSeed.',
            referenceTable: 'x_33764_sbridge_policy',
        }),
        concurrent_execution_policy: StringColumn({
            label: 'Concurrent execution',
            hint: 'Prevent blocks a second run while one execution for this configuration is still open. Queue and Allow are partial in 0.3.0.',
            default: 'prevent',
            choices: {
                prevent: 'Prevent',
                queue: 'Queue',
                allow: 'Allow',
            },
        }),
        last_execution: ReferenceColumn({
            label: 'Last execution',
            referenceTable: 'x_33764_sbridge_data_execution',
            readOnly: true,
        }),
        last_result: StringColumn({
            label: 'Last result',
            readOnly: true,
            choices: {
                successful: 'Successful',
                successful_with_warnings: 'Successful with Warnings',
                partially_completed: 'Partially Completed',
                failed: 'Failed',
                cancelled: 'Cancelled',
            },
        }),
        last_run_at: DateTimeColumn({ label: 'Last run', readOnly: true }),
        next_execution_at: DateTimeColumn({
            label: 'Next execution',
            hint: 'Earliest next run across active execution schedules.',
            readOnly: true,
        }),
        last_validation_status: StringColumn({
            label: 'Last validation',
            default: 'never',
            readOnly: true,
            choices: {
                never: 'Never',
                valid: 'Valid',
                valid_with_warnings: 'Valid with warnings',
                invalid: 'Invalid',
            },
        }),
        last_validated_at: DateTimeColumn({ label: 'Last validated', readOnly: true }),
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
    index: [{ name: 'idx_mvcfg_policy', unique: false, element: 'policy' }],
})
