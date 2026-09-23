import {
    Table,
    BooleanColumn,
    StringColumn,
    UrlColumn,
    DateTimeColumn,
    ReferenceColumn,
} from '@servicenow/sdk/core'

export const x_33764_sbridge_peer = Table({
    name: 'x_33764_sbridge_peer',
    label: 'Instance',
    display: 'name',
    audit: true,
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.operator',
    schema: {
        name: StringColumn({ label: 'Name', mandatory: true, maxLength: 100 }),
        base_url: UrlColumn({ label: 'Instance URL', mandatory: true }),
        active: BooleanColumn({ label: 'Active', default: false }),
        role: StringColumn({
            label: 'Role',
            hint: 'Local or remote instance. Choice values stay peer/local so Case 1 scripts keep working.',
            default: 'peer',
            choices: {
                peer: 'Remote',
                local: 'Local',
            },
        }),
        connection_alias: ReferenceColumn({
            label: 'Connection alias',
            hint: 'Connection & Credential alias used for outbound auth',
            referenceTable: 'sys_alias',
        }),
        oauth_profile: ReferenceColumn({
            label: 'OAuth profile',
            referenceTable: 'oauth_entity_profile',
        }),
        last_successful_drain: DateTimeColumn({ label: 'Last successful drain' }),
        last_error: StringColumn({ label: 'Last error', maxLength: 4000 }),
    },
    index: [
        { name: 'idx_peer_name', unique: true, element: 'name' },
        { name: 'idx_peer_active', unique: false, element: 'active' },
    ],
})
