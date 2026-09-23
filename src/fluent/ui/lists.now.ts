import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_33764_sbridge_peer',
    view: default_view,
    columns: ['name', 'role', 'active', 'base_url', 'last_successful_drain', 'last_error'],
})

List({
    table: 'x_33764_sbridge_policy',
    view: default_view,
    columns: ['active', 'table', 'direction', 'peer', 'owner_peer', 'movement_config', 'capture_ready', 'mode'],
})

List({
    table: 'x_33764_sbridge_outbox',
    view: default_view,
    columns: ['state', 'peer', 'table', 'op', 'source_sys_id', 'attempts', 'mode', 'sys_created_on'],
})

List({
    table: 'x_33764_sbridge_run',
    view: default_view,
    columns: ['type', 'peer', 'started', 'ended', 'processed', 'failed'],
})

List({
    table: 'x_33764_sbridge_dlq',
    view: default_view,
    columns: ['resolved', 'outbox_ref', 'error', 'sys_created_on'],
})

List({
    table: 'x_33764_sbridge_xref',
    view: default_view,
    columns: ['peer', 'source_table', 'source_sys_id', 'target_sys_id'],
})

List({
    table: 'x_33764_sbridge_receipt',
    view: default_view,
    columns: ['peer', 'source_sys_id', 'target_sys_id', 'last_seq'],
})

List({
    table: 'x_33764_sbridge_test_record',
    view: default_view,
    columns: ['name', 'value', 'owner', 'sys_updated_on'],
})

List({
    table: 'x_33764_sbridge_movement_config',
    view: default_view,
    columns: ['name', 'active', 'direction', 'source_table', 'target_table', 'source_instance', 'target_instance', 'policy'],
})

List({
    table: 'x_33764_sbridge_data_execution',
    view: default_view,
    columns: [
        'number',
        'configuration',
        'execution_state',
        'execution_result',
        'selected_count',
        'sent_count',
        'failed_count',
        'started_at',
        'execution_completed_at',
    ],
})

List({
    table: 'x_33764_sbridge_transfer',
    view: default_view,
    columns: [
        'number',
        'stage',
        'transport_status',
        'execution',
        'source_table',
        'operation',
        'correlation_id',
        'http_status',
        'attempts',
    ],
})

List({
    table: 'x_33764_sbridge_transfer_audit',
    view: default_view,
    columns: [
        'direction',
        'message_type',
        'result',
        'correlation_id',
        'source_table',
        'source_sys_id',
        'http_status',
        'sent_at',
        'remote_received_at',
    ],
})

List({
    table: 'x_33764_sbridge_processing_error',
    view: default_view,
    columns: ['resolved', 'source_table', 'source_sys_id', 'error', 'execution', 'transfer', 'sys_created_on'],
})

List({
    table: 'x_33764_sbridge_record_result',
    view: default_view,
    columns: ['source_table', 'source_sys_id', 'action', 'result', 'target_sys_id', 'execution'],
})
