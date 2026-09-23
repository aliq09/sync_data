import { Record } from '@servicenow/sdk/core'

/**
 * Classic related lists for the Data Execution record page (Default view).
 * Embedded form lists are not used — those write sys_ui_element, not the related-list tab.
 *
 * Order: Transfers, Record Results, Transfer Audits, Processing Errors, Record Mappings.
 * Mappings have no execution reference, so they use a relationship scoped to this
 * execution's source table and target instance.
 */

const dexRelated = Record({
    $id: Now.ID['dex-related-list'],
    table: 'sys_ui_related_list',
    data: {
        name: 'x_33764_sbridge_data_execution',
        view: 'Default view',
    },
})

Record({
    $id: Now.ID['dex-rel-transfers'],
    table: 'sys_ui_related_list_entry',
    data: {
        list_id: dexRelated,
        position: 0,
        related_list: 'x_33764_sbridge_transfer.execution',
        order_by: 'number',
    },
})

Record({
    $id: Now.ID['dex-rel-record-results'],
    table: 'sys_ui_related_list_entry',
    data: {
        list_id: dexRelated,
        position: 1,
        related_list: 'x_33764_sbridge_record_result.execution',
        order_by: 'sys_created_on',
    },
})

Record({
    $id: Now.ID['dex-rel-audit'],
    table: 'sys_ui_related_list_entry',
    data: {
        list_id: dexRelated,
        position: 2,
        related_list: 'x_33764_sbridge_transfer_audit.execution',
        order_by: 'sys_created_on',
    },
})

Record({
    $id: Now.ID['dex-rel-errors'],
    table: 'sys_ui_related_list_entry',
    data: {
        list_id: dexRelated,
        position: 3,
        related_list: 'x_33764_sbridge_processing_error.execution',
        order_by: 'sys_created_on',
    },
})

const dexMappings = Record({
    $id: Now.ID['dex-rel-mappings'],
    table: 'sys_relationship',
    data: {
        name: 'Record Mappings',
        advanced: false,
        simple_reference: false,
        basic_apply_to: 'x_33764_sbridge_data_execution',
        basic_query_from: 'x_33764_sbridge_xref',
        query_with: `(function refineQuery(current, parent) {
    var tableName = parent.getValue('source_table');
    var peerId = parent.getValue('target_instance');
    if (!tableName) {
        current.addQuery('sys_id', '-1');
        return;
    }
    current.addQuery('source_table', tableName);
    if (peerId) current.addQuery('peer', peerId);
})(current, parent);`,
    },
})

Record({
    $id: Now.ID['dex-rel-mappings-entry'],
    table: 'sys_ui_related_list_entry',
    data: {
        list_id: dexRelated,
        position: 4,
        related_list: `REL:${dexMappings.$id}`,
    },
})

const configRelated = Record({
    $id: Now.ID['mvcfg-related-list'],
    table: 'sys_ui_related_list',
    data: {
        name: 'x_33764_sbridge_movement_config',
        view: 'Default view',
    },
})

Record({
    $id: Now.ID['mvcfg-rel-executions'],
    table: 'sys_ui_related_list_entry',
    data: {
        list_id: configRelated,
        position: 0,
        related_list: 'x_33764_sbridge_data_execution.configuration',
        order_by: 'sys_created_on',
    },
})

Record({
    $id: Now.ID['mvcfg-rel-schedules'],
    table: 'sys_ui_related_list_entry',
    data: {
        list_id: configRelated,
        position: 1,
        related_list: 'x_33764_sbridge_execution_schedule.configuration',
        order_by: 'number',
    },
})
