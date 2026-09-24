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
 * the 0.4.3 body change. Does not grant admin.
 */
Record({
    $id: Now.ID['fix-install-global-metadata-writer'],
    table: 'sys_script_fix',
    data: {
        name: 'Install global SyncBridgeMetadataWrite',
        description:
            '0.4.4. Publish SyncBridgeMetadataWrite into Global. Does not grant admin.',
        before: false,
        unloadable: false,
        record_for_rollback: true,
        script: Now.include('../../scripts/jobs/grant-worker-table-access.js'),
    },
})

/**
 * 0.4.4's "Install global SyncBridgeMetadataWrite" already ran on the PDIs
 * and will not run again. This new record publishes via the Table API
 * (sysparm_transaction_scope=global) instead of UpdateManager2.
 */
Record({
    $id: Now.ID['fix-publish-global-metadata-writer'],
    table: 'sys_script_fix',
    data: {
        name: 'Publish global SyncBridgeMetadataWrite',
        description:
            '0.4.5. Publish SyncBridgeMetadataWrite into Global with the Table API transaction scope. Does not use UpdateManager2. Does not grant admin.',
        before: false,
        unloadable: true,
        record_for_rollback: true,
        script: Now.include('../../scripts/jobs/grant-worker-table-access.js'),
    },
})

/**
 * 0.4.6 had no new fix script, so an instance that already ran the
 * metadata publisher will not re-run it. This record only opens
 * application access for the software-instance insert. It does not grant
 * admin and it does not publish the metadata writer again.
 */
Record({
    $id: Now.ID['fix-open-software-instance-access'],
    table: 'sys_script_fix',
    data: {
        name: 'Open software instance application access',
        description:
            '0.4.7. Open cross-scope read/create/update on cmdb_software_instance and cmdb_ci_spkg. Does not grant admin. Does not use cmdb_sam_sw_install.',
        before: false,
        unloadable: true,
        record_for_rollback: true,
        script: Now.include('../../scripts/jobs/open-software-instance-access.js'),
    },
})

/**
 * 0.4.8 did not add a fix script, so an instance that already opened
 * application access will not run that record again. This publishes the
 * global software-instance insert. It does not grant admin.
 */
Record({
    $id: Now.ID['fix-publish-global-software-writer'],
    table: 'sys_script_fix',
    data: {
        name: 'Publish global SyncBridgeSoftwareWrite',
        description:
            '0.4.9. Publish SyncBridgeSoftwareWrite into Global for cmdb_software_instance inserts as the integration user. Does not grant admin. Does not use UpdateManager2 or cmdb_sam_sw_install.',
        before: false,
        unloadable: true,
        record_for_rollback: true,
        script: Now.include('../../scripts/jobs/publish-software-writer.js'),
    },
})

/**
 * 0.4.9's publisher already ran on both PDIs and will not run again.
 * This new record republishes SyncBridgeSoftwareWrite with update().
 * It does not grant admin and it does not republish the metadata writer.
 */
Record({
    $id: Now.ID['fix-republish-software-writer-update'],
    table: 'sys_script_fix',
    data: {
        name: 'Republish SyncBridgeSoftwareWrite update',
        description:
            '0.5.1. Republish global.SyncBridgeSoftwareWrite with update for cmdb_software_instance. Same session token, no admin grant. Confirm the log line software writer callable as global.SyncBridgeSoftwareWrite update=yes.',
        before: false,
        unloadable: true,
        record_for_rollback: true,
        script: Now.include('../../scripts/jobs/publish-software-writer.js'),
    },
})
