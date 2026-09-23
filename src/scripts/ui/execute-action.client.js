function sbridgeExecuteNow() {
    var configId = g_form.getUniqueValue()
    if (!configId || configId === '-1') {
        g_form.addErrorMessage('Save the configuration before executing.')
        return false
    }
    var session = { cancelled: false, replaced: false, loading: null, dialog: null, configId: configId, started: false }
    sbridgeExecutePublish('sbridgeExecuteLoadingCancelClick', function () {
        session.cancelled = true
        if (session.loading && session.loading.destroy) session.loading.destroy()
        return false
    })
    sbridgeExecutePublish('sbridgeExecuteCancelClick', function () {
        if (session.dialog && session.dialog.destroy) session.dialog.destroy()
        return false
    })
    sbridgeExecutePublish('sbridgeExecuteConfirmClick', function () {
        sbridgeExecuteConfirm(session)
        return false
    })
    session.loading = sbridgeExecuteDialog(
        'Execute Now',
        '<div style="padding:16px;">Loading summary… <button type="button" class="btn btn-default" id="sbridge_execute_loading_cancel" onclick="return sbridgeExecuteLoadingCancelClick();">Cancel</button></div>',
        function () {
            sbridgeExecuteBind('sbridge_execute_loading_cancel', function () {
                session.cancelled = true
                if (session.loading && session.loading.destroy) session.loading.destroy()
            })
        }
    )
    try {
        if (session.loading && session.loading.on) {
            session.loading.on('beforeclose', function () {
                if (!session.replaced) session.cancelled = true
            })
        }
    } catch (ignore) {}
    var ga = new GlideAjax('x_33764_sbridge.SyncBridgeExecutionAjax')
    ga.addParam('sysparm_name', 'preview')
    ga.addParam('sysparm_config_id', configId)
    ga.addParam('sysparm_sample_limit', '20')
    ga.addParam('sysparm_allow_invalid', 'true')
    ga.getXMLAnswer(function (answer) {
        session.replaced = true
        if (session.loading && session.loading.destroy) session.loading.destroy()
        if (session.cancelled) return
        sbridgeExecuteShowSummary(session, sbridgeExecuteRead(answer))
    })
    return false
}

function sbridgeExecuteShowSummary(session, result) {
    var blocked = !result || result.ok === false || result.status === 'invalid'
    var html = '<div style="padding:16px;max-width:720px;">'
    html += '<p><strong>' + sbridgeExecuteEsc(result.configuration_name || '') + '</strong></p>'
    html += '<p>Source: ' + sbridgeExecuteEsc(result.source_label || '') + '</p>'
    html += '<p>Target: ' + sbridgeExecuteEsc(result.target_label || '') + '</p>'
    html += '<p>Filter: ' + sbridgeExecuteEsc(result.filter || '(none)') + '</p>'
    html += '<p>Estimated records: ' + sbridgeExecuteEsc(result.matched || 0) + '</p>'
    html += '<p>Operation: ' + sbridgeExecuteEsc(result.operation || '') + '</p>'
    html += '<p>Reference handling: ' + sbridgeExecuteEsc(result.reference_handling || '') + '</p>'
    if (result.message) html += '<p>' + sbridgeExecuteEsc(result.message) + '</p>'
    var wouldUpdate = parseInt(result.would_update_in_sample, 10) || 0
    if (wouldUpdate > 0) {
        html +=
            '<p><strong>Warning:</strong> ' +
            sbridgeExecuteEsc(wouldUpdate) +
            ' sample row(s) already map to a target and may be updated.</p>'
    }
    if (blocked) {
        html += '<p>This configuration did not pass validation, or the preview could not be prepared. Fix the findings before executing.</p>'
        html += '<p style="margin-top:16px;"><button type="button" class="btn btn-default" id="sbridge_execute_cancel" onclick="return sbridgeExecuteCancelClick();">Close</button></p>'
    } else {
        html += '<p>Confirm queues a data execution and opens it. The existing drain sends the outbox. Cancel leaves this configuration open.</p>'
        html += '<p style="margin-top:16px;">'
        html += '<button type="button" class="btn btn-primary" id="sbridge_execute_confirm" onclick="return sbridgeExecuteConfirmClick();">Confirm</button> '
        html += '<button type="button" class="btn btn-default" id="sbridge_execute_cancel" onclick="return sbridgeExecuteCancelClick();">Cancel</button>'
        html += '</p>'
    }
    html += '</div>'
    session.dialog = sbridgeExecuteDialog('Execute Now', html, function () {
        sbridgeExecuteBind('sbridge_execute_cancel', function () {
            if (session.dialog && session.dialog.destroy) session.dialog.destroy()
        })
        if (!blocked) {
            sbridgeExecuteBind('sbridge_execute_confirm', function () {
                sbridgeExecuteConfirm(session)
            })
        }
    })
}

