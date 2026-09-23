(function runDrainJob() {
    /**
     * Drain only when there is work — skips empty ticks that used to flood bridge_run.
     * Condition + script both check depth so operators see why a tick was quiet.
     */
    function report(message) {
        var text = String(message).substr(0, 4000)
        var existing = new GlideRecord('x_33764_sbridge_dlq')
        existing.addQuery('resolved', false)
        existing.addQuery('error', text)
        existing.setLimit(1)
        existing.query()
        if (existing.next()) {
            existing.setValue('error', text)
            existing.update()
            return
        }
        var dlq = new GlideRecord('x_33764_sbridge_dlq')
        dlq.initialize()
        dlq.setValue('error', text)
        dlq.setValue('payload', '{}')
        dlq.setValue('resolved', false)
        dlq.insert()
    }

    try {
        var transport = new BridgeTransport()
        var config = new BridgeConfig()
        try {
            config.refreshCaptureCoverage()
        } catch (covErr) {
            gs.warn('[bridge] capture coverage refresh failed: ' + covErr)
        }

        var peers = transport.outboundPeers()
        for (var i = 0; i < peers.length; i++) {
            var peerId = peers[i]
            var pending = new GlideRecord('x_33764_sbridge_outbox')
            pending.addQuery('peer', peerId)
            pending.addQuery('state', 'IN', 'pending,failed')
            pending.setLimit(1)
            pending.query()
            if (!pending.hasNext()) continue
            transport.drain(peerId)
        }
    } catch (e) {
        gs.error('[bridge] drain job failed: ' + e)
        try {
            report('drain job failed: ' + e)
        } catch (ignored) {}
    }
})()
