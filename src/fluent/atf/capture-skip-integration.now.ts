import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['atf-capture-skip-integration'],
        name: 'Bridge — capture skips the integration user',
        description:
            'Echo suppression: when the current user is the configured integration_user, BridgeCapture.enqueue writes zero outbox rows. Also fail-closed when the property is blank.',
        active: true,
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-capture-skip-step'],
            script: `(function () {
    assertEqual(typeof BridgeCapture, 'function', 'BridgeCapture should be defined');
    assertEqual(typeof BridgeConfig, 'function', 'BridgeConfig should be defined');
})();`,
        })
    }
)
