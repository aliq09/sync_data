import { BusinessRule } from '@servicenow/sdk/core'

/**
 * 0.4.2 empty Data Execution hygiene.
 * Insert and terminal success require a configuration. The default query hides
 * orphans. Admins see a form message while any orphan remains.
 */
BusinessRule({
    $id: Now.ID['br-dex-require-configuration-insert'],
    name: 'Sync Bridge — require execution configuration',
    table: 'x_33764_sbridge_data_execution',
    when: 'before',
    action: ['insert'],
    order: 10,
    active: true,
    description: 'Abort a Data Execution insert when configuration is empty, before a DEX number is consumed.',
    script: Now.include('../../scripts/jobs/dex-require-configuration.js'),
})

BusinessRule({
    $id: Now.ID['br-dex-require-configuration-update'],
    name: 'Sync Bridge — block orphan success',
    table: 'x_33764_sbridge_data_execution',
    when: 'before',
    action: ['update'],
    order: 10,
    active: true,
    description: 'Do not mark an empty-configuration Data Execution Completed and Successful.',
    script: Now.include('../../scripts/jobs/dex-require-configuration.js'),
})

BusinessRule({
    $id: Now.ID['br-dex-hide-orphans'],
    name: 'Sync Bridge — hide empty executions',
    table: 'x_33764_sbridge_data_execution',
    when: 'before',
    action: ['query'],
    order: 100,
    active: true,
    description: 'Default list query is configurationISNOTEMPTY. configurationISEMPTY still returns orphans.',
    script: Now.include('../../scripts/jobs/dex-hide-orphans.js'),
})

BusinessRule({
    $id: Now.ID['br-dex-orphan-badge'],
    name: 'Sync Bridge — orphan execution badge',
    table: 'x_33764_sbridge_data_execution',
    when: 'display',
    order: 100,
    active: true,
    description: 'Tell an admin when orphan Data Executions (empty configuration) still exist.',
    script: Now.include('../../scripts/jobs/dex-orphan-badge.js'),
})

BusinessRule({
    $id: Now.ID['br-config-orphan-badge'],
    name: 'Sync Bridge — orphan execution badge on configuration',
    table: 'x_33764_sbridge_movement_config',
    when: 'display',
    order: 100,
    active: true,
    description: 'Tell an admin on the configuration form when orphan Data Executions still exist.',
    script: Now.include('../../scripts/jobs/dex-orphan-badge.js'),
})
