import { BusinessRule } from '@servicenow/sdk/core'

/**
 * Retired. Data Execution and Transfer numbers come from table autoNumber
 * (sys_number: DEX/TRN + 6 digits) when the field is empty on insert.
 * These rules stay installed but inactive so an upgrade overwrites the old
 * script that wrote prefix + epoch milliseconds (DEX1790…).
 */
BusinessRule({
    $id: Now.ID['br-dex-number'],
    name: 'Sync Bridge — number Data Execution',
    table: 'x_33764_sbridge_data_execution',
    when: 'before',
    action: ['insert'],
    order: 50,
    active: false,
    script: Now.include('../../scripts/jobs/assign-number.js'),
})

BusinessRule({
    $id: Now.ID['br-trn-number'],
    name: 'Sync Bridge — number Transfer',
    table: 'x_33764_sbridge_transfer',
    when: 'before',
    action: ['insert'],
    order: 50,
    active: false,
    script: Now.include('../../scripts/jobs/assign-number.js'),
})
