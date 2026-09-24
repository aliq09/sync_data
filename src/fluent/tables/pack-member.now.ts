import {
    Table,
    BooleanColumn,
    StringColumn,
    IntegerColumn,
    FieldListColumn,
    TableNameColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

/**
 * One step in a Movement Pack.
 * apply_order is the operator sequence. Expand still places cmdb_rel_ci last.
 * graph_kind and flow_key are reserved for a later sys_hub Flow pack.
 * This version does not seed or execute Flow members.
 */
export const x_33764_sbridge_pack_member = Table({
    name: 'x_33764_sbridge_pack_member',
    label: 'Pack Member',
    display: 'name',
    audit: true,
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        pack: ReferenceColumn({
            label: 'Pack',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_movement_pack',
        }),
        name: StringColumn({ label: 'Name', mandatory: true, maxLength: 200 }),
        active: BooleanColumn({ label: 'Active', default: true }),
        apply_order: IntegerColumn({
            label: 'Apply order',
            mandatory: true,
            default: 100,
            hint: 'Lower numbers run first. cmdb_rel_ci is still applied last even if this number is lower.',
        }),
        source_table: TableNameColumn({
            label: 'Table',
            mandatory: true,
            hint: 'Allow-listed table for this step. A later Flow pack can name sys_hub_flow and the other sys_hub tables here.',
        }),
        graph_kind: StringColumn({
            label: 'Graph kind',
            default: 'record',
            hint: 'record and relationship run in this version. Flow kinds are stored only. Expand skips them and does not call Flow.',
            choices: {
                record: 'Record',
                relationship: 'Relationship',
                flow: 'Flow',
                flow_trigger: 'Flow trigger',
                flow_variable: 'Flow variable',
                flow_logic: 'Flow logic',
                flow_action: 'Flow action',
                flow_step: 'Flow step',
                pill: 'Pill',
            },
        }),
        flow_key: StringColumn({
            label: 'Flow key',
            maxLength: 200,
            hint: 'Reserved for a later sys_hub_flow internal_name or name. Empty for record members.',
        }),
        expand_mode: StringColumn({
            label: 'Expand mode',
            default: 'parent_in',
            choices: {
                root_filter: 'Root filter',
                encoded_query: 'Encoded query',
                parent_in: 'Parent field in root ids',
                any_reference_in: 'Any listed field in id scope',
            },
        }),
        parent_field: StringColumn({
            label: 'Parent field',
            maxLength: 400,
            hint: 'Comma-separated foreign keys on this table. parent_in uses the first. any_reference_in ORs every field.',
        }),
        expand_query: StringColumn({
            label: 'Expand query',
            maxLength: 4000,
            hint: 'Encoded query when expand mode is Encoded query. Ignored for root filter and parent-field modes.',
        }),
        id_scope: StringColumn({
            label: 'Id scope',
            default: 'roots',
            hint: 'Which sys_ids parent_in and any_reference_in match. prior_records is every earlier member, which is how cmdb_rel_ci sees moved CIs.',
            choices: {
                none: 'None',
                roots: 'Root records',
                prior_records: 'Earlier members',
                roots_and_prior: 'Roots and earlier members',
            },
        }),
        fk_remap_fields: StringColumn({
            label: 'FK remap fields',
            maxLength: 1000,
            hint: 'Comma-separated fields remapped through Record Mapping on apply. User and group fields stay on the user_name and group_name path.',
        }),
        match_strategy: StringColumn({
            label: 'Match strategy',
            default: 'mapping',
            choices: {
                mapping: 'Record mapping',
                sys_id: 'sys_id',
                business_key: 'Business key',
            },
        }),
        field_list: FieldListColumn({
            label: 'Fields to sync',
            dependent: 'source_table',
            hint: 'Blank uses the Path A include-list for this table when one exists.',
        }),
        parent_member: ReferenceColumn({
            label: 'Parent member',
            referenceTable: 'x_33764_sbridge_pack_member',
            hint: 'Optional. When set, parent-field expand uses that member’s sys_ids instead of the id scope.',
        }),
    },
    index: [{ name: 'idx_pack_member_order', unique: false, element: ['pack', 'apply_order'] }],
})
