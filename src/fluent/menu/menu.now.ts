import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { reader, operator, admin, diagnostics } from '../roles/roles.now'

const menu = ApplicationMenu({
    $id: Now.ID['sync-bridge-menu'],
    title: 'Sync Bridge',
    hint: 'Move records between ServiceNow instances',
    description:
        'Data movement configurations and executions. Monitor transfers, failures, and audit. Case 1 outbox drain stays available under Developer / Diagnostics.',
    roles: [reader, operator, admin, diagnostics],
    active: true,
    order: 100,
})

Record({
    $id: Now.ID['mod-overview'],
    table: 'sys_app_module',
    data: {
        title: 'Overview',
        hint: 'In-flight data executions with a configuration',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_data_execution',
        filter: 'configurationISNOTEMPTY^execution_state!=completed^execution_state!=cancelled',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 10,
    },
})

Record({
    $id: Now.ID['mod-sep-configuration'],
    table: 'sys_app_module',
    data: {
        title: 'Data Movement',
        application: menu,
        link_type: 'SEPARATOR',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 100,
    },
})

Record({
    $id: Now.ID['mod-configurations'],
    table: 'sys_app_module',
    data: {
        title: 'Configurations',
        hint: 'What should move between instances',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_movement_config',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 110,
    },
})

Record({
    $id: Now.ID['mod-schedules'],
    table: 'sys_app_module',
    data: {
        title: 'Schedules',
        hint: 'When a configuration should run (SCH)',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_execution_schedule',
        roles: ['x_33764_sbridge.admin'],
        active: true,
        order: 115,
    },
})

Record({
    $id: Now.ID['mod-executions'],
    table: 'sys_app_module',
    data: {
        title: 'Data Executions',
        hint: 'One execution of a configuration (DEX). Empty configuration rows are hidden.',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_data_execution',
        filter: 'configurationISNOTEMPTY',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 120,
    },
})

Record({
    $id: Now.ID['mod-orphan-executions'],
    table: 'sys_app_module',
    data: {
        title: 'Orphan executions',
        hint: 'Badge for admins: configurationISEMPTY rows are not successful movements. Review only — Sync Bridge does not delete them.',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_data_execution',
        filter: 'configurationISEMPTY',
        roles: ['x_33764_sbridge.admin'],
        active: true,
        order: 122,
    },
})

Record({
    $id: Now.ID['mod-sep-operations'],
    table: 'sys_app_module',
    data: {
        title: 'Monitoring',
        application: menu,
        link_type: 'SEPARATOR',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 200,
    },
})

Record({
    $id: Now.ID['mod-transfers'],
    table: 'sys_app_module',
    data: {
        title: 'Transfers',
        hint: 'Payloads under a data execution (TRN)',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_transfer',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 210,
    },
})

Record({
    $id: Now.ID['mod-failed'],
    table: 'sys_app_module',
    data: {
        title: 'Failed Transfers',
        hint: 'Processing errors shadowed from dead-letter rows',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_processing_error',
        roles: ['x_33764_sbridge.operator'],
        active: true,
        order: 220,
    },
})

Record({
    $id: Now.ID['mod-audit'],
    table: 'sys_app_module',
    data: {
        title: 'Audit',
        hint: 'Send and receive evidence for a transfer',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_transfer_audit',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 230,
    },
})

Record({
    $id: Now.ID['mod-sep-traceability'],
    table: 'sys_app_module',
    data: {
        title: 'Administration',
        application: menu,
        link_type: 'SEPARATOR',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 300,
    },
})

Record({
    $id: Now.ID['mod-peers'],
    table: 'sys_app_module',
    data: {
        title: 'Instances',
        hint: 'Local and remote instances this bridge talks to',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_peer',
        roles: ['x_33764_sbridge.reader'],
        active: true,
        order: 310,
    },
})

Record({
    $id: Now.ID['mod-connections'],
    table: 'sys_app_module',
    data: {
        title: 'Connections',
        hint: 'Connection and credential aliases. Secrets stay in the credential store.',
        application: menu,
        link_type: 'LIST',
        name: 'sys_alias',
        roles: ['x_33764_sbridge.admin'],
        active: true,
        order: 320,
    },
})

Record({
    $id: Now.ID['mod-xref'],
    table: 'sys_app_module',
    data: {
        title: 'Mappings',
        hint: 'Source sys_id to target sys_id per instance',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_xref',
        roles: ['x_33764_sbridge.admin'],
        active: true,
        order: 330,
    },
})

Record({
    $id: Now.ID['mod-settings'],
    table: 'sys_app_module',
    data: {
        title: 'Settings',
        hint: 'Sync Bridge system properties, including dual_write',
        application: menu,
        link_type: 'LIST',
        name: 'sys_properties',
        filter: 'nameSTARTSWITHx_33764_sbridge.',
        roles: ['x_33764_sbridge.admin'],
        active: true,
        order: 340,
    },
})

Record({
    $id: Now.ID['mod-sep-lab'],
    table: 'sys_app_module',
    data: {
        title: 'Developer / Diagnostics',
        application: menu,
        link_type: 'SEPARATOR',
        roles: ['x_33764_sbridge.diagnostics'],
        active: true,
        order: 800,
    },
})

Record({
    $id: Now.ID['mod-policies'],
    table: 'sys_app_module',
    data: {
        title: 'Sync policies',
        hint: 'Legacy Case 1 policies. Capture still reads these rows.',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_policy',
        roles: ['x_33764_sbridge.diagnostics'],
        active: true,
        order: 810,
    },
})

Record({
    $id: Now.ID['mod-runs'],
    table: 'sys_app_module',
    data: {
        title: 'Sync runs',
        hint: 'Legacy drain and bulk seed runs',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_run',
        roles: ['x_33764_sbridge.diagnostics'],
        active: true,
        order: 820,
    },
})

Record({
    $id: Now.ID['mod-outbox'],
    table: 'sys_app_module',
    data: {
        title: 'Payload inspector',
        hint: 'Case 1 outbound queue payloads. Drain behaviour is unchanged.',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_outbox',
        roles: ['x_33764_sbridge.diagnostics'],
        active: true,
        order: 830,
    },
})

Record({
    $id: Now.ID['mod-dlq'],
    table: 'sys_app_module',
    data: {
        title: 'Technical logs',
        hint: 'Legacy dead-letter rows. Operator failures are under Failed Transfers.',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_dlq',
        roles: ['x_33764_sbridge.diagnostics'],
        active: true,
        order: 840,
    },
})

Record({
    $id: Now.ID['mod-receipts'],
    table: 'sys_app_module',
    data: {
        title: 'Legacy receipt rows',
        hint: 'Case 1 delivery receipts. Operator evidence is under Audit.',
        application: menu,
        link_type: 'LIST',
        name: 'x_33764_sbridge_receipt',
        roles: ['x_33764_sbridge.diagnostics'],
        active: true,
        order: 850,
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
        roles: ['x_33764_sbridge.diagnostics'],
        active: true,
        order: 860,
    },
})

Record({
    $id: Now.ID['mod-api-diagnostics'],
    table: 'sys_app_module',
    data: {
        title: 'API diagnostics',
        hint: 'Scripted REST API for /apply, /seed, /executions, and /ensure_capture',
        application: menu,
        link_type: 'LIST',
        name: 'sys_ws_definition',
        filter: 'service_id=sync',
        roles: ['x_33764_sbridge.diagnostics'],
        active: true,
        order: 870,
    },
})
