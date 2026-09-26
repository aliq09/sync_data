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
        field_list: FieldListColumn({
            label: 'Fields to sync',
            dependent: 'table',
            hint: 'For Computer (cmdb_ci_computer and subclasses), capture and seed also merge x_33764_sbridge.cmdb_computer_fields. Blank uses the built-in computer attributes. Set that property to off to sync only this list.',
        }),
        condition: ConditionsColumn({
            label: 'Filter condition',
            dependent: 'table',
            hint: 'Encoded query BridgeSeed and BridgeCapture use. It does not replace a Data Movement Configuration filter that is already set.',
        }),
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
        ref_map: JsonColumn({
            label: 'Reference field map',
            hint: '0.4.1 xref remaps a source sys_id through Record Mapping, then business_key when that property is set. Example: {"ci":{"strategy":"xref","table":"cmdb_ci_computer","business_key":"name"},"cat_item":{"strategy":"xref","table":"sc_cat_item","business_key":"name"}}.',
        }),
        target_map: JsonColumn({ label: 'Target field map' }),
        target_table: TableNameColumn({ label: 'Target table (if remapped)' }),
        movement_config: ReferenceColumn({
            label: 'Data movement configuration',
            hint: 'Phase 1 shadow link. Capture and drain still use this sync policy.',
            referenceTable: 'x_33764_sbridge_movement_config',
        }),
    },
    index: [
        { name: 'idx_policy_table_dir', unique: false, element: ['table', 'direction'] },
        { name: 'idx_policy_peer', unique: false, element: 'peer' },
    ],
})
