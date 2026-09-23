import { Form, default_view } from '@servicenow/sdk/core'

Form({
    table: 'x_33764_sbridge_peer',
    view: default_view,
    sections: [
        {
            caption: 'Instance',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'name', type: 'table_field' },
                        { field: 'role', type: 'table_field' },
                        { field: 'active', type: 'table_field' },
                        { field: 'base_url', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Authentication',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'connection_alias', type: 'table_field' },
                        { field: 'oauth_profile', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Monitoring',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'last_successful_drain', type: 'table_field' },
                        { field: 'last_error', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_policy',
    view: default_view,
    sections: [
        {
            caption: 'What to sync',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'active', type: 'table_field' },
                        { field: 'table', type: 'table_field' },
                        { field: 'direction', type: 'table_field' },
                        { field: 'condition', type: 'table_field' },
                        { field: 'field_list', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Where',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'peer', type: 'table_field' },
                        { field: 'owner_peer', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Apply behaviour',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'mode', type: 'table_field' },
                        { field: 'preserve_sys_id', type: 'table_field' },
                        { field: 'propagate_deletes', type: 'table_field' },
                        { field: 'capture_ready', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Advanced mapping',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'target_table', type: 'table_field' },
                        { field: 'ref_map', type: 'table_field' },
                        { field: 'target_map', type: 'table_field' },
                        { field: 'movement_config', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_outbox',
    view: default_view,
    sections: [
        {
            caption: 'Routing',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'peer', type: 'table_field' },
                        { field: 'table', type: 'table_field' },
                        { field: 'state', type: 'table_field' },
                        { field: 'mode', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Record',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'source_sys_id', type: 'table_field' },
                        { field: 'op', type: 'table_field' },
                        { field: 'seq', type: 'table_field' },
                        { field: 'attempts', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Payload',
            content: [
                {
                    layout: 'one-column',
                    elements: [{ field: 'payload', type: 'table_field' }],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_run',
    view: default_view,
    sections: [
        {
            caption: 'Run',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'type', type: 'table_field' },
                        { field: 'peer', type: 'table_field' },
                        { field: 'started', type: 'table_field' },
                        { field: 'ended', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Results',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'processed', type: 'table_field' },
                        { field: 'failed', type: 'table_field' },
                        { field: 'max_lag_seconds', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Seed',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'seed_policy', type: 'table_field' },
                        { field: 'seed_cursor', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_dlq',
    view: default_view,
    sections: [
        {
            caption: 'Status',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'resolved', type: 'table_field' },
                        { field: 'outbox_ref', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Detail',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'error', type: 'table_field' },
                        { field: 'payload', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_xref',
    view: default_view,
    sections: [
        {
            caption: 'Mapping',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'peer', type: 'table_field' },
                        { field: 'source_table', type: 'table_field' },
                        { field: 'source_sys_id', type: 'table_field' },
                        { field: 'target_sys_id', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_receipt',
    view: default_view,
    sections: [
        {
            caption: 'Receipt',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'peer', type: 'table_field' },
                        { field: 'source_sys_id', type: 'table_field' },
                        { field: 'target_sys_id', type: 'table_field' },
                        { field: 'last_seq', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_test_record',
    view: default_view,
    sections: [
        {
            caption: 'Identity',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'name', type: 'table_field' },
                        { field: 'value', type: 'table_field' },
                        { field: 'owner', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Detail',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'description', type: 'table_field' },
                        { field: 'notes', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_movement_config',
    view: default_view,
    sections: [
        {
            caption: 'General',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'name', type: 'table_field' },
                        { field: 'active', type: 'table_field' },
                        { field: 'direction', type: 'table_field' },
                        { field: 'description', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Source',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'source_instance', type: 'table_field' },
                        { field: 'source_table', type: 'table_field' },
                        { field: 'filter', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Target',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'target_instance', type: 'table_field' },
                        { field: 'target_table', type: 'table_field' },
                        { field: 'operation', type: 'table_field' },
                        { field: 'apply_mode', type: 'table_field' },
                        { field: 'match_strategy', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Transfer behaviour',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'field_list', type: 'table_field' },
                        { field: 'reference_handling', type: 'table_field' },
                        { field: 'preserve_sys_id', type: 'table_field' },
                        { field: 'propagate_deletes', type: 'table_field' },
                        { field: 'batch_size', type: 'table_field' },
                        { field: 'policy', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Activity',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'work_notes', type: 'table_field' },
                        { field: 'comments', type: 'table_field' },
                        { type: 'formatter', formatterRef: 'Activities_Filtered' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_data_execution',
    view: default_view,
    sections: [
        {
            caption: 'Header',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'number', type: 'table_field' },
                        { field: 'configuration', type: 'table_field' },
                        { field: 'execution_state', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'name', type: 'table_field' },
                        { field: 'execution_result', type: 'table_field' },
                        { field: 'initiated_by', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Scope',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'source_instance', type: 'table_field' },
                        { field: 'source_table', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'target_instance', type: 'table_field' },
                        { field: 'target_table', type: 'table_field' },
                    ],
                },
                {
                    layout: 'one-column',
                    elements: [{ field: 'filter_snapshot', type: 'table_field' }],
                },
            ],
        },
        {
            caption: 'Counts',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'selected_count', type: 'table_field' },
                        { field: 'received_count', type: 'table_field' },
                        { field: 'updated_count', type: 'table_field' },
                        { field: 'failed_count', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'sent_count', type: 'table_field' },
                        { field: 'inserted_count', type: 'table_field' },
                        { field: 'skipped_count', type: 'table_field' },
                        { field: 'acknowledged_count', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Timeline',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'started_at', type: 'table_field' },
                        { field: 'source_read_completed_at', type: 'table_field' },
                        { field: 'transfer_sent_at', type: 'table_field' },
                        { field: 'target_received_at', type: 'table_field' },
                        { field: 'target_processing_completed_at', type: 'table_field' },
                        { field: 'acknowledged_at', type: 'table_field' },
                        { field: 'transfer_completed_at', type: 'table_field' },
                        { field: 'execution_completed_at', type: 'table_field' },
                        { field: 'duration_seconds', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Configuration Snapshot',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            type: 'annotation',
                            annotationId: Now.ID['dex-snapshot-note'],
                            text: 'Frozen when the execution started. Later configuration edits do not change this JSON. Acknowledgement time and count stay empty until a later phase.',
                            isPlainText: true,
                        },
                        { field: 'config_snapshot', type: 'table_field' },
                        { field: 'run', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Notes',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'work_notes', type: 'table_field' },
                        { field: 'comments', type: 'table_field' },
                        { type: 'formatter', formatterRef: 'Activities_Filtered' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_transfer',
    view: default_view,
    sections: [
        {
            caption: 'Transfer',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'number', type: 'table_field' },
                        { field: 'execution', type: 'table_field' },
                        { field: 'stage', type: 'table_field' },
                        { field: 'transport_status', type: 'table_field' },
                        { field: 'correlation_id', type: 'table_field' },
                        { field: 'http_status', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Record',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'source_instance', type: 'table_field' },
                        { field: 'target_instance', type: 'table_field' },
                        { field: 'source_table', type: 'table_field' },
                        { field: 'source_sys_id', type: 'table_field' },
                        { field: 'operation', type: 'table_field' },
                        { field: 'record_count', type: 'table_field' },
                        { field: 'attempts', type: 'table_field' },
                        { field: 'outbox', type: 'table_field' },
                        { field: 'error', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_transfer_audit',
    view: default_view,
    sections: [
        {
            caption: 'Evidence',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'direction', type: 'table_field' },
                        { field: 'message_type', type: 'table_field' },
                        { field: 'result', type: 'table_field' },
                        { field: 'correlation_id', type: 'table_field' },
                        { field: 'ack_stage', type: 'table_field' },
                        { field: 'transaction_id', type: 'table_field' },
                        { field: 'sequence', type: 'table_field' },
                        { field: 'record_count', type: 'table_field' },
                        { field: 'payload_hash', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Parties',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'local_instance', type: 'table_field' },
                        { field: 'remote_instance', type: 'table_field' },
                        { field: 'source_table', type: 'table_field' },
                        { field: 'source_sys_id', type: 'table_field' },
                        { field: 'target_sys_id', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Timing',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'sent_at', type: 'table_field' },
                        { field: 'remote_received_at', type: 'table_field' },
                        { field: 'acknowledged_at', type: 'table_field' },
                        { field: 'http_status', type: 'table_field' },
                        { field: 'retry_count', type: 'table_field' },
                        { field: 'error', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Links',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'execution', type: 'table_field' },
                        { field: 'transfer', type: 'table_field' },
                        { field: 'outbox', type: 'table_field' },
                        { field: 'receipt', type: 'table_field' },
                        { field: 'remote_audit_id', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_processing_error',
    view: default_view,
    sections: [
        {
            caption: 'Error',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'resolved', type: 'table_field' },
                        { field: 'error', type: 'table_field' },
                        { field: 'source_table', type: 'table_field' },
                        { field: 'source_sys_id', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Links',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'execution', type: 'table_field' },
                        { field: 'transfer', type: 'table_field' },
                        { field: 'dlq', type: 'table_field' },
                        { field: 'payload', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

Form({
    table: 'x_33764_sbridge_record_result',
    view: default_view,
    sections: [
        {
            caption: 'Result',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'execution', type: 'table_field' },
                        { field: 'transfer', type: 'table_field' },
                        { field: 'source_table', type: 'table_field' },
                        { field: 'source_sys_id', type: 'table_field' },
                        { field: 'target_sys_id', type: 'table_field' },
                        { field: 'action', type: 'table_field' },
                        { field: 'result', type: 'table_field' },
                        { field: 'error', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})
