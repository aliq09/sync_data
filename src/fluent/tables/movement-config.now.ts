import {
    Table,
    BooleanColumn,
    StringColumn,
    IntegerColumn,
    ConditionsColumn,
    FieldListColumn,
    TableNameColumn,
    ReferenceColumn,
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
        filter: ConditionsColumn({ label: 'Filter', dependent: 'source_table' }),
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
        policy: ReferenceColumn({
            label: 'Sync policy',
            hint: 'Case 1 policy this configuration shadows. Capture still uses the policy.',
            referenceTable: 'x_33764_sbridge_policy',
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
    index: [{ name: 'idx_mvcfg_policy', unique: false, element: 'policy' }],
})
