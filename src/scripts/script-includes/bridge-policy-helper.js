/**
 * BridgePolicyHelper — declarative table onboarding.
 * Ensures an after Business Rule exists that calls BridgeCapture.enqueue for the policy table.
 */
var BridgePolicyHelper = Class.create()

BridgePolicyHelper.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
    },

    /**
     * Ensure capture BR for a policy row (GlideRecord or sys_id).
     * @returns {{ready: boolean, created: boolean, br_sys_id: string, name: string}}
     */
    ensureCaptureRule: function (policyOrId) {
        var policyGr = policyOrId
        if (typeof policyOrId === 'string') {
            policyGr = new GlideRecord(BridgeConfig.TABLE.policy)
            if (!policyGr.get(policyOrId)) {
                return { ready: false, created: false, br_sys_id: '', name: '', error: 'policy not found' }
            }
        }

        var tableName = policyGr.getValue('table')
        if (!tableName) {
            return { ready: false, created: false, br_sys_id: '', name: '', error: 'no table' }
        }

        if (this.config.hasCaptureRule(tableName)) {
            policyGr.setValue('capture_ready', true)
            policyGr.update()
            return { ready: true, created: false, br_sys_id: '', name: '', table: tableName }
        }

        var name = 'Sync Bridge capture — ' + tableName
        var script =
            "(function executeRule(current, previous /*null when async*/) {\n" +
            "    var op = 'update';\n" +
            "    if (current.operation() === 'insert') op = 'insert';\n" +
            "    else if (current.operation() === 'delete') op = 'delete';\n" +
            "    new BridgeCapture().enqueue(current, op);\n" +
            "})(current, previous);"

        var br = new GlideRecord('sys_script')
        br.initialize()
        br.setValue('name', name)
        br.setValue('collection', tableName)
        br.setValue('when', 'after')
        br.setValue('action_insert', true)
        br.setValue('action_update', true)
        br.setValue('action_delete', true)
        br.setValue('active', true)
        br.setValue('order', 1000)
        br.setValue('script', script)
        br.setValue('description', 'Auto-created by Sync Bridge for declarative capture onboarding.')
        var brId = br.insert()

        var ready = !!brId
        policyGr.setValue('capture_ready', ready)
        policyGr.update()

        return {
            ready: ready,
            created: ready,
            br_sys_id: brId || '',
            name: name,
            table: tableName,
            error: ready ? '' : 'failed to insert business rule',
        }
    },

    type: 'BridgePolicyHelper',
}
