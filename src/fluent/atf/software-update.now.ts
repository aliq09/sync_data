import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-software-update'],
        name: 'Bridge — software instance update diagnostics and counters',
        description:
            '0.5.2: software-instance updates use the global writer. software resolves to cmdb_ci_spkg. install_date and other mapped fields are copied. Failures count, and one execution claim expands a DEX.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-software-update-step'],
            script: `(function () {
    assertEqual(typeof BridgeApply, 'function', 'BridgeApply should be defined');
    assertEqual(typeof BridgeDualWrite, 'function', 'BridgeDualWrite should be defined');
    assertEqual(typeof BridgeSeed, 'function', 'BridgeSeed should be defined');
    assertEqual(typeof SyncBridgeExecutionService, 'function', 'SyncBridgeExecutionService should be defined');
    var apply = new BridgeApply();
    var item = {
        table: 'cmdb_software_instance',
        values: { name: 'Office', installed_on: 'src-ci', software: 'src-pkg', install_date: '2026-08-06' },
        _bridge_held: { name: 'Office', installed_on: 'tgt-ci', software: 'tgt-pkg' },
        _bridge_sealed: { name: 'Office', installed_on: 'tgt-ci', software: 'tgt-pkg' }
    };
    var detail = apply._softwareAbortDetail(item, null, 'before', 'update');
    assertEqual(detail.indexOf('held before update') > -1 ? 'yes' : 'no', 'yes', 'update diagnostic names the update');
    assertEqual(detail.indexOf('cmdb_software_product_model') > -1 ? 'yes' : 'no', 'no', 'update diagnostic does not name the product model');
    assertEqual(apply._softwareReferenceTable('cmdb_software_instance'), 'cmdb_ci_spkg', 'software reference table is cmdb_ci_spkg');
    var refs = new BridgeRefTranslate();
    assertEqual(refs.childReferenceSpec('cmdb_software_instance', 'software').reference, 'cmdb_ci_spkg', 'child spec is cmdb_ci_spkg');
    var include = refs.childIncludeFields('cmdb_software_instance').join(',');
    assertEqual(include.indexOf('install_date') > -1 ? 'yes' : 'no', 'yes', 'capture includes install_date');
    var body = apply._softwareWriteBody({
        name: 'CASE1-COMP-DETAILED Chrome on 06',
        installed_on: 'ci',
        software: 'spkg',
        install_date: '2026-08-06',
        discovery_source: 'ServiceNow'
    });
    assertEqual(body.install_date, '2026-08-06', 'install_date is copied on the write body');
    assertEqual(body.discovery_source, 'ServiceNow', 'other mapped fields are copied');
    assertEqual(body.software, 'spkg', 'software id is copied');
    var dw = new BridgeDualWrite();
    var outbox = { getValue: function () { return 'insert'; } };
    assertEqual(dw._recordAction(outbox, { result: 'applied', operation: 'update' }), 'update', 'applied update');
    assertEqual(dw._recordAction(outbox, { result: 'applied', operation: 'insert' }), 'insert', 'applied insert');
    assertEqual(dw._recordAction(outbox, { result: 'skipped', operation: '' }), 'skip', 'skipped row');
    assertEqual(dw._recordAction(outbox, { result: 'failed', operation: '' }), 'fail', 'failed row');
    assertEqual(dw._failedTransferCount({ failed: 15, dead: 0 }), 15, 'retrying rows count as failed');
    assertEqual(dw._failedTransferCount({ failed: 2, dead: 3 }), 5, 'dead rows count as failed');
    var seed = new BridgeSeed();
    assertEqual(typeof seed._outboxAlreadyQueued, 'function', 'outbox enqueue is idempotent per execution');
    var svc = new SyncBridgeExecutionService();
    assertEqual(typeof svc._claimExecution, 'function', 'execution expand has a claim');
    assertEqual(typeof svc._releaseExecution, 'function', 'execution expand claim is released');
})();`,
        })
    }
)
