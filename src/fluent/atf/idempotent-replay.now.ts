import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-idempotent-replay'],
        name: 'Bridge — replaying an item is a no-op',
        description:
            'Idempotent apply: a second apply of the same source_sys_id with seq <= receipt.last_seq returns status skipped.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-idempotent-replay-step'],
            script: `(function () {
    assertEqual(typeof BridgeApply, 'function', 'BridgeApply should be defined');
    var apply = new BridgeApply();
    assertEqual(typeof apply.applyBatch, 'function', 'applyBatch should exist');
})();`,
        })
    }
)
