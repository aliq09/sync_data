import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { reader, operator, admin } from '../roles/roles.now'

const menu = ApplicationMenu({
    $id: Now.ID['sync-bridge-menu'],
    title: 'Sync Bridge',
    hint: 'Peer sync outbox bridge',
    description: 'Capture → outbox → drain → peer apply',
    roles: [reader, operator, admin],
    active: true,
    order: 100,
})

Record({
    $id: Now.ID['mod-peers'],
    table: 'sys_app_module',
    data: {
        title: 'Peers',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_peer',
        roles: [reader],
        active: true,
        order: 100,
    },
})

Record({
    $id: Now.ID['mod-policies'],
    table: 'sys_app_module',
    data: {
        title: 'Policies',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_policy',
        roles: [reader],
        active: true,
        order: 200,
    },
})

Record({
    $id: Now.ID['mod-runs'],
    table: 'sys_app_module',
    data: {
        title: 'Runs',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_run',
        roles: [reader],
        active: true,
        order: 300,
    },
})

Record({
    $id: Now.ID['mod-outbox'],
    table: 'sys_app_module',
    data: {
        title: 'Outbox',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_outbox',
        roles: [operator],
        active: true,
        order: 400,
    },
})

Record({
    $id: Now.ID['mod-dlq'],
    table: 'sys_app_module',
    data: {
        title: 'DLQ',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_dlq',
        roles: [operator],
        active: true,
        order: 500,
    },
})

Record({
    $id: Now.ID['mod-xref'],
    table: 'sys_app_module',
    data: {
        title: 'Xref',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_xref',
        roles: [operator],
        active: true,
        order: 600,
    },
})

Record({
    $id: Now.ID['mod-receipts'],
    table: 'sys_app_module',
    data: {
        title: 'Receipts',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_receipt',
        roles: [operator],
        active: true,
        order: 700,
    },
})

Record({
    $id: Now.ID['mod-test'],
    table: 'sys_app_module',
    data: {
        title: 'Test records',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_test_record',
        roles: [operator],
        active: true,
        order: 800,
    },
})
