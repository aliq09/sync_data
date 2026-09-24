import { Acl } from '@servicenow/sdk/core'
import { operator, worker } from '../roles/roles.now'
import './item-option-new-table'

/**
 * Case 2 apply runs as the integration user (property
 * x_33764_sbridge.integration_user, shipped user_name sbridge.worker).
 * That user already has x_33764_sbridge.operator. Operator contains
 * x_33764_sbridge.worker, and each ACL below also lists operator so the
 * grant applies on the role row that already exists. The script keeps the
 * grant on the integration user: other operator accounts do not pass.
 *
 * Table ACLs cover create/update. Field ACLs cover columns that already
 * have their own rules (sys_script.script in particular). A `*` field rule
 * does not override a more specific field rule, so script is explicit.
 */
const integrationUserScript =
    "answer = String(gs.getUserName() || '') == String(gs.getProperty('x_33764_sbridge.integration_user', '') || '').trim();"

Acl({
    $id: Now.ID['acl-worker-sys-script-read'],
    type: 'record',
    table: 'sys_script',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read business rules during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-create'],
    type: 'record',
    table: 'sys_script',
    operation: 'create',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can create business rules during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-write'],
    type: 'record',
    table: 'sys_script',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can update business rules during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-star-read'],
    type: 'record',
    table: 'sys_script',
    field: '*',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read business rule fields during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-star-write'],
    type: 'record',
    table: 'sys_script',
    field: '*',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can write business rule fields during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-script-read'],
    type: 'record',
    table: 'sys_script',
    field: 'script',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read the business rule script field.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-script-write'],
    type: 'record',
    table: 'sys_script',
    field: 'script',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can write the business rule script field.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-condition-read'],
    type: 'record',
    table: 'sys_script',
    field: 'condition',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read the business rule condition field.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-condition-write'],
    type: 'record',
    table: 'sys_script',
    field: 'condition',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can write the business rule condition field.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-filter-read'],
    type: 'record',
    table: 'sys_script',
    field: 'filter_condition',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read the business rule filter condition.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-filter-write'],
    type: 'record',
    table: 'sys_script',
    field: 'filter_condition',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can write the business rule filter condition.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-advanced-read'],
    type: 'record',
    table: 'sys_script',
    field: 'advanced',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read the business rule advanced flag.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-advanced-write'],
    type: 'record',
    table: 'sys_script',
    field: 'advanced',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can write the business rule advanced flag.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-read'],
    type: 'record',
    table: 'sc_cat_item',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read catalog items during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-create'],
    type: 'record',
    table: 'sc_cat_item',
    operation: 'create',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can create catalog items during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-write'],
    type: 'record',
    table: 'sc_cat_item',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can update catalog items during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-star-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: '*',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read catalog item fields during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-star-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: '*',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can write catalog item fields during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-read'],
    type: 'record',
    table: 'item_option_new',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read catalog variables during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-create'],
    type: 'record',
    table: 'item_option_new',
    operation: 'create',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can create catalog variables during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-write'],
    type: 'record',
    table: 'item_option_new',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can update catalog variables during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-star-read'],
    type: 'record',
    table: 'item_option_new',
    field: '*',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read catalog variable fields during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-star-write'],
    type: 'record',
    table: 'item_option_new',
    field: '*',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can write catalog variable fields during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-cat-item-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'cat_item',
    operation: 'read',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can read item_option_new.cat_item during Sync Bridge apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-cat-item-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'cat_item',
    operation: 'write',
    roles: [worker, operator],
    script: integrationUserScript,
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Integration user can write item_option_new.cat_item during Sync Bridge apply.',
})
