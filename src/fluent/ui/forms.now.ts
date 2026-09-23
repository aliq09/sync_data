import { Form, default_view } from '@servicenow/sdk/core'

Form({
    table: 'x_33764_sbridge_peer',
    view: default_view,
    sections: [
        {
            caption: 'Identity',
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
