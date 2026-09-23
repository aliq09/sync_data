import {
    Table,
    StringColumn,
    IntegerColumn,
    DateTimeColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

export const x_33764_sbridge_run = Table({
    name: 'x_33764_sbridge_run',
    label: 'Sync Bridge Run',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.reader',
    schema: {
        type: StringColumn({
            label: 'Type',
            mandatory: true,
            choices: {
                drain: 'Drain',
                bulk_seed: 'Bulk seed',
                divergence: 'Divergence',
            },
        }),
        peer: ReferenceColumn({
            label: 'Peer',
            referenceTable: 'x_33764_sbridge_peer',
        }),
        started: DateTimeColumn({ label: 'Started' }),
        ended: DateTimeColumn({ label: 'Ended' }),
        processed: IntegerColumn({ label: 'Processed', default: 0 }),
        failed: IntegerColumn({ label: 'Failed', default: 0 }),
        max_lag_seconds: IntegerColumn({ label: 'Max lag seconds', default: 0 }),
        seed_cursor: StringColumn({ label: 'Seed cursor', maxLength: 32 }),
        seed_policy: ReferenceColumn({
            label: 'Seed policy',
            referenceTable: 'x_33764_sbridge_policy',
        }),
    },
    index: [
        { name: 'idx_run_peer_type', unique: false, element: ['peer', 'type'] },
    ],
})
