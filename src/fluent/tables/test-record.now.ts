import {
    Table,
    StringColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

/** Lab table for ATF + manual seed/drain exercises. */
export const x_33764_sbridge_test_record = Table({
    name: 'x_33764_sbridge_test_record',
    label: 'Sync Bridge Test Record',
    display: 'name',
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        name: StringColumn({ label: 'Name', mandatory: true, maxLength: 200 }),
        description: StringColumn({ label: 'Description', maxLength: 4000 }),
        value: StringColumn({ label: 'Value', maxLength: 100 }),
        owner: ReferenceColumn({ label: 'Owner', referenceTable: 'sys_user' }),
        notes: StringColumn({ label: 'Notes', maxLength: 4000 }),
    },
})