function sbridgeExecuteConfirm(session) {
    if (!session || session.started) return
    session.started = true
    var button = sbridgeExecuteFind('sbridge_execute_confirm')
    if (button) button.disabled = true
    var ga = new GlideAjax('x_33764_sbridge.SyncBridgeExecutionAjax')
    ga.addParam('sysparm_name', 'executeNow')
    ga.addParam('sysparm_config_id', session.configId)
    ga.getXMLAnswer(function (answer) {
        var out = sbridgeExecuteRead(answer)
        if (out && sbridgeExecuteIsSysId(out.dex_id)) {
            if (session.dialog && session.dialog.destroy) session.dialog.destroy()
            if (out.ok) g_form.addInfoMessage(out.message || 'Queued ' + (out.number || 'data execution') + '.')
            else g_form.addErrorMessage(out.message || 'Unable to start the execution.')
            window.location.href = 'x_33764_sbridge_data_execution.do?sys_id=' + out.dex_id
            return
        }
        if (session.dialog && session.dialog.destroy) session.dialog.destroy()
        g_form.addErrorMessage((out && out.message) || 'Unable to start the execution.')
    })
}

function sbridgeExecuteIsSysId(value) {
    return /^[0-9a-f]{32}$/i.test(String(value || ''))
}

function sbridgeExecuteEsc(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

function sbridgeExecuteRead(answer) {
    if (!answer) return { ok: false, message: 'No response from Sync Bridge.' }
    try {
        var parsed = JSON.parse(answer)
        if (!parsed || typeof parsed !== 'object') return { ok: false, message: 'Execute summary could not be read.' }
        return parsed
    } catch (e) {
        return { ok: false, message: 'Execute summary could not be read.' }
    }
}

function sbridgeExecutePublish(name, fn) {
    try {
        window[name] = fn
    } catch (e) {}
    try {
        if (window.top && window.top !== window) window.top[name] = fn
    } catch (e2) {}
}

function sbridgeExecuteFind(id) {
    var el = null
    try {
        el = document.getElementById(id)
    } catch (e) {}
    if (el) return el
    try {
        if (window.top && window.top.document) el = window.top.document.getElementById(id)
    } catch (e2) {}
    if (el) return el
    if (typeof gel === 'function') {
        try {
            el = gel(id)
        } catch (e3) {}
    }
    return el
}

function sbridgeExecuteDialog(title, html, wire) {
    var dialog = new GlideModal()
    dialog.setTitle(title)
    dialog.setWidth(720)
    var bind = function () {
        if (wire) wire(dialog)
    }
    try {
        if (dialog.on) dialog.on('bodyrendered', bind)
    } catch (ignore) {}
    if (typeof dialog.renderWithContent === 'function') dialog.renderWithContent(html)
    else dialog.render()
    setTimeout(bind, 0)
    setTimeout(bind, 250)
    return dialog
}

function sbridgeExecuteBind(id, handler) {
    var el = sbridgeExecuteFind(id)
    if (!el || el.getAttribute('data-sbridge-wired') === '1') return
    el.setAttribute('data-sbridge-wired', '1')
    el.onclick = function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault()
        handler()
        return false
    }
}

if (typeof window == 'undefined') {
    action.setRedirectURL(current)
}
