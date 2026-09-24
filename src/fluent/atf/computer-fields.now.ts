import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-computer-fields'],
        name: 'Bridge — computer include list and child reference map',
        description:
            '0.4.4: the computer include-list contains the DETAILED attributes, Path A child foreign keys resolve to a reference table, and Case 2 alm_hardware.ci stays on cmdb_ci.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-computer-fields-step'],
            script: `(function () {
    assertEqual(typeof BridgeConfig, 'function', 'BridgeConfig should be defined');
    assertEqual(typeof BridgeRefTranslate, 'function', 'BridgeRefTranslate should be defined');
    assertEqual(BridgeConfig.COMPUTER_FIELDS.indexOf('os') > -1 ? 'yes' : 'no', 'yes', 'os is in the computer include list');
    assertEqual(BridgeConfig.COMPUTER_FIELDS.indexOf('os_version') > -1 ? 'yes' : 'no', 'yes', 'os_version is in the computer include list');
    assertEqual(BridgeConfig.COMPUTER_FIELDS.indexOf('ip_address') > -1 ? 'yes' : 'no', 'yes', 'ip_address is in the computer include list');
    assertEqual(BridgeConfig.COMPUTER_FIELDS.indexOf('manufacturer') > -1 ? 'yes' : 'no', 'yes', 'manufacturer is in the computer include list');
    assertEqual(BridgeConfig.COMPUTER_FIELDS.indexOf('model_id') > -1 ? 'yes' : 'no', 'yes', 'model_id is in the computer include list');
    assertEqual(BridgeConfig.COMPUTER_FIELDS.indexOf('ram') > -1 ? 'yes' : 'no', 'yes', 'ram is in the computer include list');
    assertEqual(BridgeConfig.COMPUTER_FIELDS.indexOf('cpu_count') > -1 ? 'yes' : 'no', 'yes', 'cpu_count is in the computer include list');
    assertEqual(BridgeConfig.COMPUTER_FIELDS.indexOf('cpu_core_count') > -1 ? 'yes' : 'no', 'yes', 'cpu_core_count is in the computer include list');
    assertEqual(BridgeConfig.COMPUTER_FIELDS.indexOf('discovery_source') > -1 ? 'yes' : 'no', 'yes', 'discovery_source is in the computer include list');
    var refs = new BridgeRefTranslate();
    assertEqual(refs.childReferenceSpec('cmdb_ci_network_adapter', 'cmdb_ci').reference, 'cmdb_ci', 'NIC cmdb_ci');
    assertEqual(refs.childReferenceSpec('cmdb_serial_number', 'cmdb_ci').reference, 'cmdb_ci', 'serial cmdb_ci');
    assertEqual(refs.childReferenceSpec('cmdb_ci_disk', 'computer').reference, 'cmdb_ci_computer', 'disk computer');
    assertEqual(refs.childReferenceSpec('cmdb_ci_memory_module', 'cmdb_ci').reference, 'cmdb_ci', 'memory cmdb_ci');
    assertEqual(refs.childReferenceSpec('cmdb_software_instance', 'installed_on').reference, 'cmdb_ci', 'software installed_on');
    assertEqual(refs.childReferenceSpec('cmdb_software_instance', 'software').reference, 'cmdb_software_product_model', 'software product');
    assertEqual(refs.childReferenceSpec('cmdb_ci_file_system', 'computer').reference, 'cmdb_ci_computer', 'filesystem computer');
    assertEqual(refs.childReferenceSpec('cmdb_running_process', 'computer').reference, 'cmdb_ci_computer', 'process computer');
    assertEqual(refs.childReferenceSpec('cmdb_tcp', 'computer').reference, 'cmdb_ci_computer', 'tcp computer');
    assertEqual(refs.childReferenceSpec('cmdb_rel_ci', 'parent').reference, 'cmdb_ci', 'rel parent');
    assertEqual(refs.childReferenceSpec('cmdb_rel_ci', 'child').reference, 'cmdb_ci', 'rel child');
    assertEqual(refs._knownReference('alm_hardware', 'ci'), 'cmdb_ci', 'Case 2 alm_hardware.ci');
    assertEqual(refs._knownReference('item_option_new', 'cat_item'), 'sc_cat_item', 'catalog variable cat_item');
    assertEqual(refs.childReferenceSpec('alm_hardware', 'ci') ? 'yes' : 'no', 'no', 'hardware ci is not a Path A child spec');
    assertEqual(refs.computerReferenceSpec('model_id').reference, 'cmdb_model', 'computer model_id');
    assertEqual(refs.computerReferenceSpec('manufacturer').reference, 'core_company', 'computer manufacturer');
})();`,
        })
    }
)
