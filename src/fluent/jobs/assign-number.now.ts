import { BusinessRule } from '@servicenow/sdk/core'

/**
 * Assign DEX###### / TRN###### from the table sys_number counter when number is nil.
 * Active on purpose: scripted shadow inserts do not pick up auto-number unless this
 * runs (or the column default javascript:getNextObjNumberPadded() already filled it).
 * Does not write prefix + epoch milliseconds.
 */
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
