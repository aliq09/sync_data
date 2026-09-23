var SBRIDGE_LIVE_POLL_MS = 1750

function onLoad() {
    sbridgeLiveProgressStart()
}

function sbridgeLiveProgressStart() {
    if (window.__sbridgeLive && window.__sbridgeLive.booted) {
        sbridgeLiveProgressKick()
        return
    }
    var state = {
        booted: true,
        stopped: false,
        inflight: false,
        again: false,
        failCount: 0,
        timer: null,
        configId: '',
    }
    window.__sbridgeLive = state
    window.sbridgeLiveProgressKick = sbridgeLiveProgressKick
    if (!g_form || (g_form.isNewRecord && g_form.isNewRecord())) return
    var configId = ''
    try {
        configId = g_form.getUniqueValue()
    } catch (ignore) {}
    if (!configId || configId === '-1') return
    state.configId = configId
    sbridgeLiveEnsureStyle()
    sbridgeLiveMount()
    sbridgeLiveBindVisibility(state)
    sbridgeLivePoll(state)
}

function sbridgeLiveProgressKick() {
    var state = window.__sbridgeLive
    if (!state || !state.booted) {
        sbridgeLiveProgressStart()
        return
    }
    if (!state.configId && g_form) {
        try {
            state.configId = g_form.getUniqueValue()
        } catch (ignore) {}
    }
    if (!state.configId || state.configId === '-1') return
    state.stopped = false
    state.failCount = 0
    if (state.timer) {
        clearTimeout(state.timer)
        state.timer = null
    }
    sbridgeLiveMount()
    sbridgeLivePoll(state)
}

function sbridgeLiveBindVisibility(state) {
    if (state.visibilityBound) return
    state.visibilityBound = true
    try {
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState !== 'visible') return
            if (state.stopped || state.inflight) return
            sbridgeLivePoll(state)
        })
    } catch (ignore) {}
    try {
        window.addEventListener('pagehide', function () {
            state.stopped = true
            if (state.timer) clearTimeout(state.timer)
        })
    } catch (ignore2) {}
}

function sbridgeLivePoll(state) {
    if (!state || state.stopped) return
    if (document.visibilityState && document.visibilityState !== 'visible') {
        sbridgeLiveSchedule(state)
        return
    }
    if (state.inflight) {
        state.again = true
        return
    }
    state.inflight = true
    var ga = new GlideAjax('x_33764_sbridge.SyncBridgeExecutionAjax')
    ga.addParam('sysparm_name', 'getLiveProgress')
    ga.addParam('sysparm_config_id', state.configId)
    ga.getXMLAnswer(function (answer) {
        state.inflight = false
        var payload = sbridgeLiveRead(answer)
        sbridgeLiveApply(state, payload)
        if (state.again) {
            state.again = false
            sbridgeLivePoll(state)
        }
    })
}

function sbridgeLiveApply(state, payload) {
    sbridgeLiveRender(payload)
    sbridgeLiveButtons(payload)
    if (!payload || payload.ok !== true) {
        var code = payload && payload.code
        if (code === 'forbidden' || code === 'not_found') {
            state.stopped = true
            return
        }
        state.failCount = (state.failCount || 0) + 1
        if (state.failCount < 5) sbridgeLiveSchedule(state)
        else state.stopped = true
        return
    }
    state.failCount = 0
    var terminal =
        payload.open !== true ||
        payload.execution_state === 'completed' ||
        payload.execution_state === 'cancelled' ||
        payload.stage_key === 'idle' ||
        payload.stage_key === 'completed' ||
        payload.stage_key === 'cancelled'
    if (terminal) {
        state.stopped = true
        if (state.timer) {
            clearTimeout(state.timer)
            state.timer = null
        }
        return
    }
    sbridgeLiveSchedule(state)
}

function sbridgeLiveSchedule(state) {
    if (!state || state.stopped) return
    if (state.timer) clearTimeout(state.timer)
    state.timer = setTimeout(function () {
        state.timer = null
        sbridgeLivePoll(state)
    }, SBRIDGE_LIVE_POLL_MS)
}

function sbridgeLiveRead(answer) {
    if (!answer) return { ok: false, message: 'Live progress unavailable.', stage_key: 'idle', open: false, percent: 0 }
    try {
        var parsed = JSON.parse(answer)
        if (!parsed || typeof parsed !== 'object') {
            return { ok: false, message: 'Live progress could not be read.', stage_key: 'idle', open: false, percent: 0 }
        }
        return parsed
    } catch (e) {
        return { ok: false, message: 'Live progress could not be read.', stage_key: 'idle', open: false, percent: 0 }
    }
}

