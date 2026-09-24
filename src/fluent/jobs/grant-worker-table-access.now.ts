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
            'Assign x_33764_sbridge.worker to the integration user, log whether operator is present, open cross-scope read/create/update on the four metadata tables, and publish SyncBridgeMetadataWrite into the global scope.',
        before: false,
        unloadable: true,
        record_for_rollback: true,
        script: Now.include('../../scripts/jobs/grant-worker-table-access.js'),
    },
})
