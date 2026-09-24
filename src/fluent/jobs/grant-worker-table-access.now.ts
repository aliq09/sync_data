import { Record } from '@servicenow/sdk/core'

/**
 * After roles, ACLs, and cross-scope privileges load, assign worker to
 * the integration user and open read/create/update on the global tables
 * apply writes. before=false so those records exist first.
 */
Record({
    $id: Now.ID['fix-grant-worker-table-access'],
    table: 'sys_script_fix',
    data: {
        name: 'Grant worker metadata access',
        description:
            'Assign x_33764_sbridge.worker to the integration user and allow cross-scope read, create, and update on sys_script, sc_cat_item, item_option_new, and sys_user_group.',
        before: false,
        unloadable: false,
        record_for_rollback: true,
        script: Now.include('../../scripts/jobs/grant-worker-table-access.js'),
    },
})
