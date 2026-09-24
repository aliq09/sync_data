import {
    Table,
    StringColumn,
    IntegerColumn,
    DateTimeColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

export const x_33764_sbridge_run = Table({
    name: 'x_33764_sbridge_run',
    label: 'Sync run',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.reader',
    schema: {
        type: StringColumn({
            label: 'Run type',
            mandatory: true,
            choices: {
                drain: 'Drain',
                bulk_seed: 'Bulk seed',
                divergence: 'Divergence',
            },
        }),
        peer: ReferenceColumn({
            label: 'Remote peer',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        started: DateTimeColumn({ label: 'Started' }),
        ended: DateTimeColumn({ label: 'Ended' }),
        processed: IntegerColumn({ label: 'Processed', default: 0 }),
        failed: IntegerColumn({ label: 'Failed', default: 0 }),
        max_lag_seconds: IntegerColumn({ label: 'Max lag seconds', default: 0 }),
        seed_cursor: StringColumn({ label: 'Seed cursor', maxLength: 32 }),
        seed_member: ReferenceColumn({
            label: 'Seed pack member',
            hint: 'Pack expand resume point. Empty on a Path A bulk seed.',
            referenceTable: 'x_33764_sbridge_pack_member',
        }),
        seed_seq: IntegerColumn({
            label: 'Seed pack sequence',
            default: 0,
            hint: 'Next pack_seq offset inside the current pack member. Path A leaves this at 0.',
        }),
        seed_policy: ReferenceColumn({
            label: 'Seed policy',
            referenceTable: 'x_33764_sbridge_policy',
        }),
    },
    index: [
        { name: 'idx_run_peer_type', unique: false, element: ['peer', 'type'] },
    ],
})
