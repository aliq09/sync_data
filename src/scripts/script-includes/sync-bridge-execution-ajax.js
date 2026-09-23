/**
 * GlideAjax entry for configuration-form dialogs.
 * Calls SyncBridgeExecutionService only. Does not seed, drain, or apply.
 */
var SyncBridgeExecutionAjax = Class.create()
SyncBridgeExecutionAjax.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    preview: function () {
        var configId = this.getParameter('sysparm_config_id') + ''
        var allowInvalid = (this.getParameter('sysparm_allow_invalid') + '') === 'true'
        var sampleLimit = parseInt(this.getParameter('sysparm_sample_limit'), 10)
        var opts = {
            trigger_type: 'manual',
            sampleLimit: isNaN(sampleLimit) ? 50 : sampleLimit,
        }
        if (allowInvalid) opts.allowInvalid = true
        var result = new SyncBridgeExecutionService().preview(configId, opts)
        return this._encode(this._view(result))
    },

    executeNow: function () {
        var configId = this.getParameter('sysparm_config_id') + ''
        var result = new SyncBridgeExecutionService().execute(configId, {
            trigger_type: 'manual',
            trigger_reference: 'form-modal',
        })
        return this._encode(this._view(result))
    },

    _view: function (result) {
        result = result || {}
        var sample = []
        var rows = result.sample || []
        var i
        for (i = 0; i < rows.length; i++) {
            var row = rows[i] || {}
            sample.push({
                source_sys_id: row.source_sys_id || '',
                name: row.name || '',
                existing_target: row.existing_target || '',
                proposed_action: row.proposed_action || '',
            })
        }
        return {
            ok: result.ok === true,
            status: result.status || '',
            code: result.code || '',
            message: result.message || '',
            matched: result.matched || 0,
            would_update_in_sample: result.would_update_in_sample || 0,
            configuration_name: result.configuration_name || '',
            source_label: result.source_label || '',
            target_label: result.target_label || '',
            filter: result.filter || '',
            operation: result.operation || '',
            reference_handling: result.reference_handling || '',
            detail_html: result.detail_html || '',
            sample: sample,
            dex_id: result.dex_id || '',
            number: result.number || '',
        }
    },

    _encode: function (payload) {
        try {
            return JSON.stringify(payload)
        } catch (e) {
            return JSON.stringify({ ok: false, message: 'Sync Bridge could not encode the response.' })
        }
    },

    type: 'SyncBridgeExecutionAjax',
})
