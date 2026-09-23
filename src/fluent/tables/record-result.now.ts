import { Table, StringColumn, ReferenceColumn, TableNameColumn } from '@servicenow/sdk/core'

/**
 * Minimal per-record outcome under a Data Execution.
 * Contextual on the execution form. Not a primary navigator module.
 */
export const x_33764_sbridge_record_result = Table({
    name: 'x_33764_sbridge_record_result',
    label: 'Record Result',
    display: 'source_sys_id',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.reader',
    schema: {
        legacy_key: StringColumn({
            label: 'Shadow key',
            maxLength: 160,
            readOnly: true,
        }),
        execution: ReferenceColumn({
            label: 'Data execution',
            referenceTable: 'x_33764_sbridge_data_execution',
        }),
        transfer: ReferenceColumn({
            label: 'Transfer',
            referenceTable: 'x_33764_sbridge_transfer',
        }),
        source_table: TableNameColumn({ label: 'Source table' }),
        source_sys_id: StringColumn({ label: 'Source record', maxLength: 32 }),
        target_sys_id: StringColumn({ label: 'Target record', maxLength: 32 }),
        action: StringColumn({
            label: 'Action',
            choices: {
                insert: 'Insert',
                update: 'Update',
                delete: 'Delete',
                skip: 'Skip',
                fail: 'Fail',
            },
        }),
        result: StringColumn({ label: 'Result', maxLength: 40 }),
        error: StringColumn({ label: 'Error', maxLength: 4000 }),
    },
    index: [
        { name: 'idx_res_key', unique: false, element: 'legacy_key' },
        { name: 'idx_res_exec', unique: false, element: 'execution' },
    ],
})
