import { Record } from '@servicenow/sdk/core'

/**
 * Engine metadata only. These rows define the Case 1 DETAILED related pack.
 * They are not platform CI rows. Flow members are not seeded.
 */
const case1Pack = Record({
    $id: Now.ID['pack-case1-comp-detailed'],
    table: 'x_33764_sbridge_movement_pack',
    data: {
        name: 'Case 1 DETAILED — Computer related pack',
        active: true,
        version_note: '0.5.0',
        root_table: 'cmdb_ci_computer',
        root_filter: 'nameSTARTSWITHCASE1-COMP-DETAILED',
        description:
            'One Execute Now expands CASE1-COMP-DETAILED computers and the allow-listed related tables. Order is computer, shared CASE1-SW packages, NIC, serial, storage, memory, software instance, file system, process, tcp, then cmdb_rel_ci. Platform CI rows stay on the source instance. Flow is not part of this pack.',
    },
})

Record({
    $id: Now.ID['pack-m-case1-computer'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'Computer',
        active: true,
        apply_order: 10,
        source_table: 'cmdb_ci_computer',
        graph_kind: 'record',
        expand_mode: 'root_filter',
        id_scope: 'none',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-spkg'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'Software package',
        active: true,
        apply_order: 20,
        source_table: 'cmdb_ci_spkg',
        graph_kind: 'record',
        expand_mode: 'encoded_query',
        expand_query: 'nameSTARTSWITHCASE1-SW-',
        id_scope: 'none',
        field_list: 'name,version,key,manufacturer,short_description',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-nic'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'Network adapter',
        active: true,
        apply_order: 30,
        source_table: 'cmdb_ci_network_adapter',
        graph_kind: 'record',
        expand_mode: 'parent_in',
        parent_field: 'cmdb_ci',
        id_scope: 'roots',
        fk_remap_fields: 'cmdb_ci',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-serial'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'Serial number',
        active: true,
        apply_order: 40,
        source_table: 'cmdb_serial_number',
        graph_kind: 'record',
        expand_mode: 'parent_in',
        parent_field: 'cmdb_ci',
        id_scope: 'roots',
        fk_remap_fields: 'cmdb_ci',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-storage'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'Storage device',
        active: true,
        apply_order: 50,
        source_table: 'cmdb_ci_storage_device',
        graph_kind: 'record',
        expand_mode: 'parent_in',
        parent_field: 'computer',
        id_scope: 'roots',
        fk_remap_fields: 'computer,cmdb_ci',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-memory'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'Memory module',
        active: true,
        apply_order: 60,
        source_table: 'cmdb_ci_memory_module',
        graph_kind: 'record',
        expand_mode: 'parent_in',
        parent_field: 'cmdb_ci',
        id_scope: 'roots',
        fk_remap_fields: 'cmdb_ci,computer',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-swinst'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'Software instance',
        active: true,
        apply_order: 70,
        source_table: 'cmdb_software_instance',
        graph_kind: 'record',
        expand_mode: 'parent_in',
        parent_field: 'installed_on',
        id_scope: 'roots',
        fk_remap_fields: 'installed_on,software',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-fs'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'File system',
        active: true,
        apply_order: 80,
        source_table: 'cmdb_ci_file_system',
        graph_kind: 'record',
        expand_mode: 'any_reference_in',
        parent_field: 'computer,provided_by',
        id_scope: 'roots',
        fk_remap_fields: 'computer,cmdb_ci,provided_by',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-process'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'Running process',
        active: true,
        apply_order: 90,
        source_table: 'cmdb_running_process',
        graph_kind: 'record',
        expand_mode: 'parent_in',
        parent_field: 'computer',
        id_scope: 'roots',
        fk_remap_fields: 'computer,cmdb_ci',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-tcp'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'TCP',
        active: true,
        apply_order: 100,
        source_table: 'cmdb_tcp',
        graph_kind: 'record',
        expand_mode: 'parent_in',
        parent_field: 'computer',
        id_scope: 'roots',
        fk_remap_fields: 'computer,cmdb_ci',
        match_strategy: 'mapping',
    },
})

Record({
    $id: Now.ID['pack-m-case1-rel'],
    table: 'x_33764_sbridge_pack_member',
    data: {
        pack: case1Pack,
        name: 'CI relationship',
        active: true,
        apply_order: 110,
        source_table: 'cmdb_rel_ci',
        graph_kind: 'relationship',
        expand_mode: 'any_reference_in',
        parent_field: 'parent,child',
        id_scope: 'prior_records',
        fk_remap_fields: 'parent,child,type',
        match_strategy: 'mapping',
    },
})
