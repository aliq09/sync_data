import { Acl } from '@servicenow/sdk/core'
import { operator, worker } from '../roles/roles.now'
import './item-option-new-table'

/**
 * Allow-If rules at the same point are OR (pass any one). Roles, the
 * condition, and the script inside a single rule are AND. Deny-Unless
 * rules run first, and every one of them must pass: another Allow-If does
 * not override a failed Deny-Unless. That includes out-of-box create rules
 * on sys_script (admin), sc_cat_item (catalog_admin), and sys_user_group
 * (user_admin / itil), plus Zurich+ data-type Deny-Unless rules on script
 * and condition_string (snc_required_script_writer_permission). Admin does
 * not skip those data-type rules. 0.4.1's scoped allow rules were present
 * on PDI2 and Cases 5 and 6 still failed, which matches a Deny-Unless still
 * denying. item_option_new has no equivalent gate, which is why Case 7 landed.
 *
 * These rules stay role-only so the scoped GlideRecord path succeeds when
 * the instance has no Deny-Unless in the way. When it does, BridgeApply
 * retries the four metadata tables through global.SyncBridgeMetadataWrite
 * as the same integration user. That path does not grant admin.
 */
Acl({
    $id: Now.ID['acl-worker-sys-script-read'],
    type: 'record',
    table: 'sys_script',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read business rules during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-create'],
    type: 'record',
    table: 'sys_script',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create business rules during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-write'],
    type: 'record',
    table: 'sys_script',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can update business rules during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-star-read'],
    type: 'record',
    table: 'sys_script',
    field: '*',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-star-write'],
    type: 'record',
    table: 'sys_script',
    field: '*',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-script-read'],
    type: 'record',
    table: 'sys_script',
    field: 'script',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.script during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-script-write'],
    type: 'record',
    table: 'sys_script',
    field: 'script',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.script during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-condition-read'],
    type: 'record',
    table: 'sys_script',
    field: 'condition',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.condition during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-condition-write'],
    type: 'record',
    table: 'sys_script',
    field: 'condition',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.condition during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-filter-read'],
    type: 'record',
    table: 'sys_script',
    field: 'filter_condition',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.filter_condition during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-filter-write'],
    type: 'record',
    table: 'sys_script',
    field: 'filter_condition',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.filter_condition during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-advanced-read'],
    type: 'record',
    table: 'sys_script',
    field: 'advanced',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.advanced during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-advanced-write'],
    type: 'record',
    table: 'sys_script',
    field: 'advanced',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.advanced during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-collection-read'],
    type: 'record',
    table: 'sys_script',
    field: 'collection',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.collection during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-collection-write'],
    type: 'record',
    table: 'sys_script',
    field: 'collection',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.collection during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-when-read'],
    type: 'record',
    table: 'sys_script',
    field: 'when',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.when during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-when-write'],
    type: 'record',
    table: 'sys_script',
    field: 'when',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.when during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-action-insert-read'],
    type: 'record',
    table: 'sys_script',
    field: 'action_insert',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.action_insert during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-action-insert-write'],
    type: 'record',
    table: 'sys_script',
    field: 'action_insert',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.action_insert during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-action-update-read'],
    type: 'record',
    table: 'sys_script',
    field: 'action_update',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.action_update during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-action-update-write'],
    type: 'record',
    table: 'sys_script',
    field: 'action_update',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.action_update during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-action-delete-read'],
    type: 'record',
    table: 'sys_script',
    field: 'action_delete',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.action_delete during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-action-delete-write'],
    type: 'record',
    table: 'sys_script',
    field: 'action_delete',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.action_delete during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-action-query-read'],
    type: 'record',
    table: 'sys_script',
    field: 'action_query',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.action_query during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-action-query-write'],
    type: 'record',
    table: 'sys_script',
    field: 'action_query',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.action_query during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-template-read'],
    type: 'record',
    table: 'sys_script',
    field: 'template',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.template during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-template-write'],
    type: 'record',
    table: 'sys_script',
    field: 'template',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.template during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-message-read'],
    type: 'record',
    table: 'sys_script',
    field: 'message',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.message during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-message-write'],
    type: 'record',
    table: 'sys_script',
    field: 'message',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.message during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-abort-action-read'],
    type: 'record',
    table: 'sys_script',
    field: 'abort_action',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.abort_action during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-abort-action-write'],
    type: 'record',
    table: 'sys_script',
    field: 'abort_action',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.abort_action during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-add-message-read'],
    type: 'record',
    table: 'sys_script',
    field: 'add_message',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.add_message during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-add-message-write'],
    type: 'record',
    table: 'sys_script',
    field: 'add_message',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.add_message during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-change-fields-read'],
    type: 'record',
    table: 'sys_script',
    field: 'change_fields',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.change_fields during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-change-fields-write'],
    type: 'record',
    table: 'sys_script',
    field: 'change_fields',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.change_fields during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-role-conditions-read'],
    type: 'record',
    table: 'sys_script',
    field: 'role_conditions',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.role_conditions during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-role-conditions-write'],
    type: 'record',
    table: 'sys_script',
    field: 'role_conditions',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.role_conditions during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-execute-function-read'],
    type: 'record',
    table: 'sys_script',
    field: 'execute_function',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.execute_function during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-execute-function-write'],
    type: 'record',
    table: 'sys_script',
    field: 'execute_function',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.execute_function during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-access-read'],
    type: 'record',
    table: 'sys_script',
    field: 'access',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.access during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-access-write'],
    type: 'record',
    table: 'sys_script',
    field: 'access',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.access during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-description-read'],
    type: 'record',
    table: 'sys_script',
    field: 'description',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-description-write'],
    type: 'record',
    table: 'sys_script',
    field: 'description',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-name-read'],
    type: 'record',
    table: 'sys_script',
    field: 'name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-name-write'],
    type: 'record',
    table: 'sys_script',
    field: 'name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-order-read'],
    type: 'record',
    table: 'sys_script',
    field: 'order',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.order during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-order-write'],
    type: 'record',
    table: 'sys_script',
    field: 'order',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.order during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-active-read'],
    type: 'record',
    table: 'sys_script',
    field: 'active',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.active during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-active-write'],
    type: 'record',
    table: 'sys_script',
    field: 'active',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.active during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-priority-read'],
    type: 'record',
    table: 'sys_script',
    field: 'priority',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.priority during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-priority-write'],
    type: 'record',
    table: 'sys_script',
    field: 'priority',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.priority during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-is-rest-read'],
    type: 'record',
    table: 'sys_script',
    field: 'is_rest',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.is_rest during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-is-rest-write'],
    type: 'record',
    table: 'sys_script',
    field: 'is_rest',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.is_rest during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-client-callable-read'],
    type: 'record',
    table: 'sys_script',
    field: 'client_callable',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.client_callable during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-client-callable-write'],
    type: 'record',
    table: 'sys_script',
    field: 'client_callable',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.client_callable during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-scope-read'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_scope',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.sys_scope during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-scope-write'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_scope',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.sys_scope during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-class-name-read'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_class_name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.sys_class_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-class-name-write'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_class_name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.sys_class_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-package-read'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_package',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.sys_package during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-package-write'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_package',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.sys_package during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-policy-read'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_policy',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.sys_policy during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-policy-write'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_policy',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.sys_policy during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-update-name-read'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_update_name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.sys_update_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-update-name-write'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_update_name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.sys_update_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-name-read'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_script.sys_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-script-sys-name-write'],
    type: 'record',
    table: 'sys_script',
    field: 'sys_name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_script.sys_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-read'],
    type: 'record',
    table: 'sc_cat_item',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read catalog items during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-create'],
    type: 'record',
    table: 'sc_cat_item',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create catalog items during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-write'],
    type: 'record',
    table: 'sc_cat_item',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can update catalog items during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-star-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: '*',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-star-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: '*',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-name-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-name-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-short-description-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'short_description',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.short_description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-short-description-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'short_description',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.short_description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-description-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'description',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-description-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'description',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-active-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'active',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.active during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-active-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'active',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.active during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-category-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'category',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.category during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-category-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'category',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.category during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sc-catalogs-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sc_catalogs',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.sc_catalogs during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sc-catalogs-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sc_catalogs',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.sc_catalogs during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-price-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'price',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-price-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'price',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-recurring-price-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'recurring_price',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.recurring_price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-recurring-price-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'recurring_price',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.recurring_price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-list-price-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'list_price',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.list_price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-list-price-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'list_price',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.list_price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-roles-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'roles',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.roles during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-roles-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'roles',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.roles during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-workflow-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'workflow',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.workflow during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-workflow-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'workflow',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.workflow during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-flow-designer-flow-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'flow_designer_flow',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.flow_designer_flow during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-flow-designer-flow-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'flow_designer_flow',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.flow_designer_flow during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-delivery-plan-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'delivery_plan',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.delivery_plan during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-delivery-plan-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'delivery_plan',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.delivery_plan during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-availability-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'availability',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.availability during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-availability-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'availability',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.availability during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-template-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'template',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.template during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-template-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'template',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.template during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-entitlement-script-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'entitlement_script',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.entitlement_script during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-entitlement-script-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'entitlement_script',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.entitlement_script during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-access-type-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'access_type',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.access_type during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-access-type-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'access_type',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.access_type during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-picture-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'picture',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.picture during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-picture-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'picture',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.picture during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-no-cart-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'no_cart',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.no_cart during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-no-cart-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'no_cart',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.no_cart during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-no-order-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'no_order',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.no_order during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-no-order-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'no_order',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.no_order during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-no-quantity-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'no_quantity',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.no_quantity during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-no-quantity-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'no_quantity',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.no_quantity during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-owner-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'owner',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.owner during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-owner-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'owner',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.owner during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-cost-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'cost',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.cost during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-cost-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'cost',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.cost during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-billable-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'billable',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.billable during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-billable-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'billable',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.billable during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-type-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'type',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.type during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-type-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'type',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.type during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-model-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'model',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.model during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-model-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'model',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.model during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-meta-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'meta',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.meta during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-meta-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'meta',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.meta during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-ignore-price-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'ignore_price',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.ignore_price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-ignore-price-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'ignore_price',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.ignore_price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-omit-price-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'omit_price',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.omit_price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-omit-price-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'omit_price',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.omit_price during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-scope-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_scope',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.sys_scope during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-scope-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_scope',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.sys_scope during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-class-name-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_class_name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.sys_class_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-class-name-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_class_name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.sys_class_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-package-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_package',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.sys_package during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-package-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_package',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.sys_package during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-policy-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_policy',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.sys_policy during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-policy-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_policy',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.sys_policy during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-update-name-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_update_name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.sys_update_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-update-name-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_update_name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.sys_update_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-name-read'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sc_cat_item.sys_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sc-cat-item-sys-name-write'],
    type: 'record',
    table: 'sc_cat_item',
    field: 'sys_name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sc_cat_item.sys_name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-read'],
    type: 'record',
    table: 'item_option_new',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read catalog variables during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-create'],
    type: 'record',
    table: 'item_option_new',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create catalog variables during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-write'],
    type: 'record',
    table: 'item_option_new',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can update catalog variables during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-star-read'],
    type: 'record',
    table: 'item_option_new',
    field: '*',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-star-write'],
    type: 'record',
    table: 'item_option_new',
    field: '*',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-cat-item-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'cat_item',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.cat_item during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-cat-item-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'cat_item',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.cat_item during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-name-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-name-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-question-text-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'question_text',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.question_text during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-question-text-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'question_text',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.question_text during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-type-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'type',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.type during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-type-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'type',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.type during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-order-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'order',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.order during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-order-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'order',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.order during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-mandatory-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'mandatory',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.mandatory during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-mandatory-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'mandatory',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.mandatory during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-reference-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'reference',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.reference during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-reference-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'reference',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.reference during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-default-value-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'default_value',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.default_value during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-default-value-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'default_value',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.default_value during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-variable-set-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'variable_set',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.variable_set during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-variable-set-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'variable_set',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.variable_set during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-active-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'active',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.active during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-active-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'active',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.active during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-description-read'],
    type: 'record',
    table: 'item_option_new',
    field: 'description',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read item_option_new.description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-item-option-new-description-write'],
    type: 'record',
    table: 'item_option_new',
    field: 'description',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write item_option_new.description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-read'],
    type: 'record',
    table: 'sys_user_group',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read user groups during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-create'],
    type: 'record',
    table: 'sys_user_group',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create user groups during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-write'],
    type: 'record',
    table: 'sys_user_group',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can update user groups during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-star-read'],
    type: 'record',
    table: 'sys_user_group',
    field: '*',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-star-write'],
    type: 'record',
    table: 'sys_user_group',
    field: '*',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-name-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-name-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-description-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'description',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-description-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'description',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.description during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-email-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'email',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.email during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-email-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'email',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.email during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-manager-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'manager',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.manager during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-manager-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'manager',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.manager during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-parent-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'parent',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.parent during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-parent-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'parent',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.parent during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-type-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'type',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.type during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-type-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'type',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.type during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-active-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'active',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.active during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-active-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'active',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.active during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-source-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'source',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.source during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-source-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'source',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.source during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-roles-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'roles',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.roles during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-roles-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'roles',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.roles during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-default-assignee-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'default_assignee',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.default_assignee during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-default-assignee-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'default_assignee',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.default_assignee during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-include-members-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'include_members',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.include_members during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-include-members-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'include_members',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.include_members during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-cost-center-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'cost_center',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.cost_center during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-cost-center-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'cost_center',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.cost_center during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-exclude-manager-read'],
    type: 'record',
    table: 'sys_user_group',
    field: 'exclude_manager',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read sys_user_group.exclude_manager during apply.',
})

Acl({
    $id: Now.ID['acl-worker-sys-user-group-exclude-manager-write'],
    type: 'record',
    table: 'sys_user_group',
    field: 'exclude_manager',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write sys_user_group.exclude_manager during apply.',
})
