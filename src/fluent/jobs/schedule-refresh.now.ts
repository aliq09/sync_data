import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['br-sch-number'],
    name: 'Sync Bridge — number Execution Schedule',
    table: 'x_33764_sbridge_execution_schedule',
    when: 'before',
    action: ['insert'],
    order: 50,
    active: true,
    script: Now.include('../../scripts/jobs/assign-number.js'),
})

BusinessRule({
    $id: Now.ID['br-sch-refresh'],
    name: 'Sync Bridge — refresh execution schedule',
    table: 'x_33764_sbridge_execution_schedule',
    when: 'after',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    script: Now.include('../../scripts/jobs/schedule-refresh.js'),
})
