import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['br-dex-number'],
    name: 'Sync Bridge — number Data Execution',
    table: 'x_33764_sbridge_data_execution',
    when: 'before',
    action: ['insert'],
    order: 50,
    active: true,
    script: Now.include('../../scripts/jobs/assign-number.js'),
})

BusinessRule({
    $id: Now.ID['br-trn-number'],
    name: 'Sync Bridge — number Transfer',
    table: 'x_33764_sbridge_transfer',
    when: 'before',
    action: ['insert'],
    order: 50,
    active: true,
    script: Now.include('../../scripts/jobs/assign-number.js'),
})
