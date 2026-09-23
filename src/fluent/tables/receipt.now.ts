import {
    Table,
    StringColumn,
    IntegerColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

export const x_33764_sbridge_receipt = Table({
    name: 'x_33764_sbridge_receipt',
    label: 'Delivery receipt',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        peer: ReferenceColumn({
            label: 'Remote peer',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_peer',
        }),
        source_sys_id: StringColumn({ label: 'Source record', mandatory: true, maxLength: 32 }),
        target_sys_id: StringColumn({ label: 'Target record', mandatory: true, maxLength: 32 }),
        last_seq: IntegerColumn({ label: 'Last applied sequence', mandatory: true, default: 0 }),
    },
    index: [
        { name: 'idx_receipt_peer_source', unique: true, element: ['peer', 'source_sys_id'] },
    ],
})
