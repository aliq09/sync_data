import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { reader, operator, admin } from '../roles/roles.now'

const menu = ApplicationMenu({
    $id: Now.ID['sync-bridge-menu'],
    title: 'Sync Bridge',
    hint: 'Replicate records between ServiceNow instances',
    description:
        'Configure peer instances and sync policies. Monitor the outbound queue, sync runs, and failed deliveries.',
    roles: [reader, operator, admin],
    active: true,
    order: 100,
})

Record({
    $id: Now.ID['mod-sep-configuration'],
    table: 'sys_app_module',
    data: {
        title: 'Configuration',
        application: menu,
        link_type: 'SEPARATOR',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 100,
    },
})

Record({
    $id: Now.ID['mod-peers'],
    table: 'sys_app_module',
    data: {
        title: 'Peer instances',
        hint: 'Local + remote instances this bridge talks to',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_peer',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 110,
    },
})

Record({
    $id: Now.ID['mod-policies'],
    table: 'sys_app_module',
    data: {
        title: 'Sync policies',
        hint: 'Which tables sync, direction, fields, filter',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_policy',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 120,
    },
})

Record({
    $id: Now.ID['mod-sep-operations'],
    table: 'sys_app_module',
    data: {
        title: 'Operations',
        application: menu,
        link_type: 'SEPARATOR',
        roles: ['x_33764_sbridge.operator'],
        active: true,
        order: 200,
    },
})

Record({
    $id: Now.ID['mod-outbox'],
    table: 'sys_app_module',
    data: {
        title: 'Outbound queue',
        hint: 'Pending / sent change and seed payloads',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_outbox',
        roles: ['x_33764_sbridge.operator'],
        active: true,
        order: 210,
    },
})

Record({
    $id: Now.ID['mod-runs'],
    table: 'sys_app_module',
    data: {
        title: 'Sync runs',
        hint: 'Drain / bulk seed execution history',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_run',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 220,
    },
})

Record({
    $id: Now.ID['mod-dlq'],
    table: 'sys_app_module',
    data: {
        title: 'Failed deliveries',
        hint: 'Dead-lettered messages',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_dlq',
        roles: ['x_33764_sbridge.operator'],
        active: true,
        order: 230,
    },
})

Record({
    $id: Now.ID['mod-sep-traceability'],
    table: 'sys_app_module',
    data: {
        title: 'Traceability',
        application: menu,
        link_type: 'SEPARATOR',
        roles: ['x_33764_sbridge.operator'],
        active: true,
        order: 300,
    },
})

Record({
    $id: Now.ID['mod-xref'],
    table: 'sys_app_module',
    data: {
        title: 'Record mappings',
        hint: 'Source sys_id to target sys_id per peer',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_xref',
        roles: ['x_33764_sbridge.operator'],
        active: true,
        order: 310,
    },
})

Record({
    $id: Now.ID['mod-receipts'],
    table: 'sys_app_module',
    data: {
        title: 'Delivery receipts',
        hint: 'Last applied sequence per source record',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_receipt',
        roles: ['x_33764_sbridge.operator'],
        active: true,
        order: 320,
    },
})

Record({
    $id: Now.ID['mod-sep-lab'],
    table: 'sys_app_module',
    data: {
        title: 'Lab',
        application: menu,
        link_type: 'SEPARATOR',
        roles: ['x_33764_sbridge.operator'],
        active: true,
        order: 400,
    },
})

Record({
    $id: Now.ID['mod-test'],
    table: 'sys_app_module',
    data: {
        title: 'Lab test records',
        hint: 'Safe practice table; not for production data',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_test_record',
        roles: ['x_33764_sbridge.operator'],
        active: true,
        order: 410,
    },
})
