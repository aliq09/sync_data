/**
 * BridgeTransport — spec/PROJECT_PLAN.md §6.2.
 *
 * Drains the local outbox to one peer. Called from a scheduled job, never from a
 * business rule (§3.4): a user's save must not block on remote latency, and every
 * save would otherwise hang during the peer's upgrade window.
 */
var BridgeTransport = Class.create()

/** §6.2 backoff. Attempt N waits BASE * 2^(N-1) seconds, capped. */
BridgeTransport.BACKOFF_BASE_SECONDS = 30
BridgeTransport.BACKOFF_CAP_SECONDS = 3600

/**
 * A drain older than this with no `ended` is treated as abandoned rather than in progress.
 *
 * Ten minutes, not an hour: a batch that legitimately runs longer than this is already a
 * problem worth surfacing, and the cost of guessing wrong in the other direction is the
 * peer being wedged and nothing syncing. A node dying mid-drain must not stop the bridge
 * for the rest of the hour.
 */
BridgeTransport.ABANDONED_RUN_SECONDS = 600

/** Name of the OAuth profile this app installs for a peer. Must match outbound-oauth.now.ts. */
BridgeTransport.profileName = function (peer) {
    return 'Sync Bridge ' + peer.name + ' client_credentials'
}

BridgeTransport.prototype = {
    initialize: function () {
        this.config = new BridgeConfig()
    },

    /**
     * @param {string} peerId bridge_peer sys_id
     * @returns {object} summary, also written to bridge_run
     */
    drain: function (peerId) {
        // Phase 1 shadows. Best-effort and never part of the Case 1 result.
        try {
            new BridgeDualWrite().backfill()
        } catch (e) {
            gs.warn('[bridge] dual-write backfill failed (ignored): ' + e)
        }
        var summary = { peer: peerId, processed: 0, failed: 0, skipped: false, reason: '' }
        try {
            var result = this._drain(peerId, summary)

            /**
             * Persist the skip reason. This is the lesson from the worst bug in this app's
             * short life: `drain()` was returning `{skipped: true, reason: 'disabled by
             * x_33764_sbridge.enabled'}` on every tick and nothing wrote it down, so the
             * bridge looked dead rather than switched off. A reason that exists only in a
             * returned object might as well not exist — §6.6 wants the answer visible
             * without reading code.
             */
            if (result && result.skipped && result.reason) {
                try {
                    this._markPeerUnreachable(peerId, 'skipped: ' + result.reason)
                } catch (ignored) {
                    gs.warn('[bridge] could not record skip reason: ' + ignored)
                }
            }
            return result
        } catch (e) {
            // Outermost net. Everything from here in used to escape to the scheduled job's
            // catch and reach only syslog; recording it on the peer row is what makes a
            // scripting error visible on the status page (§6.6).
            summary.reason = 'drain threw: ' + e
            gs.error('[bridge] ' + summary.reason)
            try {
                this._markPeerUnreachable(peerId, summary.reason)
            } catch (e2) {
                gs.error('[bridge] could not record drain failure on the peer: ' + e2)
            }
            return summary
        }
    },

    _drain: function (peerId, summary) {
        if (!this.config.isEnabled()) {
            summary.skipped = true
            summary.reason = 'disabled by ' + BridgeConfig.PROP.enabled
            return summary
        }

        var peer = this.config.peer(peerId)
        if (!peer || !peer.base_url) {
            summary.skipped = true
            summary.reason = 'peer missing or has no base_url'
            return summary
        }

        /**
         * Overlap guard. The job is scheduled every minute; a drain that occasionally
         * takes longer than a minute would otherwise run concurrently with itself and
         * send the same rows twice. An unfinished bridge_run row is the cheapest
         * possible lock — no extra table, no property, and visible to an operator
         * wondering why nothing is moving.
         *
         * A run left open by a node dying would block this peer permanently, so the
         * guard expires: a run older than an hour is treated as abandoned and closed.
         */
        if (this._runInProgress(peerId)) {
            summary.skipped = true
            summary.reason = 'previous drain still in progress'
            return summary
        }

        var runId = this._openRun(peerId)
        this._activeRunId = runId
        try {
            var rows = this._claim(peerId)
            if (rows.length) {
                var response = this._post(peer, rows)
                if (response.ok) {
                    this._applyResults(rows, response, summary)
                    this._markPeerReachable(peerId)
                } else {
                    this._failAll(rows, response.error, summary)
                    this._markPeerUnreachable(peerId, response.error)
                }
            }
        } catch (e) {
            /**
             * Record the failure on the peer row, not just in syslog.
             *
             * §6.6 wants this operable by someone who did not build it, and an exception
             * that only reaches `syslog` is not operable — on these instances `syslog` is
             * not even queryable through the Table API, so a scripting error inside the
             * drain is invisible. Writing it to `bridge_peer.last_error` puts it on the
             * status page next to the peer it concerns.
             */
            summary.reason = 'drain threw: ' + e
            gs.error('[bridge] ' + summary.reason)
            this._markPeerUnreachable(peerId, summary.reason)
        } finally {
            // Always close the run, or the guard above locks this peer out.
            this._closeRun(runId, summary, peerId)
            this._activeRunId = ''
        }

        return summary
    },

    /** Every active peer this instance sends to. Called by the scheduled job. */
    outboundPeers: function () {
        var localPeer = this.config.localPeerId()
        var ids = []
        var gr = new GlideRecord(BridgeConfig.TABLE.peer)
        gr.addActiveQuery()
        if (localPeer) gr.addQuery('sys_id', '!=', localPeer)
        gr.query()
        while (gr.next()) ids.push(gr.getUniqueValue())
        return ids
    },

    /**
     * §6.2 — creation order, batch size from configuration.
     *
     * Picks up `pending` and `failed`, where `failed` rows are only eligible once
     * their backoff has elapsed. `dead` is terminal and never re-read; a DLQ replay
     * resets the row to `pending` instead.
     */
    _claim: function (peerId) {
        var limit = this.config.intProp(BridgeConfig.PROP.batchSize, 200)
        var maxAttempts = this.config.intProp(BridgeConfig.PROP.maxAttempts, 8)

        var rows = []
        var gr = new GlideRecord(BridgeConfig.TABLE.outbox)
        gr.addQuery('peer', peerId)
        gr.addQuery('state', 'IN', 'pending,failed')
        // Path A rows stay at pack_seq 0 and keep creation order among themselves.
        // Pack rows use a higher pack_seq so parents drain before children.
        if (gr.isValidField('pack_seq')) gr.orderBy('pack_seq')
        gr.orderBy('sys_created_on')
        // Over-read, because some failed rows will not be backoff-eligible yet and
        // filtering in the query would need a stored next-attempt time.
        gr.setLimit(limit * 2)
        gr.query()

        while (gr.next() && rows.length < limit) {
            var attempts = parseInt(gr.getValue('attempts'), 10) || 0
            if (attempts >= maxAttempts) {
                // Should already be dead; belt and braces so a row cannot spin forever.
                this._kill(gr, 'attempt cap reached')
                continue
            }
            if (attempts > 0 && !this._backoffElapsed(gr, attempts)) continue

            var payload
            try {
                payload = JSON.parse(gr.getValue('payload') || '{}')
            } catch (e) {
                // A payload that cannot be parsed will never succeed, so retrying it is
                // pointless — this is a dead letter on first sight, not after 8 tries.
                this._kill(gr, 'unparseable payload: ' + e)
                continue
            }

            var correlation = ''
            var ackRequired = false
            try {
                var ack = new BridgeAck()
                correlation = ack.stampPayload(gr, payload)
                ackRequired = ack.requiredForPayload(payload)
            } catch (stampErr) {
                correlation = BridgeAck.correlationFor(gr.getUniqueValue())
                if (correlation && !payload.correlation_id) payload.correlation_id = correlation
                gs.warn('[bridge] correlation stamp failed, using stub: ' + stampErr)
            }
            if (ackRequired) payload.ack_required = true
            rows.push({
                sys_id: gr.getUniqueValue(),
                attempts: attempts,
                payload: payload,
                correlation_id: correlation || payload.correlation_id || '',
            })
        }
        return rows
    },

    _backoffElapsed: function (gr, attempts) {
        var wait = BridgeTransport.BACKOFF_BASE_SECONDS * Math.pow(2, attempts - 1)
        if (wait > BridgeTransport.BACKOFF_CAP_SECONDS) wait = BridgeTransport.BACKOFF_CAP_SECONDS

        // Cutoff comparison on UTC strings, for the same reason as the overlap guard.
        // Fails open: if the age cannot be determined, retry rather than strand the row.
        try {
            var cutoff = new GlideDateTime()
            cutoff.addSeconds(-wait)
            return gr.getValue('sys_updated_on') <= cutoff.getValue()
        } catch (e) {
            gs.error('[bridge] backoff check failed, retrying row anyway: ' + e)
            return true
        }
    },

    /**
     * POST the batch to the same scoped app on the far side.
     *
     * Auth is a Connection & Credential alias with OAuth client credentials (§6.2) —
     * not a system property, not a stored basic-auth password. The alias is resolved
     * through `sn_cc.ConnectionInfoProvider`, which is the platform's own API for
     * this and keeps the secret out of both the codebase and the app's own tables.
     *
     * NOTE: this is the one method in the app that cannot be verified without
     * populated credentials on two instances, so treat the getter names below as
     * needing confirmation during week 1 rather than as known-good. The failure mode
     * is loud (an exception or a 401), which is the right way round.
     */
    _post: function (peer, rows) {
        var items = []
        for (var i = 0; i < rows.length; i++) items.push(rows[i].payload)

        var body = {
            peer: this._localPeerName(),
            items: items,
        }

        try {
            var request = new sn_ws.RESTMessageV2()
            request.setHttpMethod('post')
            request.setEndpoint(peer.base_url + '/api/x_33764_sbridge/sync/apply')
            request.setRequestHeader('Content-Type', 'application/json')
            request.setRequestHeader('Accept', 'application/json')
            request.setRequestBody(JSON.stringify(body))

            this._authorise(request, peer)

            var response = request.execute()
            var status = parseInt(response.getStatusCode(), 10)
            var text = response.getBody()

            if (status < 200 || status > 299) {
                return { ok: false, error: 'HTTP ' + status + ': ' + String(text).substr(0, 1000) }
            }

            var parsed = JSON.parse(text)
            var envelope = parsed && parsed.result && parsed.result.results ? parsed.result : parsed
            var results = envelope ? envelope.results : null
            if (!results) return { ok: false, error: 'response carried no per-item results: ' + String(text).substr(0, 1000) }

            var ackSupported = false
            if (envelope) {
                ackSupported = envelope.ack_supported === true || envelope.acknowledgement === 'received'
            }
            return { ok: true, results: results, ack_supported: ackSupported }
        } catch (e) {
            // A peer being unreachable is the expected case, not an exception worth
            // alarming about: the queue grows, and §7's week-5 acceptance test is
            // exactly this. It becomes visible through lag and the peer's last_error.
            return { ok: false, error: 'transport failed: ' + e }
        }
    },

    /**
     * Attach the peer's credential from its Connection & Credential alias (§6.2).
     *
     * Credentials are resolved through `sn_cc.ConnectionInfoProvider` — the platform's
     * own API for this — so the secret lives in the credential store and never in this
     * codebase, a system property, or one of the app's own tables.
     *
     * When the alias's credential carries Basic Auth attributes (`user_name` /
     * `password`), the request uses `RESTMessageV2.setBasicAuth`. Otherwise OAuth
     * client credentials are attached as before (§6.2).
     *
     * Throws rather than sending unauthenticated. An unauthenticated POST would come
     * back 401, be recorded as a transport failure, and retry until the attempt cap
     * dead-lettered a perfectly good batch — a misconfiguration presenting as data loss.
     * Failing here puts the real reason on the peer's `last_error` instead.
     *
     * NOTE: this is the one method in the app that cannot be exercised without populated
     * credentials on two instances, so treat the accessor names as needing confirmation
     * on the first real install rather than as known-good. Tracked as
     * spec/OPEN_ITEMS.md item 4; the failure mode is loud, which is the right way round.
     */
    _authorise: function (request, peer) {
        // 1. An explicitly configured Connection & Credential alias always wins (§6.2).
        //    Lab peers may use Basic Auth on that alias (username/password credential);
        //    production peers keep OAuth client credentials. Prefer Basic when the
        //    resolved credential actually carries user_name + password so a mis-typed
        //    oauth profile is not forced onto a basic alias.
        if (peer.connection_alias) {
            var info = new sn_cc.ConnectionInfoProvider().getConnectionInfo(peer.connection_alias)
            if (!info) {
                throw 'connection alias ' + peer.connection_alias + ' resolved to no connection info'
            }

            var basicUser = ''
            var basicPass = ''
            try {
                basicUser =
                    info.getCredentialAttribute('user_name') ||
                    info.getCredentialAttribute('username') ||
                    ''
                basicPass = info.getCredentialAttribute('password') || ''
            } catch (ignoredAttr) {
                // Credential type may not expose these attributes (e.g. OAuth-only).
            }
            if ((!basicUser || !basicPass) && info.getCredential) {
                try {
                    var stdCred = info.getCredential()
                    if (stdCred) {
                        if (!basicUser && stdCred.getUsername) basicUser = stdCred.getUsername() || ''
                        if (!basicPass && stdCred.getPassword) basicPass = stdCred.getPassword() || ''
                    }
                } catch (ignoredCred) {
                    // Same: OAuth credentials have no username/password getters that help.
                }
            }
            if (basicUser && basicPass) {
                request.setBasicAuth(basicUser, basicPass)
                return
            }

            // Basic ConnectionInfo may not implement getAttributes. A missing method must
            // not throw; fall through to the OAuth profile path only when it is present.
            var attributes = {}
            try {
                if (info.getAttributes) attributes = info.getAttributes() || {}
            } catch (ignoredGetAttributes) {
                attributes = {}
            }
            request.setAuthenticationProfile(
                'oauth2',
                attributes.authentication_profile || peer.connection_alias
            )
            return
        }

        // 2. An explicitly referenced OAuth profile on the peer row.
        if (peer.oauth_profile) {
            request.setAuthenticationProfile('oauth2', peer.oauth_profile)
            return
        }

        // 3. Otherwise resolve the profile the app itself installed for this peer, by
        //    convention on the peer's name.
        //
        //    This exists so that installing the app and activating a peer is the whole
        //    setup. The alternative was a reference field an admin had to populate on every
        //    instance — and worse, one that could never be shipped to an instance that had
        //    already installed once, because data in the app's own tables applies on first
        //    install only. Deriving it from `peer.name` keeps instance identity in
        //    `bridge_peer` per §10 and adds no configuration surface at all.
        var credential = this.credentialFor(peer)
        if (credential && credential.entityName) {
            this._attachToken(request, peer, credential)
            request.setAuthenticationProfile('oauth2', credential.profileId)
            return
        }

        throw (
            'no credential for peer ' +
            peer.name +
            ': set connection_alias or oauth_profile on the peer row, or ensure the installed ' +
            'OAuth profile "' +
            BridgeTransport.profileName(peer) +
            '" exists and its client_secret is set'
        )
    },

    /**
     * The credential this app ships for a peer: its OAuth profile and, crucially, the name
     * of the OAuth entity that profile hangs off.
     *
     * Looked up by the profile's name and then dot-walked to the entity, rather than
     * building the entity name from a template. The shipped names contain an em dash, and
     * matching that by string literal in two places is a trap — one copy gets normalised and
     * the lookup silently returns nothing.
     */
    credentialFor: function (peer) {
        var gr = new GlideRecord('oauth_entity_profile')
        gr.addQuery('name', BridgeTransport.profileName(peer))
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) return null

        /**
         * Resolved by reading the reference and querying the entity, NOT by dot-walking with
         * `getValue('oauth_entity.name')`. `getValue()` does not reliably dot-walk — it
         * returns empty rather than erroring, so the failure reads as "no credential
         * configured" when the credential is right there.
         */
        var entityName = ''
        var entityId = gr.getValue('oauth_entity')
        if (entityId) {
            var entity = new GlideRecord('oauth_entity')
            if (entity.get(entityId)) entityName = entity.getValue('name')
        }

        return { profileId: gr.getUniqueValue(), entityName: entityName }
    },

    /**
     * Obtain an access token for the peer and set it on the request.
     *
     * `setAuthenticationProfile('oauth2', ...)` alone is not enough for a client-credentials
     * profile: it attaches a *stored* token, and until something has requested one there is
     * nothing stored — so the request goes out with no Authorization header at all and the
     * peer answers `401 User is not authenticated`. That is precisely what happened here, and
     * it is silent from the sender's side because the send itself succeeds.
     *
     * So the token is requested explicitly through `sn_auth.GlideOAuthClient` and set as a
     * bearer header. The profile is still bound afterwards, which lets the platform refresh
     * and reuse the token on subsequent calls rather than minting one per batch.
     */
    _attachToken: function (request, peer, credential) {
        /**
         * The second argument is **JSON**, not a query string.
         *
         * Passing 'grant_type=client_credentials' produces
         * `java.lang.IllegalArgumentException: Cannot decode: java.io.StringReader@...` — the
         * JSON decoder failing on the parameter string, with nothing in the message to suggest
         * that is what happened. A direct POST to the peer's /oauth_token.do with the same
         * credentials returns HTTP 200 and a valid token, which is how this was isolated to
         * the client call rather than the OAuth configuration.
         */
        var client = new sn_auth.GlideOAuthClient()
        var response = client.requestToken(
            credential.entityName,
            JSON.stringify({ grant_type: 'client_credentials' })
        )

        if (!response) {
            throw 'no response requesting a token for OAuth entity "' + credential.entityName + '"'
        }

        var error = response.getErrorMessage ? response.getErrorMessage() : ''
        if (error) {
            throw 'token request failed for "' + credential.entityName + '": ' + error
        }

        var token = response.getToken()
        if (!token) {
            throw 'token request for "' + credential.entityName + '" returned no token'
        }

        var accessToken = token.getAccessToken()
        if (!accessToken) {
            throw 'token for "' + credential.entityName + '" carried no access_token'
        }

        request.setRequestHeader('Authorization', 'Bearer ' + accessToken)
    },

    _localPeerName: function () {
        var peer = this.config.peer(this.config.localPeerId())
        return peer ? peer.name : ''
    },

    /**
     * §6.2 — "so rows are marked individually, not all-or-nothing."
     *
     * Results are matched by `source_sys_id` rather than by position: trusting array
     * order across an HTTP boundary means a peer that reorders or drops one entry
     * silently marks the wrong rows sent.
     */
    _applyResults: function (rows, response, summary) {
        var results = response && response.results ? response.results : response
        if (!results) results = []
        var ackSupported = !!(response && response.ack_supported)
        var byId = {}
        for (var i = 0; i < results.length; i++) {
            if (results[i] && results[i].source_sys_id) byId[results[i].source_sys_id] = results[i]
        }

        for (var r = 0; r < rows.length; r++) {
            var row = rows[r]
            var result = byId[row.payload.source_sys_id]
            var gr = new GlideRecord(BridgeConfig.TABLE.outbox)
            if (!gr.get(row.sys_id)) continue

            if (!result) {
                this._fail(gr, row, 'peer returned no result for this item', summary)
                continue
            }

            // 'skipped' and 'rejected' are both final answers from the target. The
            // target already wrote its own DLQ row for a rejection, so retrying here
            // would only duplicate it. When acknowledgement is required, HTTP 200
            // still settles the outbox (transport) but does not complete the execution.
            if (result.status === 'applied' || result.status === 'skipped' || result.status === 'rejected') {
                gr.setValue('state', 'sent')
                gr.update()
                summary.processed++
                var activeRun = this._activeRunId || ''
                var ackRequired = false
                try {
                    ackRequired = new BridgeAck().requiredForPayload(row.payload)
                } catch (ackErr) {
                    gs.warn('[bridge] ack requirement check failed (treated as not required): ' + ackErr)
                }
                this._shadowDual('settle ' + row.sys_id, function (dw) {
                    dw.onOutboxSettled(row.sys_id, activeRun, {
                        status: result.status,
                        error: result.error || '',
                        httpStatus: 200,
                        attempts: row.attempts,
                        targetSysId: result.target_sys_id || '',
                        operation: result.operation || (result.status === 'skipped' ? 'skip' : ''),
                        ackHold: ackRequired,
                    })
                })
                if (ackRequired) this._noteTransportAck(row, ackSupported)
            } else {
                this._fail(gr, row, result.error || 'peer reported status ' + result.status, summary)
            }
        }
    },

    /**
     * RECEIVED from the additive apply response, then any terminal ACK that
     * landed while this POST was still open.
     */
    _noteTransportAck: function (row, ackSupported) {
        var correlation = row.correlation_id || (row.payload && row.payload.correlation_id) || ''
        if (!correlation) return
        try {
            var ack = new BridgeAck()
            if (ackSupported) {
                ack.handleInboundAck({
                    correlation_id: correlation,
                    ack_stage: 'received',
                    transaction_id: row.payload ? row.payload.source_sys_id || '' : '',
                    record_count: 1,
                    result: 'received',
                })
            }
            ack.reconcile(correlation)
        } catch (e) {
            gs.warn('[bridge] local received ack failed (ignored): ' + e)
        }
    },

    _failAll: function (rows, error, summary) {
        for (var i = 0; i < rows.length; i++) {
            var gr = new GlideRecord(BridgeConfig.TABLE.outbox)
            if (gr.get(rows[i].sys_id)) this._fail(gr, rows[i], error, summary)
        }
    },

    /** Increment attempts, and dead-letter once the cap is reached (§6.2). */
    _fail: function (gr, row, error, summary) {
        var attempts = row.attempts + 1
        var maxAttempts = this.config.intProp(BridgeConfig.PROP.maxAttempts, 8)

        gr.setValue('attempts', attempts)
        var dead = attempts >= maxAttempts
        var dlqId = ''
        if (dead) {
            gr.setValue('state', 'dead')
            gr.update()
            dlqId = this._dlq(gr, error) || ''
        } else {
            gr.setValue('state', 'failed')
            gr.update()
        }
        summary.failed++
        var activeRun = this._activeRunId || ''
        var outboxId = row.sys_id
        this._shadowDual('fail ' + outboxId, function (dw) {
            dw.onOutboxSettled(outboxId, activeRun, {
                status: 'failed',
                error: error,
                dead: dead,
                dlqId: dlqId,
                attempts: attempts,
                httpStatus: this._httpFromError(error),
            })
        })
    },

    _kill: function (gr, error) {
        gr.setValue('state', 'dead')
        gr.update()
        var dlqId = this._dlq(gr, error) || ''
        var outboxId = gr.getUniqueValue()
        var activeRun = this._activeRunId || ''
        var attempts = parseInt(gr.getValue('attempts'), 10) || 0
        this._shadowDual('kill ' + outboxId, function (dw) {
            dw.onOutboxSettled(outboxId, activeRun, {
                status: 'failed',
                error: error,
                dead: true,
                dlqId: dlqId,
                attempts: attempts,
            })
        })
    },

    /**
     * Payload copied by value — Table Cleanup will remove the outbox row eventually.
     *
     * Deduped per outbox row. Without this, an operator who sets a dead row back to
     * `failed` without also clearing `attempts` gets it re-killed on the next tick — the cap
     * check runs before anything else — and a *new* DLQ row every minute. The queue then fills
     * with copies of one failure and the depth alert becomes meaningless. Replay clears both
     * fields, which is the supported path; this makes the unsupported one merely ineffective
     * rather than destructive.
     */
    _dlq: function (outboxGr, error) {
        var existing = new GlideRecord(BridgeConfig.TABLE.dlq)
        existing.addQuery('outbox_ref', outboxGr.getUniqueValue())
        existing.addQuery('resolved', false)
        existing.setLimit(1)
        existing.query()
        if (existing.next()) {
            // Keep the newest reason without adding a row.
            existing.setValue('error', String(error).substr(0, 4000))
            existing.update()
            return existing.getUniqueValue()
        }

        var gr = new GlideRecord(BridgeConfig.TABLE.dlq)
        gr.initialize()
        gr.setValue('outbox_ref', outboxGr.getUniqueValue())
        gr.setValue('error', String(error).substr(0, 4000))
        gr.setValue('payload', outboxGr.getValue('payload'))
        gr.setValue('resolved', false)
        return gr.insert()
    },

    /**
     * Is a drain for this peer genuinely still running?
     *
     * The comparison is done by the database against a cutoff timestamp rather than with
     * per-row date arithmetic in script. That is deliberate: every previous version of this
     * method did the maths in JavaScript, and each one broke differently — `gs.dateDiff`
     * throws in a scoped app, and display-value timestamps skew by the session offset.
     * `addSeconds` plus an encoded query has neither failure mode.
     *
     * **It fails open.** If anything here goes wrong the drain proceeds rather than
     * blocking, because the two outcomes are not symmetric: a duplicate send is a no-op on
     * the target thanks to §3.2's sequence check, while a stuck guard stops the bridge
     * indefinitely and looks exactly like "sync is broken". That is precisely what happened
     * on kkrdev — one unclosed run row wedged the peer for hours.
     */
    _runInProgress: function (peerId) {
        try {
            var cutoff = new GlideDateTime()
            cutoff.addSeconds(-BridgeTransport.ABANDONED_RUN_SECONDS)

            // Close runs older than the cutoff — a node died mid-drain and nothing else
            // will ever close them.
            var stale = new GlideRecord(BridgeConfig.TABLE.run)
            stale.addQuery('peer', peerId)
            stale.addQuery('type', 'drain')
            stale.addNullQuery('ended')
            stale.addQuery('started', '<', cutoff.getValue())
            stale.query()
            while (stale.next()) {
                gs.warn(
                    '[bridge] closing abandoned drain run ' +
                        stale.getUniqueValue() +
                        ' started ' +
                        stale.getValue('started')
                )
                stale.setValue('ended', new GlideDateTime().getValue())
                stale.update()
            }

            // Whatever is still open started inside the window, so treat it as live.
            var open = new GlideRecord(BridgeConfig.TABLE.run)
            open.addQuery('peer', peerId)
            open.addQuery('type', 'drain')
            open.addNullQuery('ended')
            open.setLimit(1)
            open.query()
            return open.hasNext()
        } catch (e) {
            gs.error('[bridge] overlap guard failed, proceeding anyway: ' + e)
            return false
        }
    },

    _openRun: function (peerId) {
        var gr = new GlideRecord(BridgeConfig.TABLE.run)
        gr.initialize()
        gr.setValue('type', 'drain')
        gr.setValue('peer', peerId)
        gr.setValue('started', new GlideDateTime().getValue())
        var id = gr.insert()
        // 0.4.2: BridgeDualWrite ignores type=drain, so this poll does not insert a DEX.
        this._shadowDual('open run', function (dw) {
            dw.onRunOpened(id)
        })
        return id
    },

    _closeRun: function (runId, summary, peerId) {
        if (!runId) return
        var gr = new GlideRecord(BridgeConfig.TABLE.run)
        if (!gr.get(runId)) return
        gr.setValue('ended', new GlideDateTime().getValue())
        gr.setValue('processed', summary.processed)
        gr.setValue('failed', summary.failed)

        /**
         * The lag metric is nice to have; closing the run is not optional.
         *
         * When `lagSeconds()` threw, `ended` was never written and the overlap guard then
         * blocked this peer indefinitely — a reporting detail took the whole bridge down.
         * Anything non-essential between here and `update()` gets its own guard.
         */
        try {
            gr.setValue('max_lag_seconds', this.lagSeconds(peerId))
        } catch (e) {
            gs.error('[bridge] lag metric failed, closing run anyway: ' + e)
        }

        gr.update()
        // 0.4.2: closing a drain run must not complete a shell Data Execution.
        this._shadowDual('close run', function (dw) {
            dw.onRunClosed(runId, summary)
        })
    },

    /**
     * §6.5's lag metric — `max(now - created)` over unprocessed outbox rows.
     *
     * The oldest unprocessed row is the whole answer, so this reads one row rather
     * than aggregating: the index on (peer, state, sys_created_on) makes it a single
     * indexed seek even with a large queue.
     */
    lagSeconds: function (peerId) {
        var gr = new GlideRecord(BridgeConfig.TABLE.outbox)
        gr.addQuery('peer', peerId)
        gr.addQuery('state', 'IN', 'pending,failed')
        if (gr.isValidField('pack_seq')) gr.orderBy('pack_seq')
        gr.orderBy('sys_created_on')
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) return 0

        var created = new GlideDateTime(gr.getValue('sys_created_on'))
        var seconds = Math.floor(
            (new GlideDateTime().getNumericValue() - created.getNumericValue()) / 1000
        )
        return seconds > 0 ? seconds : 0
    },

    _markPeerReachable: function (peerId) {
        var gr = new GlideRecord(BridgeConfig.TABLE.peer)
        if (!gr.get(peerId)) return
        gr.setValue('last_successful_drain', new GlideDateTime().getValue())
        gr.setValue('last_error', '')
        gr.update()
    },

    _markPeerUnreachable: function (peerId, error) {
        var gr = new GlideRecord(BridgeConfig.TABLE.peer)
        if (!gr.get(peerId)) return
        gr.setValue('last_error', String(error).substr(0, 4000))
        gr.update()
    },

    /**
     * Phase 1 dual-write. Never changes drain control flow.
     * @param {string} label
     * @param {function} fn receives BridgeDualWrite
     */
    _shadowDual: function (label, fn) {
        try {
            var dw = new BridgeDualWrite()
            fn.call(this, dw)
        } catch (e) {
            gs.warn('[bridge] dual-write ' + label + ' failed (ignored): ' + e)
        }
    },

    _httpFromError: function (error) {
        var match = /^HTTP\s+(\d+)/.exec(String(error || ''))
        return match ? parseInt(match[1], 10) : ''
    },

    type: 'BridgeTransport',
}
