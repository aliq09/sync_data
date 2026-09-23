import { Record } from '@servicenow/sdk/core'

/**
 * After the application files load, create the Configuration Snapshot
 * section if the form metadata update did not leave it on the instance.
 * PDI1 and PDI2 both applied Header, Scope, Counts, Timeline, and Notes
 * (Notes already at position 5) and skipped this section.
 */
Record({
    $id: Now.ID['fix-dex-snapshot-section'],
    table: 'sys_script_fix',
    data: {
        name: 'Place DEX snapshot section',
        description:
            'Insert the Data Execution Configuration Snapshot section, config_snapshot, run, and the Default form link when upgrade skipped that metadata.',
        before: false,
        unloadable: false,
        record_for_rollback: true,
        script: Now.include('../../scripts/jobs/place-dex-snapshot-section.js'),
    },
})
