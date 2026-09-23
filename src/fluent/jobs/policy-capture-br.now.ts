import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['br-policy-ensure-capture'],
    name: 'Sync Bridge — ensure capture rule',
    table: 'x_33764_sbridge_policy',
    when: 'after',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    filterCondition: 'direction=outbound',
    script: Now.include('../../scripts/jobs/policy-ensure-capture.js'),
})
