import { Role } from '@servicenow/sdk/core'

export const reader = Role({
    name: 'x_33764_sbridge.reader',
    description: 'Read Sync Bridge status, runs, lag. No payload or config rights.',
})

export const operator = Role({
    name: 'x_33764_sbridge.operator',
    description: 'Operate Sync Bridge: read payloads, replay DLQ, activate policies. Cannot change ownership.',
    containsRoles: [reader],
})

export const admin = Role({
    name: 'x_33764_sbridge.admin',
    description: 'Configure Sync Bridge: peers, policies, ownership. Scoped admin.',
    containsRoles: [operator],
    scopedAdmin: true,
})
