function sbridgePreviewRecords() {
    var configId = g_form.getUniqueValue()
    if (!configId || configId === '-1') {
        g_form.addErrorMessage('Save the configuration before previewing records.')
        return false
    }
    var session = { cancelled: false, replaced: false, loading: null, dialog: null }
    sbridgePreviewPublish('sbridgePreviewLoadingCloseClick', function () {
        session.cancelled = true
        if (session.loading && session.loading.destroy) session.loading.destroy()
        return false
    })
    sbridgePreviewPublish('sbridgePreviewCloseClick', function () {
        if (session.dialog && session.dialog.destroy) session.dialog.destroy()
        return false
    })
    session.loading = sbridgePreviewDialog(
        'Preview records',
        '<div style="padding:16px;">Loading preview… <button type="button" class="btn btn-default" id="sbridge_preview_loading_close" onclick="return sbridgePreviewLoadingCloseClick();">Close</button></div>',
        function () {
            sbridgePreviewBind('sbridge_preview_loading_close', function () {
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
    ga.addParam('sysparm_sample_limit', '50')
    ga.getXMLAnswer(function (answer) {
        session.replaced = true
        if (session.loading && session.loading.destroy) session.loading.destroy()
        if (session.cancelled) return
        var result = sbridgePreviewRead(answer)
        if (result.message) {
            if (result.ok) g_form.addInfoMessage(result.message)
            else g_form.addErrorMessage(result.message)
        }
        var html = '<div style="padding:16px;max-width:920px;">'
        html += '<p><strong>' + sbridgePreviewEsc(result.configuration_name || '') + '</strong></p>'
        html += '<p>Matched ' + sbridgePreviewEsc(result.matched || 0) + '. No target rows were changed.</p>'
        if (result.message) html += '<p>' + sbridgePreviewEsc(result.message) + '</p>'
        html += sbridgePreviewBody(result)
        html += '<p style="margin-top:16px;"><button type="button" class="btn btn-default" id="sbridge_preview_close" onclick="return sbridgePreviewCloseClick();">Close</button></p>'
        html += '</div>'
        session.dialog = sbridgePreviewDialog('Preview records', html, function () {
            sbridgePreviewBind('sbridge_preview_close', function () {
                if (session.dialog && session.dialog.destroy) session.dialog.destroy()
            })
        })
    })
    return false
}

function sbridgePreviewBody(result) {
    if (result.detail_html) return result.detail_html
    var sample = result.sample || []
    if (!sample.length) return '<p>No rows in the sample.</p>'
    var html = '<table><tr><th>Source record</th><th>Name</th><th>Existing target</th><th>Proposed action</th></tr>'
    var i
    for (i = 0; i < sample.length; i++) {
        var row = sample[i] || {}
        html +=
            '<tr><td>' +
            sbridgePreviewEsc(row.source_sys_id) +
            '</td><td>' +
            sbridgePreviewEsc(row.name) +
            '</td><td>' +
            sbridgePreviewEsc(row.existing_target || 'None') +
            '</td><td>' +
            sbridgePreviewEsc(row.proposed_action) +
            '</td></tr>'
    }
    return html + '</table>'
}

function sbridgePreviewEsc(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

function sbridgePreviewRead(answer) {
    if (!answer) return { ok: false, message: 'No response from Sync Bridge.' }
    try {
        var parsed = JSON.parse(answer)
        if (!parsed || typeof parsed !== 'object') return { ok: false, message: 'Preview could not be read.' }
        return parsed
    } catch (e) {
        return { ok: false, message: 'Preview could not be read.' }
    }
}

function sbridgePreviewPublish(name, fn) {
    try {
        window[name] = fn
    } catch (e) {}
    try {
        if (window.top && window.top !== window) window.top[name] = fn
    } catch (e2) {}
}

function sbridgePreviewFind(id) {
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

function sbridgePreviewDialog(title, html, wire) {
    var dialog = new GlideModal()
    dialog.setTitle(title)
    dialog.setWidth(960)
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

function sbridgePreviewBind(id, handler) {
    var el = sbridgePreviewFind(id)
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
