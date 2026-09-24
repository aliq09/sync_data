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

/**
 * New sys_id so an instance that already ran "Grant worker metadata access"
 * on 0.4.3 runs the publisher again. That record may not re-execute after
 * the 0.4.3 body change. This script calls the same loadXML / moveMetadata
 * publisher. It does not grant admin.
 */
Record({
    $id: Now.ID['fix-install-global-metadata-writer'],
    table: 'sys_script_fix',
    data: {
        name: 'Install global SyncBridgeMetadataWrite',
        description:
            '0.4.4. Create or move SyncBridgeMetadataWrite into the Global application so apply can call global.SyncBridgeMetadataWrite. Does not grant admin.',
        before: false,
        unloadable: false,
        record_for_rollback: true,
        script: Now.include('../../scripts/jobs/grant-worker-table-access.js'),
    },
})
