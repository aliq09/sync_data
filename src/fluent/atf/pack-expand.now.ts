import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-pack-expand'],
        name: 'Bridge — pack expand order and FK remap',
        description:
            '0.5.0: Case 1 DETAILED pack order is stable and cmdb_rel_ci is last. Declared pack FKs remap through Record Mapping. User and group strategies are not replaced. A table configuration still uses BridgeSeed.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-pack-expand-step'],
            script: `(function () {
    var expected = [
        'cmdb_ci_computer',
        'cmdb_ci_spkg',
        'cmdb_ci_network_adapter',
        'cmdb_serial_number',
        'cmdb_ci_storage_device',
        'cmdb_ci_memory_module',
        'cmdb_software_instance',
        'cmdb_ci_file_system',
        'cmdb_running_process',
        'cmdb_tcp',
        'cmdb_rel_ci'
    ].join(',');
    assertEqual(typeof BridgePackExpand, 'function', 'BridgePackExpand should be defined');
    assertEqual(typeof BridgeSeed, 'function', 'BridgeSeed should stay defined');
    assertEqual(typeof BridgeSeed.prototype.seedPolicy, 'function', 'Path A seedPolicy stays policy-id');
    assertEqual(typeof BridgeRefTranslate, 'function', 'BridgeRefTranslate should be defined');
    var expand = new BridgePackExpand();
    var shuffled = [
        { source_table: 'cmdb_rel_ci', apply_order: 1, name: 'rel-early', sys_id: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1' },
        { source_table: 'cmdb_ci_computer', apply_order: 50, name: 'computer', sys_id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1' },
        { source_table: 'cmdb_tcp', apply_order: 40, name: 'tcp', sys_id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2' },
        { source_table: 'cmdb_ci_network_adapter', apply_order: 40, name: 'nic', sys_id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3' }
    ];
    var ordered = expand.orderedMembers(shuffled);
    assertEqual(expand.memberTableName(ordered[0]), 'cmdb_ci_network_adapter', 'same apply_order sorts by name before tcp');
    assertEqual(expand.memberTableName(ordered[1]), 'cmdb_tcp', 'tcp follows nic at the same apply_order');
    assertEqual(expand.memberTableName(ordered[2]), 'cmdb_ci_computer', 'higher apply_order follows');
    assertEqual(expand.memberTableName(ordered[3]), 'cmdb_rel_ci', 'cmdb_rel_ci stays last even with apply_order 1');

    var plan = expand.planByName('Case 1 DETAILED — Computer related pack');
    assertEqual(plan.ok ? 'yes' : 'no', 'yes', 'Case 1 DETAILED pack exists');
    assertEqual(plan.active, 'yes', 'Case 1 DETAILED pack is active');
    assertEqual(plan.root_table, 'cmdb_ci_computer', 'pack root table');
    assertEqual(plan.root_filter, 'nameSTARTSWITHCASE1-COMP-DETAILED', 'pack root filter');
    assertEqual((plan.tables || []).join(','), expected, 'member tables stay in Case 1 DETAILED order');
    assertEqual(plan.tables[plan.tables.length - 1], 'cmdb_rel_ci', 'seeded pack ends with cmdb_rel_ci');

    var refs = new BridgeRefTranslate();
    var merged = refs.mergePackFk(
        { assigned_to: { strategy: 'user_name' }, support_group: { strategy: 'group_name' } },
        {
            assigned_to: { strategy: 'xref', reference: 'sys_user', business_key: 'user_name' },
            support_group: { strategy: 'xref', reference: 'sys_user_group' },
            cmdb_ci: { reference: 'cmdb_ci', table: 'cmdb_ci', business_key: 'name' },
            provided_by: { strategy: 'identity', reference: 'cmdb_ci' }
        }
    );
    assertEqual(merged.assigned_to.strategy, 'user_name', 'pack FK does not replace user_name');
    assertEqual(merged.support_group.strategy, 'group_name', 'pack FK does not replace group_name');
    assertEqual(merged.cmdb_ci.reference, 'cmdb_ci', 'declared cmdb_ci reference is kept');
    assertEqual(merged.provided_by ? 'yes' : 'no', 'no', 'identity strategy is not turned into a pack ref');

    var sourceId = 'abc123def456abc123def456abc12345';
    var maps = { peerId: '', xrefHits: {}, fieldKinds: {}, usersByName: {}, groupsByName: {}, referenceHandling: 'resolve' };
    var explicitMiss = refs.translate(
        {
            table: 'cmdb_ci_network_adapter',
            values: { cmdb_ci: sourceId, name: 'eth0' },
            pack_fk: { cmdb_ci: { reference: 'cmdb_ci', table: 'cmdb_ci', business_key: 'name' } }
        },
        { cmdb_ci: { strategy: 'xref', table: 'cmdb_ci', business_key: 'name' } },
        maps
    );
    assertEqual(explicitMiss.values.cmdb_ci, '', 'explicit xref miss nulls the field');
    assertEqual(explicitMiss.unresolved.length > 0 ? 'yes' : 'no', 'yes', 'explicit xref miss is unresolved');

    var implicitMiss = refs.translate(
        {
            table: 'cmdb_ci_network_adapter',
            values: { cmdb_ci: sourceId },
            pack_fk: { cmdb_ci: { reference: 'cmdb_ci', table: 'cmdb_ci', business_key: 'name' } }
        },
        {},
        { peerId: '', xrefHits: {}, fieldKinds: {}, usersByName: {}, groupsByName: {}, referenceHandling: 'resolve' }
    );
    assertEqual(implicitMiss.values.cmdb_ci, sourceId, 'implicit pack FK miss keeps the source sys_id');

    var userItem = refs.translate(
        {
            table: 'cmdb_ci_computer',
            values: { assigned_to: 'not-a-bridge-user' },
            pack_fk: { assigned_to: { strategy: 'xref', reference: 'cmdb_ci' } }
        },
        { assigned_to: { strategy: 'user_name' } },
        { peerId: '', xrefHits: {}, fieldKinds: {}, usersByName: {}, groupsByName: {}, referenceHandling: 'resolve' }
    );
    assertEqual(userItem.values.assigned_to, '', 'unknown user_name still resolves through the user path');
    assertEqual(userItem.unresolved.length > 0 ? 'yes' : 'no', 'yes', 'user miss stays on the user strategy');

    var cfg = new GlideRecord('x_33764_sbridge_movement_config');
    cfg.initialize();
    cfg.setValue('config_type', 'table');
    assertEqual(expand.isPackConfig(cfg) ? 'yes' : 'no', 'no', 'table configuration is not a pack');
    cfg.setValue('config_type', 'pack');
    assertEqual(expand.isPackConfig(cfg) ? 'yes' : 'no', 'yes', 'pack configuration is detected');
    assertEqual(new GlideRecord('x_33764_sbridge_movement_pack').isValid(), true, 'movement pack table');
    assertEqual(new GlideRecord('x_33764_sbridge_pack_member').isValid(), true, 'pack member table');
    assertEqual(new GlideRecord('x_33764_sbridge_outbox').isValidField('pack_seq'), true, 'outbox pack sequence');
    assertEqual(new GlideRecord('x_33764_sbridge_data_execution').isValidField('pack'), true, 'one execution can point at the pack');
})();`,
        })
    }
)
