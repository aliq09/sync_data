(function executeRule(current, previous /*null when async*/) {
    if (!current) return
    if (current.getValue('direction') !== 'outbound') return
    if (!current.getValue('table')) return
    try {
        new BridgePolicyHelper().ensureCaptureRule(current)
    } catch (e) {
        gs.error('[bridge] ensureCaptureRule failed: ' + e)
    }
})(current, previous)
