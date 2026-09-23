import { UiPolicy } from '@servicenow/sdk/core'

/**
 * Once a data execution leaves Draft, the workspace fields are system-owned.
 * Work notes and additional comments stay editable.
 * Acknowledgement columns stay on the form and empty; they are not hidden.
 */
UiPolicy({
    $id: Now.ID['uip-dex-lock'],
    table: 'x_33764_sbridge_data_execution',
    shortDescription: 'Lock a data execution after it leaves Draft',
    conditions: 'execution_state!=draft^execution_stateISNOTEMPTY',
    onLoad: true,
    reverseIfFalse: true,
    global: true,
    active: true,
    actions: [
        { field: 'number', readOnly: true },
        { field: 'name', readOnly: true },
        { field: 'configuration', readOnly: true },
        { field: 'execution_state', readOnly: true },
        { field: 'execution_result', readOnly: true },
        { field: 'initiated_by', readOnly: true },
        { field: 'source_instance', readOnly: true },
        { field: 'target_instance', readOnly: true },
        { field: 'source_table', readOnly: true },
        { field: 'target_table', readOnly: true },
        { field: 'filter_snapshot', readOnly: true },
        { field: 'selected_count', readOnly: true },
        { field: 'sent_count', readOnly: true },
        { field: 'received_count', readOnly: true },
        { field: 'inserted_count', readOnly: true },
        { field: 'updated_count', readOnly: true },
        { field: 'skipped_count', readOnly: true },
        { field: 'failed_count', readOnly: true },
        { field: 'acknowledged_count', readOnly: true },
        { field: 'started_at', readOnly: true },
        { field: 'source_read_completed_at', readOnly: true },
        { field: 'transfer_sent_at', readOnly: true },
        { field: 'target_received_at', readOnly: true },
        { field: 'target_processing_completed_at', readOnly: true },
        { field: 'acknowledged_at', readOnly: true },
        { field: 'transfer_completed_at', readOnly: true },
        { field: 'execution_completed_at', readOnly: true },
        { field: 'duration_seconds', readOnly: true },
        { field: 'config_snapshot', readOnly: true },
        { field: 'run', readOnly: true },
    ],
})

/**
 * Reserved staged-ACK columns on audit. Hidden while empty so the evidence
 * form does not look like Phase 3 already ran. They reappear once populated.
 */
UiPolicy({
    $id: Now.ID['uip-audit-hide-ack'],
    table: 'x_33764_sbridge_transfer_audit',
    shortDescription: 'Hide empty staged acknowledgement fields',
    conditions: 'ack_stageISEMPTY^acknowledged_atISEMPTY^remote_audit_idISEMPTY',
    onLoad: true,
    reverseIfFalse: true,
    global: true,
    active: true,
    actions: [
        { field: 'ack_stage', visible: false },
        { field: 'acknowledged_at', visible: false },
        { field: 'remote_audit_id', visible: false },
    ],
})
