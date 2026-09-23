import {
    Table,
    BooleanColumn,
    StringColumn,
    ConditionsColumn,
    FieldListColumn,
    TableNameColumn,
    ReferenceColumn,
    JsonColumn,
} from '@servicenow/sdk/core'

export const x_33764_sbridge_policy = Table({
    name: 'x_33764_sbridge_policy',
    label: 'Sync policy',
    audit: true,
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        active: BooleanColumn({ label: 'Active', default: true }),
        table: TableNameColumn({ label: 'Source table', mandatory: true }),
        direction: StringColumn({
            label: 'Direction',
            mandatory: true,
            choices: {
                outbound: 'Outbound',
                inbound: 'Inbound',
            },
        }),
        peer: ReferenceColumn({
            label: 'Remote peer',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_peer',
        }),
        owner_peer: ReferenceColumn({
            label: 'System of record',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_peer',
        }),
        field_list: FieldListColumn({ label: 'Fields to sync', dependent: 'table' }),
        condition: ConditionsColumn({ label: 'Filter condition', dependent: 'table' }),
        mode: StringColumn({
            label: 'Apply mode',
            default: 'direct',
            choices: {
                direct: 'Direct record apply',
                cmdb: 'CMDB via IRE',
            },
        }),
        preserve_sys_id: BooleanColumn({ label: 'Preserve sys_id on target', default: false }),
        propagate_deletes: BooleanColumn({ label: 'Propagate deletes', default: false }),
        capture_ready: BooleanColumn({ label: 'Capture rule ready', default: false, readOnly: true }),
        ref_map: JsonColumn({ label: 'Reference field map' }),
        target_map: JsonColumn({ label: 'Target field map' }),
        target_table: TableNameColumn({ label: 'Target table (if remapped)' }),
    },
    index: [
        { name: 'idx_policy_table_dir', unique: false, element: ['table', 'direction'] },
        { name: 'idx_policy_peer', unique: false, element: 'peer' },
    ],
})