function sbridgeLiveMount() {
    if (document.getElementById('sbridge_live_progress')) return
    var panel = document.createElement('div')
    panel.id = 'sbridge_live_progress'
    panel.setAttribute('role', 'status')
    panel.style.cssText =
        'margin:8px 12px 4px;padding:10px 12px;border:1px solid #d9d9d9;border-left:4px solid #98a2b3;border-radius:4px;background:#fbfbfb;font-size:13px;line-height:1.45;color:#1d2939;'
    var top = document.createElement('div')
    top.style.cssText = 'display:flex;justify-content:space-between;gap:12px;align-items:baseline;'
    var stage = document.createElement('strong')
    stage.id = 'sbridge_live_stage'
    stage.textContent = 'Live execution'
    var meta = document.createElement('span')
    meta.id = 'sbridge_live_meta'
    meta.style.cssText = 'white-space:nowrap;'
    top.appendChild(stage)
    top.appendChild(meta)
    var track = document.createElement('div')
    track.style.cssText = 'margin-top:6px;height:8px;background:#ececec;border-radius:4px;overflow:hidden;'
    var bar = document.createElement('div')
    bar.id = 'sbridge_live_bar'
    bar.style.cssText = 'height:100%;width:0;background:#98a2b3;'
    track.appendChild(bar)
    var message = document.createElement('div')
    message.id = 'sbridge_live_message'
    message.style.marginTop = '6px'
    message.textContent = 'Loading live execution…'
    var counts = document.createElement('div')
    counts.id = 'sbridge_live_counts'
    counts.style.cssText = 'margin-top:4px;color:#475467;'
    var links = document.createElement('div')
    links.style.cssText = 'margin-top:6px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;'
    var linkWrap = document.createElement('span')
    var open = document.createElement('a')
    open.id = 'sbridge_live_open'
    open.style.marginRight = '12px'
    var audit = document.createElement('a')
    audit.id = 'sbridge_live_audit'
    linkWrap.appendChild(open)
    linkWrap.appendChild(audit)
    var ack = document.createElement('span')
    ack.id = 'sbridge_live_ack'
    ack.style.color = '#667085'
    ack.textContent = 'Acknowledgement not enabled'
    links.appendChild(linkWrap)
    links.appendChild(ack)
    panel.appendChild(top)
    panel.appendChild(track)
    panel.appendChild(message)
    panel.appendChild(counts)
    panel.appendChild(links)
    sbridgeLivePlace(panel)
}

