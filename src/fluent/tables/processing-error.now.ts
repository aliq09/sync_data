import {
    Table,
    StringColumn,
    BooleanColumn,
    JsonColumn,
    ReferenceColumn,
    TableNameColumn,
} from '@servicenow/sdk/core'

/**
 * Processing Error — Failed Transfers list.
 * Shadows dead-letter rows. The physical DLQ table stays for Case 1.
 */
export const x_33764_sbridge_processing_error = Table({
    name: 'x_33764_sbridge_processing_error',
    label: 'Processing Error',
    display: 'source_sys_id',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        legacy_key: StringColumn({
            label: 'Shadow key',
            hint: 'Idempotency key, usually dlq:<dlq sys_id>.',
            maxLength: 160,
            readOnly: true,
        }),
        resolved: BooleanColumn({ label: 'Resolved', default: false }),
        error: StringColumn({ label: 'Error', maxLength: 4000 }),
        payload: JsonColumn({ label: 'Payload' }),
        source_table: TableNameColumn({ label: 'Source table' }),
        source_sys_id: StringColumn({ label: 'Source record', maxLength: 32 }),
        execution: ReferenceColumn({
            label: 'Data execution',
            referenceTable: 'x_33764_sbridge_data_execution',
        }),
        transfer: ReferenceColumn({
            label: 'Transfer',
            referenceTable: 'x_33764_sbridge_transfer',
        }),
        dlq: ReferenceColumn({
            label: 'Failed delivery',
            hint: 'Case 1 dead-letter row this error shadows.',
            referenceTable: 'x_33764_sbridge_dlq',
        }),
    },
    index: [
        { name: 'idx_err_key', unique: false, element: 'legacy_key' },
        { name: 'idx_err_dlq', unique: false, element: 'dlq' },
        { name: 'idx_err_resolved', unique: false, element: 'resolved' },
        { name: 'idx_err_exec', unique: false, element: 'execution' },
    ],
})
