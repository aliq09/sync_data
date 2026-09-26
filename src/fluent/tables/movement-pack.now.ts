import {
    Table,
    BooleanColumn,
    StringColumn,
    ConditionsColumn,
    TableNameColumn,
} from '@servicenow/sdk/core'

/**
 * Movement Pack — ordered related-table definition.
 * One Execute Now on a pack-typed configuration expands root_filter into
 * pack members. Platform CI rows are not stored here.
 * Later Flow graphs use the same header; members carry graph_kind.
 */
export const x_33764_sbridge_movement_pack = Table({
    name: 'x_33764_sbridge_movement_pack',
    label: 'Movement Pack',
    display: 'name',
    audit: true,
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        name: StringColumn({ label: 'Name', mandatory: true, maxLength: 200 }),
        active: BooleanColumn({ label: 'Active', default: true }),
        description: StringColumn({ label: 'Description', maxLength: 4000 }),
        version_note: StringColumn({
            label: 'Version note',
            maxLength: 200,
            hint: 'Engine note for this definition. Not the application version.',
        }),
        root_table: TableNameColumn({
            label: 'Root table',
            mandatory: true,
            hint: 'Entry table. Case 1 DETAILED uses cmdb_ci_computer.',
        }),
        root_filter: ConditionsColumn({
            label: 'Root filter',
            dependent: 'root_table',
            hint: 'Encoded query for the root member. Pack expand uses this filter. A single-table configuration filter is unchanged.',
        }),
    },
})
