import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['br-policy-link-config'],
    name: 'Sync Bridge — link movement config',
    table: 'x_33764_sbridge_policy',
    when: 'after',
    action: ['insert', 'update'],
    order: 200,
    active: true,
    script: Now.include('../../scripts/jobs/policy-link-config.js'),
})
