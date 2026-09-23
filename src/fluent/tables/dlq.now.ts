import {
    Table,
    StringColumn,
    BooleanColumn,
    JsonColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

export const x_33764_sbridge_dlq = Table({
    name: 'x_33764_sbridge_dlq',
    label: 'Failed delivery',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        outbox_ref: ReferenceColumn({
            label: 'Outbox entry',
            referenceTable: 'x_33764_sbridge_outbox',
        }),
        error: StringColumn({ label: 'Error detail', maxLength: 4000 }),
        payload: JsonColumn({ label: 'Payload' }),
        resolved: BooleanColumn({ label: 'Resolved', default: false }),
    },
    index: [
        { name: 'idx_dlq_resolved', unique: false, element: 'resolved' },
        { name: 'idx_dlq_outbox', unique: false, element: 'outbox_ref' },
    ],
})
