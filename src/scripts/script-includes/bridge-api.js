/**
 * BridgeApi — request handling for the Scripted REST API (§6.2, §6.5).
 *
 * The routes themselves are two lines each; everything they do is here so the logic
 * has one copy and is reachable from ATF.
 *
 * Errors go out through `sn_ws_err.ServiceError`, not `setStatus` + `setBody`. On a
 * non-2xx status the REST processor serialises the attached ServiceError and
 * discards any body set alongside it — the symptom is a correct status code with an
 * empty body, which the caller can only report as a bare "(HTTP nnn)". This is
 * documented from the sibling app's deployment; it is not a guess.
 */
var BridgeApi = Class.create()

BridgeApi.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
    },

    /** POST /apply — §6.2's per-item contract. */
    apply: function (request, response) {
        var body = this._body(request, response)
        if (!body) return

        var guard = this._authorise(response)
        if (!guard) return

        var peerId = this._senderPeerId(body.peer, response)
        if (!peerId) return

        if (!body.items || !body.items.length) {
            return this._ok(response, { results: [] })
        }

        var results = new BridgeApply().applyBatch(peerId, body.items)
        // Additive. Older sources read results only. 0.4.0 sources treat this as RECEIVED.
        return this._ok(response, {
            results: results,
            acknowledgement: 'received',
            ack_supported: true,
            bridge_version: BridgeAck.VERSION,
        })
    },

    /**
     * POST /v1/ack — source receives a staged acknowledgement.
     * correlation_id is required. Same (correlation_id, ack_stage) is idempotent.
     * Caller must be the integration user, same as /apply.
     */
    ack: function (request, response) {
        var body = this._body(request, response)
        if (!body) return

        var guard = this._authorise(response)
        if (!guard) return

        var out = new BridgeAck().handleInboundAck(body)
        if (!out || !out.ok) {
            return this._fail(response, (out && out.status) || 400, (out && out.message) || 'acknowledgement was not accepted')
        }
        return this._ok(response, out)
    },

    /** POST /compare — the target half of §6.5's hash exchange. */
    compare: function (request, response) {
        var body = this._body(request, response)
        if (!body) return

        var guard = this._authorise(response)
        if (!guard) return

        var peerId = this._senderPeerId(body.peer, response)
        if (!peerId) return

        if (!body.table || !body.fields || !body.records) {
            return this._fail(response, 400, 'table, fields and records are all required')
        }

        // The comparison reads a table, so it is bounded by the same allow-list as a
        // write: no active inbound policy means this peer has no business asking about
        // this table, and divergence reporting must not become a way around that.
        var policies = this.config.policiesFor(body.table, 'inbound')
        var permitted = false
        for (var i = 0; i < policies.length; i++) {
            if (policies[i].peer === peerId) {
                permitted = true
                break
            }
        }
        if (!permitted) {
            return this._fail(response, 403, 'no active inbound policy for table ' + body.table + ' from this peer')
        }

        var result = new BridgeDivergence().compare(peerId, body.table, body.fields, body.records)
        return this._ok(response, result)
    },

    /** POST /seed — enqueue existing rows for an outbound policy (resumable). */
    seed: function (request, response) {
        var body = this._body(request, response)
        if (!body) return

        var guard = this._authorise(response)
        if (!guard) return

        if (!body.policy) {
            return this._fail(response, 400, 'policy (sys_id) is required')
        }

        var summary = new BridgeSeed().seedPolicy(body.policy, {
            batchSize: body.batch_size,
            runId: body.run_id,
        })
        return this._ok(response, summary)
    },

    /**
     * POST /executions — hook into the execution controller.
     * Body: { configuration, mode?: execute|dry_run, trigger_reference? }
     * Does not call BridgeTransport.
     */
    executions: function (request, response) {
        var body = this._body(request, response)
        if (!body) return

        var guard = this._authorise(response)
        if (!guard) return

        if (!body.configuration) {
            return this._fail(response, 400, 'configuration (sys_id) is required')
        }

        var mode = body.mode === 'dry_run' ? 'dry_run' : 'execute'
        var opts = {
            trigger_type: 'api',
            trigger_reference: body.trigger_reference || 'rest:/executions',
        }
        var svc = new SyncBridgeExecutionService()
        var out = mode === 'dry_run' ? svc.dryRun(body.configuration, opts) : svc.execute(body.configuration, opts)
        if (!out || !out.ok) {
            var code = out && out.code === 'prevent' ? 409 : 400
            return this._fail(response, code, (out && out.message) || 'execution was not started')
        }
        return this._ok(response, out)
    },

    /** POST /ensure_capture — create capture BR for a policy table if missing. */
    ensureCapture: function (request, response) {
        var body = this._body(request, response)
        if (!body) return

        var guard = this._authorise(response)
        if (!guard) return

        if (!body.policy) {
            return this._fail(response, 400, 'policy (sys_id) is required')
        }

        var result = new BridgePolicyHelper().ensureCaptureRule(body.policy)
        return this._ok(response, result)
    },

    /**
     * The caller must be the configured integration user.
     *
     * This is what turns §3.3's echo suppression from an assumption into an enforced
     * invariant. Capture skips writes made by the integration user; if the inbound
     * OAuth client happened to map to any *other* account, every applied change would
     * be captured again and sent back — an unbounded echo loop across production
     * instances. Refusing here means that misconfiguration fails immediately and
     * visibly instead of amplifying.
     */
    _authorise: function (response) {
        var configured = this.config.integrationUser()
        if (!configured) {
            this._fail(response, 503, BridgeConfig.PROP.integrationUser + ' is not set on this instance')
            return false
        }
        if (!this.config.isIntegrationUser()) {
            this._fail(
                response,
                403,
                'caller must authenticate as the configured integration user, not "' + gs.getUserName() + '"'
            )
            return false
        }
        return true
    },

    /**
     * Resolve the sender's `bridge_peer` row by name.
     *
     * §10: no hardcoded instance names outside `bridge_peer`. An unknown or inactive
     * sender is refused rather than auto-registered — a peer row is the record of a
     * deliberate decision to exchange data with an instance.
     */
    _senderPeerId: function (peerName, response) {
        if (!peerName) {
            this._fail(response, 400, 'peer name is required')
            return ''
        }
        var gr = new GlideRecord(BridgeConfig.TABLE.peer)
        gr.addQuery('name', peerName)
        gr.addActiveQuery()
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) {
            this._fail(response, 403, 'no active bridge_peer named "' + peerName + '" on this instance')
            return ''
        }
        return gr.getUniqueValue()
    },

    _body: function (request, response) {
        try {
            var data = request.body ? request.body.data : null
            if (!data) {
                this._fail(response, 400, 'request body is empty')
                return null
            }
            return typeof data === 'string' ? JSON.parse(data) : data
        } catch (e) {
            this._fail(response, 400, 'request body is not valid JSON: ' + e)
            return null
        }
    },

    _ok: function (response, payload) {
        response.setStatus(200)
        response.setBody(payload)
    },

    _fail: function (response, status, message) {
        var err = new sn_ws_err.ServiceError()
        err.setStatus(status)
        err.setMessage(message)
        // Repeated in detail because some clients surface only one of the two.
        err.setDetail(message)
        response.setError(err)
    },

    type: 'BridgeApi',
}