function sbridgeLivePlace(panel) {
    var header = document.getElementById('form_header')
    if (!header) header = document.querySelector('nav.navbar')
    if (!header) header = document.querySelector('.navbar.navbar-default')
    if (header && header.parentNode) {
        if (header.nextSibling) header.parentNode.insertBefore(panel, header.nextSibling)
        else header.parentNode.appendChild(panel)
        return
    }
    var labels = document.querySelectorAll('.section_header .label, span.label, .section-title')
    var i
    for (i = 0; i < labels.length; i++) {
        var text = (labels[i].textContent || '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '')
        if (text !== 'Live execution') continue
        var headerRow = labels[i].parentNode
        var content = headerRow ? headerRow.nextSibling : null
        while (content && content.nodeType !== 1) content = content.nextSibling
        if (content) {
            content.insertBefore(panel, content.firstChild)
            return
        }
    }
    var anchor = document.querySelector('.section_header') || document.getElementById('form') || document.body
    if (anchor === document.body) anchor.insertBefore(panel, anchor.firstChild)
    else if (anchor.parentNode) anchor.parentNode.insertBefore(panel, anchor)
}

function sbridgeLiveRender(payload) {
    sbridgeLiveMount()
    payload = payload || {}
    var stageKey = payload.stage_key || 'idle'
    var labels = {
        idle: 'Last execution',
        draft: 'Draft',
        queued: 'Queued',
        validating: 'Validating',
        preparing: 'Preparing',
        reading: 'Reading source',
        transfer: 'Transferring',
        target: 'Applying',
        finalising: 'Finalising',
        completed: 'Completed',
        cancelled: 'Cancelled',
    }
    var stage = document.getElementById('sbridge_live_stage')
    var meta = document.getElementById('sbridge_live_meta')
    var bar = document.getElementById('sbridge_live_bar')
    var message = document.getElementById('sbridge_live_message')
    var counts = document.getElementById('sbridge_live_counts')
    var open = document.getElementById('sbridge_live_open')
    var audit = document.getElementById('sbridge_live_audit')
    var panel = document.getElementById('sbridge_live_progress')
    if (stage) stage.textContent = labels[stageKey] || 'Live execution'
    var percent = parseInt(payload.percent, 10)
    if (isNaN(percent) || percent < 0) percent = 0
    if (percent > 100) percent = 100
    var resultText = sbridgeLiveResult(payload.execution_result)
    var modeText = payload.execution_mode === 'dry_run' ? 'Dry run' : ''
    var metaText = percent + '%'
    if (modeText) metaText += ' · ' + modeText
    if (resultText) metaText += ' · ' + resultText
    if (meta) {
        meta.textContent = metaText
        meta.style.color = sbridgeLiveResultColor(payload)
    }
    var tone = sbridgeLiveTone(payload, stageKey)
    if (bar) {
        bar.style.width = percent + '%'
        bar.style.background = tone
        if (payload.indeterminate === true && payload.open === true) bar.className = 'sbridge-indet'
        else bar.className = ''
    }
    if (panel) panel.style.borderLeftColor = tone
    if (message) message.textContent = payload.message || ''
    if (counts) counts.textContent = sbridgeLiveCounts(payload)
    var dexId = sbridgeLiveSysId(payload.dex_id)
    if (open) {
        if (dexId) {
            open.href = 'x_33764_sbridge_data_execution.do?sys_id=' + dexId
            open.textContent = payload.number ? 'Open ' + payload.number : 'Open execution'
            open.style.display = ''
        } else {
            open.removeAttribute('href')
            open.textContent = ''
            open.style.display = 'none'
        }
    }
    if (audit) {
        if (dexId) {
            audit.href = 'x_33764_sbridge_transfer_audit_list.do?sysparm_query=' + encodeURIComponent('execution=' + dexId)
            audit.textContent = 'Audit'
            audit.style.display = ''
        } else {
            audit.removeAttribute('href')
            audit.textContent = ''
            audit.style.display = 'none'
        }
    }
}

function sbridgeLiveCounts(payload) {
    if (!payload || payload.ok !== true) return ''
    var parts = []
    sbridgeLivePushCount(parts, 'selected', payload.selected_count)
    sbridgeLivePushCount(parts, 'sent', payload.sent_count)
    sbridgeLivePushCount(parts, 'inserted', payload.inserted_count)
    sbridgeLivePushCount(parts, 'updated', payload.updated_count)
    sbridgeLivePushCount(parts, 'skipped', payload.skipped_count)
    sbridgeLivePushCount(parts, 'failed', payload.failed_count)
    return parts.join(' · ')
}

function sbridgeLivePushCount(parts, label, value) {
    var n = parseInt(value, 10)
    if (isNaN(n) || n <= 0) return
    parts.push(n + ' ' + label)
}

function sbridgeLiveResult(result) {
    var map = {
        successful: 'Successful',
        successful_with_warnings: 'Successful with warnings',
        partially_completed: 'Partially completed',
        failed: 'Failed',
        cancelled: 'Cancelled',
    }
    return map[result || ''] || ''
}

function sbridgeLiveResultColor(payload) {
    var result = payload && payload.execution_result
    if (result === 'failed') return '#b42318'
    if (result === 'successful_with_warnings' || result === 'partially_completed') return '#b54708'
    if (result === 'cancelled') return '#667085'
    if (result === 'successful') return '#067647'
    return '#344054'
}

function sbridgeLiveTone(payload, stageKey) {
    if (stageKey === 'cancelled' || (payload && payload.execution_state === 'cancelled')) return '#667085'
    if (stageKey === 'completed') {
        var result = payload.execution_result
        if (result === 'failed') return '#b42318'
        if (result === 'successful_with_warnings' || result === 'partially_completed') return '#b54708'
        if (result === 'cancelled') return '#667085'
        return '#067647'
    }
    if (stageKey === 'idle' || !payload || payload.open !== true) return '#98a2b3'
    return '#155eef'
}

function sbridgeLiveButtons(payload) {
    var blocked = !!(payload && payload.ok === true && payload.concurrent_blocked === true && payload.open === true)
    var dexId = blocked ? sbridgeLiveSysId(payload.dex_id) : ''
    var url = dexId ? 'x_33764_sbridge_data_execution.do?sys_id=' + dexId : ''
    var nodes = document.querySelectorAll('button, a.btn, input[type="submit"], input[type="button"]')
    var i
    for (i = 0; i < nodes.length; i++) {
        var el = nodes[i]
        if (!el.getAttribute('data-sbridge-role')) {
            var role = sbridgeLiveRole(el)
            if (!role) continue
            el.setAttribute('data-sbridge-role', role)
            el.setAttribute('data-sbridge-orig-text', sbridgeLiveButtonText(el))
            el.setAttribute('data-sbridge-orig-onclick', el.getAttribute('onclick') || '')
        }
        var known = el.getAttribute('data-sbridge-role')
        if (known === 'execute') sbridgeLiveSwapExecute(el, blocked, url)
        else if (known === 'dry') sbridgeLiveSwapDry(el, blocked)
        else if (known === 'latest') sbridgeLiveEmphasize(el, blocked)
    }
}

function sbridgeLiveRole(el) {
    var blob = [
        el.id || '',
        el.getAttribute('name') || '',
        el.getAttribute('value') || '',
        el.getAttribute('onclick') || '',
        sbridgeLiveButtonText(el),
    ].join(' ')
    if (blob.indexOf('sbridge_execute_now') !== -1 || blob.indexOf('sbridgeExecuteNow') !== -1 || blob.indexOf('Execute Now') !== -1) {
        return 'execute'
    }
    if (blob.indexOf('sbridge_dry_run') !== -1 || blob.indexOf('sbridgeConfirmDryRun') !== -1) return 'dry'
    if (sbridgeLiveButtonText(el) === 'Dry Run') return 'dry'
    if (blob.indexOf('view_latest_execution') !== -1 || blob.indexOf('View latest execution') !== -1) return 'latest'
    return ''
}

function sbridgeLiveSwapExecute(el, blocked, url) {
    if (blocked && url) {
        sbridgeLiveSetText(el, 'Execution in progress')
        el.disabled = false
        el.setAttribute('title', 'Open the running execution')
        el.setAttribute('data-sbridge-swapped', '1')
        el.onclick = function (ev) {
            if (ev && ev.preventDefault) ev.preventDefault()
            if (ev && ev.stopPropagation) ev.stopPropagation()
            window.location.href = url
            return false
        }
        return
    }
    if (el.getAttribute('data-sbridge-swapped') === '1') sbridgeLiveRestore(el)
}

function sbridgeLiveSwapDry(el, blocked) {
    if (blocked) {
        el.disabled = true
        el.setAttribute('aria-disabled', 'true')
        el.setAttribute('title', 'An execution is already in progress')
        el.setAttribute('data-sbridge-swapped', '1')
        el.onclick = function () {
            return false
        }
        return
    }
    if (el.getAttribute('data-sbridge-swapped') === '1') sbridgeLiveRestore(el)
}

function sbridgeLiveEmphasize(el, blocked) {
    if (blocked) {
        if ((' ' + el.className + ' ').indexOf(' btn-primary ') === -1) {
            el.className = (el.className ? el.className + ' ' : '') + 'btn-primary'
            el.setAttribute('data-sbridge-added-primary', '1')
        }
        return
    }
    if (el.getAttribute('data-sbridge-added-primary') === '1') {
        el.className = (' ' + el.className + ' ').replace(' btn-primary ', ' ').replace(/^\s+|\s+$/g, '')
        el.removeAttribute('data-sbridge-added-primary')
    }
}

function sbridgeLiveRestore(el) {
    var text = el.getAttribute('data-sbridge-orig-text')
    if (text != null) sbridgeLiveSetText(el, text)
    el.disabled = false
    el.removeAttribute('aria-disabled')
    el.removeAttribute('title')
    var orig = el.getAttribute('data-sbridge-orig-onclick') || ''
    el.onclick = null
    el.setAttribute('onclick', orig)
    el.removeAttribute('data-sbridge-swapped')
}

function sbridgeLiveButtonText(el) {
    var tag = (el.tagName || '').toLowerCase()
    var raw = tag === 'input' ? el.value || '' : el.textContent || el.innerText || ''
    return raw.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '')
}

function sbridgeLiveSetText(el, text) {
    var tag = (el.tagName || '').toLowerCase()
    if (tag === 'input') el.value = text
    else el.textContent = text
}

function sbridgeLiveSysId(value) {
    return /^[0-9a-f]{32}$/i.test(String(value || '')) ? String(value) : ''
}

function sbridgeLiveEnsureStyle() {
    if (document.getElementById('sbridge_live_progress_style')) return
    var style = document.createElement('style')
    style.id = 'sbridge_live_progress_style'
    style.textContent =
        '@keyframes sbridgeLivePulse{0%,100%{opacity:1}50%{opacity:.45}}#sbridge_live_bar.sbridge-indet{animation:sbridgeLivePulse 1.2s ease-in-out infinite}'
    var head = document.head || document.getElementsByTagName('head')[0]
    if (head) head.appendChild(style)
}

window.sbridgeLiveProgressKick = sbridgeLiveProgressKick
