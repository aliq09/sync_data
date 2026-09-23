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
    label: 'Sync Bridge Policy',
    audit: true,
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        active: BooleanColumn({ label: 'Active', default: true }),
        table: TableNameColumn({ label: 'Table', mandatory: true }),
        direction: StringColumn({
            label: 'Direction',
            mandatory: true,
            choices: {
                outbound: 'Outbound',
                inbound: 'Inbound',
            },
        }),
        peer: ReferenceColumn({
            label: 'Peer',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_peer',
        }),
        owner_peer: ReferenceColumn({
            label: 'Owner peer',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_peer',
        }),
        field_list: FieldListColumn({ label: 'Field list', dependent: 'table' }),
        condition: ConditionsColumn({ label: 'Condition', dependent: 'table' }),
        mode: StringColumn({
            label: 'Mode',
            default: 'direct',
            choices: {
                direct: 'Direct',
                cmdb: 'CMDB / IRE',
            },
        }),
        preserve_sys_id: BooleanColumn({ label: 'Preserve sys_id', default: false }),
        propagate_deletes: BooleanColumn({ label: 'Propagate deletes', default: false }),
        capture_ready: BooleanColumn({ label: 'Capture rule present', default: false, readOnly: true }),
        ref_map: JsonColumn({ label: 'Reference map' }),
        target_map: JsonColumn({ label: 'Target map' }),
        target_table: TableNameColumn({ label: 'Target table' }),
    },
    index: [
        { name: 'idx_policy_table_dir', unique: false, element: ['table', 'direction'] },
        { name: 'idx_policy_peer', unique: false, element: 'peer' },
    ],
})
