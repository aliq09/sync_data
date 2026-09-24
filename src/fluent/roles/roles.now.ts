import { Role } from '@servicenow/sdk/core'

export const reader = Role({
    name: 'x_33764_sbridge.reader',
    description: 'Read Sync Bridge overview, configurations, executions, transfers, and audit.',
})

export const worker = Role({
    name: 'x_33764_sbridge.worker',
    description:
        'Apply worker for metadata tables (sys_script, sc_cat_item, item_option_new). The integration user_name is sbridge.worker; this role is what the ACLs check. Included in operator so an existing operator integration user inherits it on upgrade.',
})

export const operator = Role({
    name: 'x_33764_sbridge.operator',
    description:
        'Operate Sync Bridge: failed transfers, payloads, and sync policies. Cannot change ownership. Contains the apply-worker role used for Case 2 metadata writes.',
    containsRoles: [reader, worker],
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
