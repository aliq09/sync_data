import { Role } from '@servicenow/sdk/core'

export const reader = Role({
    name: 'x_33764_sbridge.reader',
    description: 'Read Sync Bridge overview, configurations, executions, transfers, and audit.',
})

export const operator = Role({
    name: 'x_33764_sbridge.operator',
    description: 'Operate Sync Bridge: failed transfers, payloads, and sync policies. Cannot change ownership.',
    containsRoles: [reader],
})

export const diagnostics = Role({
    name: 'x_33764_sbridge.diagnostics',
    description: 'Developer menus: legacy queue, payload inspector, technical logs, and lab records.',
    containsRoles: [reader],
})

export const admin = Role({
    name: 'x_33764_sbridge.admin',
    description: 'Configure Sync Bridge: instances, connections, mappings, settings, and ownership.',
    containsRoles: [operator, diagnostics],
    scopedAdmin: true,
})
