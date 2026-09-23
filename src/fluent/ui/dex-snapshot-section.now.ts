import { Record } from '@servicenow/sdk/core'

/**
 * Configuration Snapshot is installed as its own section records, not only as a
 * Form() section. 0.2.0/0.2.1 declared the section inside Form(), which kept the
 * poisoned sys_id 4568c2f0 and left an author-elective delete for the Phase 1
 * caption "Configuration snapshot". That delete matches the new caption on a
 * case-insensitive instance and removes the section after it is inserted.
 *
 * These records use stable Now.ID keys that are never marked deleted. The form
 * link targets the existing Default-view form so an instance that already has
 * Header, Scope, Counts, Timeline, and Notes gains this section between
 * Timeline (position 3) and Notes (position 5).
 */

const dexSnapshotSection = Record({
    $id: Now.ID['dex-snapshot-section'],
    table: 'sys_ui_section',
    data: {
        name: 'x_33764_sbridge_data_execution',
        caption: 'Configuration Snapshot',
        view: 'Default view',
        sys_domain: 'global',
        header: false,
        title: false,
    },
})

Record({
    $id: Now.ID['dex-snapshot-element'],
    table: 'sys_ui_element',
    data: {
        sys_ui_section: dexSnapshotSection,
        element: 'config_snapshot',
        position: 0,
    },
})

Record({
    $id: Now.ID['dex-snapshot-run-element'],
    table: 'sys_ui_element',
    data: {
        sys_ui_section: dexSnapshotSection,
        element: 'run',
        position: 1,
    },
})

Record({
    $id: Now.ID['dex-snapshot-form-link'],
    table: 'sys_ui_form_section',
    data: {
        sys_ui_form: 'a39c161c38d7471dbf6001749a463750',
        sys_ui_section: dexSnapshotSection,
        position: 4,
    },
})
