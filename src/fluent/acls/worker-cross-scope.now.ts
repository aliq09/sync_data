import { CrossScopePrivilege } from '@servicenow/sdk/core'

/**
 * Runtime access tracking on this app defaults to permissive (tracking),
 * which logs cross-scope calls and still allows them. Enforcing mode
 * refuses the call unless a privilege is allowed. A privilege cannot
 * exceed the table's own Can read / Can create / Can update flags; the
 * install fix script turns those on for the four apply tables.
 *
 * One record per operation. Delete is not granted. The execute privilege
 * covers the global script include the install fix script creates so
 * Enforcing mode still allows the metadata-write fallback.
 */

CrossScopePrivilege({
    $id: Now.ID['csp-sys-script-read'],
    status: 'allowed',
    operation: 'read',
    targetName: 'sys_script',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-sys-script-write'],
    status: 'allowed',
    operation: 'write',
    targetName: 'sys_script',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-sys-script-create'],
    status: 'allowed',
    operation: 'create',
    targetName: 'sys_script',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-sc-cat-item-read'],
    status: 'allowed',
    operation: 'read',
    targetName: 'sc_cat_item',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-sc-cat-item-write'],
    status: 'allowed',
    operation: 'write',
    targetName: 'sc_cat_item',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-sc-cat-item-create'],
    status: 'allowed',
    operation: 'create',
    targetName: 'sc_cat_item',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-item-option-new-read'],
    status: 'allowed',
    operation: 'read',
    targetName: 'item_option_new',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-item-option-new-write'],
    status: 'allowed',
    operation: 'write',
    targetName: 'item_option_new',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-item-option-new-create'],
    status: 'allowed',
    operation: 'create',
    targetName: 'item_option_new',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-sys-user-group-read'],
    status: 'allowed',
    operation: 'read',
    targetName: 'sys_user_group',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-sys-user-group-write'],
    status: 'allowed',
    operation: 'write',
    targetName: 'sys_user_group',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-sys-user-group-create'],
    status: 'allowed',
    operation: 'create',
    targetName: 'sys_user_group',
    targetScope: 'global',
    targetType: 'sys_db_object',
})

CrossScopePrivilege({
    $id: Now.ID['csp-metadata-writer-execute'],
    status: 'allowed',
    operation: 'execute',
    targetName: 'SyncBridgeMetadataWrite',
    targetScope: 'global',
    targetType: 'sys_script_include',
})
