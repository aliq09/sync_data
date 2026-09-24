import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-software-update'],
        name: 'Bridge — software instance update diagnostics and counters',
        description:
            '0.5.1: a software-instance update diagnostic says update. Record-result actions distinguish insert, update, and skip. The software reference follows the dictionary when the column exists.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-software-update-step'],
            script: `(function () {
    assertEqual(typeof BridgeApply, 'function', 'BridgeApply should be defined');
    assertEqual(typeof BridgeDualWrite, 'function', 'BridgeDualWrite should be defined');
    var apply = new BridgeApply();
    var item = {
        table: 'cmdb_software_instance',
        values: { name: 'Office', installed_on: 'src-ci', software: 'src-pkg' },
        _bridge_held: { name: '', installed_on: '', software: '' },
        _bridge_sealed: { name: 'Office', installed_on: 'tgt-ci', software: 'tgt-pkg' }
    };
    var detail = apply._softwareAbortDetail(item, null, 'before', 'update');
    assertEqual(detail.indexOf('held before update') > -1 ? 'yes' : 'no', 'yes', 'update diagnostic names the update');
    assertEqual(detail.indexOf('before insert') > -1 ? 'yes' : 'no', 'no', 'update diagnostic does not say insert');
    assertEqual(apply._softwareHoldMatches(item, { name: 'Office', installed_on: 'tgt-ci' }) ? 'yes' : 'no', 'no', 'empty hold does not match');
    item._bridge_held = { name: 'Office', installed_on: 'tgt-ci', software: 'tgt-pkg' };
    assertEqual(apply._softwareHoldMatches(item, { name: 'Office', installed_on: 'tgt-ci' }) ? 'yes' : 'no', 'yes', 'matching hold stays on the scoped update');
    var dw = new BridgeDualWrite();
    var outbox = { getValue: function () { return 'insert'; } };
    assertEqual(dw._recordAction(outbox, { result: 'applied', operation: 'update' }), 'update', 'applied update');
    assertEqual(dw._recordAction(outbox, { result: 'applied', operation: 'insert' }), 'insert', 'applied insert');
    assertEqual(dw._recordAction(outbox, { result: 'skipped', operation: '' }), 'skip', 'skipped row');
    assertEqual(dw._actionLabel('applied', 'ire', 'insert'), 'insert', 'unknown apply op keeps the outbox op');
    var sw = new GlideRecord('cmdb_software_instance');
    if (sw.isValid() && sw.isValidField('software')) {
        var dict = apply._dictionaryReference('cmdb_software_instance', 'software');
        var ed = sw.getElement('software').getED();
        var live = ed ? String(ed.getReference() || '') : '';
        if (live) assertEqual(dict, live, 'software reference is the dictionary table');
    }
})();`,
        })
    }
)
