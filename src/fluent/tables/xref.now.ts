import {
    Table,
    StringColumn,
    TableNameColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

export const x_33764_sbridge_xref = Table({
    name: 'x_33764_sbridge_xref',
    label: 'Sync Bridge Xref',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        peer: ReferenceColumn({
            label: 'Peer',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_peer',
        }),
        source_table: TableNameColumn({ label: 'Source table', mandatory: true }),
        source_sys_id: StringColumn({ label: 'Source sys_id', mandatory: true, maxLength: 32 }),
        target_sys_id: StringColumn({ label: 'Target sys_id', mandatory: true, maxLength: 32 }),
    },
    index: [
        {
            name: 'idx_xref_peer_source',
            unique: true,
            element: ['peer', 'source_table', 'source_sys_id'],
        },
    ],
})
