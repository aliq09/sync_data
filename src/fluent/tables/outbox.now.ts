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
        pack_seq: IntegerColumn({
            label: 'Pack sequence',
            default: 0,
            hint: '0 for a Path A row. Pack expand sets a higher value so parents drain before children and cmdb_rel_ci is last.',
        }),
    },
    index: [
        { name: 'idx_outbox_drain', unique: false, element: ['peer', 'state'] },
        { name: 'idx_outbox_source', unique: false, element: ['source_sys_id', 'peer'] },
        { name: 'idx_outbox_pack', unique: false, element: ['peer', 'state', 'pack_seq'] },
    ],
})
