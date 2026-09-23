import {
    Table,
    StringColumn,
    IntegerColumn,
    JsonColumn,
    TableNameColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

export const x_33764_sbridge_outbox = Table({
    name: 'x_33764_sbridge_outbox',
    label: 'Outbound queue entry',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        peer: ReferenceColumn({
            label: 'Remote peer',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_peer',
        }),
        table: TableNameColumn({ label: 'Table', mandatory: true }),
        source_sys_id: StringColumn({ label: 'Source record sys_id', mandatory: true, maxLength: 32 }),
        op: StringColumn({
            label: 'Operation',
            mandatory: true,
            choices: {
                insert: 'Insert',
                update: 'Update',
                delete: 'Delete',
            },
        }),
        seq: IntegerColumn({ label: 'Sequence', mandatory: true }),
        payload: JsonColumn({ label: 'Payload', mandatory: true }),
        state: StringColumn({
            label: 'State',
            default: 'pending',
            choices: {
                pending: 'Pending',
                failed: 'Failed',
                sent: 'Sent',
                dead: 'Dead',
            },
        }),
        attempts: IntegerColumn({ label: 'Send attempts', default: 0 }),
        mode: StringColumn({
            label: 'Capture mode',
            default: 'change',
            choices: {
                change: 'Change feed',
                bulk_seed: 'Bulk seed',
            },
        }),
    },
    index: [
        { name: 'idx_outbox_drain', unique: false, element: ['peer', 'state'] },
        { name: 'idx_outbox_source', unique: false, element: ['source_sys_id', 'peer'] },
    ],
})
