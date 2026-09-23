import {
    Table,
    StringColumn,
    IntegerColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

export const x_33764_sbridge_receipt = Table({
    name: 'x_33764_sbridge_receipt',
    label: 'Sync Bridge Receipt',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        peer: ReferenceColumn({
            label: 'Peer',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_peer',
        }),
        source_sys_id: StringColumn({ label: 'Source sys_id', mandatory: true, maxLength: 32 }),
        target_sys_id: StringColumn({ label: 'Target sys_id', mandatory: true, maxLength: 32 }),
        last_seq: IntegerColumn({ label: 'Last sequence', mandatory: true, default: 0 }),
    },
    index: [
        { name: 'idx_receipt_peer_source', unique: true, element: ['peer', 'source_sys_id'] },
    ],
})
