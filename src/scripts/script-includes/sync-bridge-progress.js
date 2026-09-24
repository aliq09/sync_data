/**
 * Deterministic live-progress math for one Data Execution snapshot.
 * Same fields always produce the same percent. No clock, no writes, no new columns.
 * Acknowledgement weight is 9 when the execution requires acknowledgement.
 * Otherwise it stays 0 and ack_skipped is true (Case 1 and dry run).
 *
 * Execute, acknowledgement off (sum 100): queued 3, validating 5, preparing 5,
 * reading 27, transfer 35, target 20, acknowledgement 0, finalising 5.
 * Execute, acknowledgement on (sum 100): queued 3, validating 5, preparing 5,
 * reading 25, transfer 30, target 18, acknowledgement 9, finalising 5.
 * Dry run folds transfer, target, and acknowledgement into reading (82).
 * Non-terminal percents clamp to 0..99. Completed is 100. Result is not a percent.
 */
var SyncBridgeProgress = Class.create()
SyncBridgeProgress.prototype = {
    initialize: function () {},

    compute: function (snap) {
        snap = snap || {}
        var mode = (snap.execution_mode || '') + ''
        var state = (snap.execution_state || '') + ''
        var counts = {
            selected: this._n(snap.selected_count),
            sent: this._n(snap.sent_count),
            inserted: this._n(snap.inserted_count),
            updated: this._n(snap.updated_count),
            skipped: this._n(snap.skipped_count),
            failed: this._n(snap.failed_count),
        }
        var ackEnabled = snap.ack_enabled === true && mode !== 'dry_run'
        var weights = this._weights(mode, ackEnabled)
        var number = snap.number || 'execution'
        var ackDetail = this._ackDetail(snap, ackEnabled)

        if (state === 'completed') {
            var doneLabel = this._resultLabel(snap.execution_result)
            return this._out(
                100,
                'completed',
                doneLabel ? 'Completed — ' + doneLabel : 'Completed',
                false,
                ackEnabled,
                ackDetail
            )
        }

        if (state === 'cancelled') {
            var inferred = this._inferCancelled(snap, counts, mode)
            return this._out(
                this._percentFor(inferred.stage, inferred.ratio, weights),
                'cancelled',
                'Cancelled — ' + number,
                false,
                ackEnabled,
                ackDetail
            )
        }

        if (state === 'awaiting_acknowledgement' && !ackEnabled) {
            return this._out(
                this._percentFor('finalising', 1, weights),
                'finalising',
                'Acknowledgement skipped (not enabled)',
                false,
                false,
                ''
            )
        }

        if (!state || state === 'draft') {
            if (state === 'draft') return this._out(0, 'draft', this._prefix(mode) + 'Draft ' + number, false, ackEnabled, ackDetail)
            return this._out(0, 'idle', 'No execution yet', false, false, '')
        }

        var stage = this._stageForState(state)
        var intra = this._intra(stage, snap, counts)
        if (mode === 'dry_run' && (stage === 'transfer' || stage === 'target' || stage === 'ack')) {
            stage = 'reading'
            intra = { ratio: 1, indeterminate: false }
        }
        return this._out(
            this._percentFor(stage, intra.ratio, weights),
            stage,
            this._message(stage, counts, number, mode, intra, snap, ackEnabled),
            !!intra.indeterminate,
            ackEnabled,
            stage === 'ack' ? this._ackDetail(snap, true) : ackDetail
        )
    },

    labelResult: function (result) {
        return this._resultLabel(result)
    },

    _out: function (percent, stageKey, message, indeterminate, ackEnabled, ackDetail) {
        return {
            percent: percent,
            stage_key: stageKey,
            message: message,
            indeterminate: indeterminate,
            ack_skipped: !ackEnabled,
            ack_detail: ackDetail || '',
        }
    },

    _weights: function (mode, ackEnabled) {
        if (mode === 'dry_run') {
            return {
                queued: 3,
                validating: 5,
                preparing: 5,
                reading: 82,
                transfer: 0,
                target: 0,
                ack: 0,
                finalising: 5,
            }
        }
        if (ackEnabled) {
            return {
                queued: 3,
                validating: 5,
                preparing: 5,
                reading: 25,
                transfer: 30,
                target: 18,
                ack: 9,
                finalising: 5,
            }
        }
        return {
            queued: 3,
            validating: 5,
            preparing: 5,
            reading: 27,
            transfer: 35,
            target: 20,
            ack: 0,
            finalising: 5,
        }
    },

    _stageForState: function (state) {
        var map = {
            queued: 'queued',
            validating: 'validating',
            preparing: 'preparing',
            reading_source: 'reading',
            sending: 'transfer',
            awaiting_receipt: 'transfer',
            received: 'target',
            processing_target: 'target',
            awaiting_acknowledgement: 'ack',
            finalising: 'finalising',
        }
        return map[state] || 'queued'
    },

    _intra: function (stage, snap, counts) {
        if (stage === 'reading') {
            if (snap.source_read_completed_at) return { ratio: 1, indeterminate: false }
            return { ratio: 0.05, indeterminate: true }
        }
        if (stage === 'transfer') {
            return { ratio: this._ratio(counts.sent, counts.selected), indeterminate: false }
        }
        if (stage === 'target') {
            var outcomes = counts.inserted + counts.updated + counts.skipped + counts.failed
            if (outcomes <= 0) return { ratio: 0, indeterminate: false }
            var denom = counts.selected > 0 ? counts.selected : 1
            var ratio = outcomes / denom
            if (ratio < 0) ratio = 0
            if (ratio > 1) ratio = 1
            return { ratio: ratio, indeterminate: false }
        }
        return { ratio: 1, indeterminate: false }
    },

    _ratio: function (part, total) {
        if (!(total > 0)) return 0
        var ratio = part / total
        if (ratio < 0) return 0
        if (ratio > 1) return 1
        return ratio
    },

    _percentFor: function (stage, ratio, weights) {
        var order = ['queued', 'validating', 'preparing', 'reading', 'transfer', 'target', 'ack', 'finalising']
        var found = false
        var base = 0
        var i
        for (i = 0; i < order.length; i++) {
            if (order[i] === stage) {
                found = true
                break
            }
            base += weights[order[i]] || 0
        }
        if (!found) return 0
        if (ratio < 0) ratio = 0
        if (ratio > 1) ratio = 1
        var pct = Math.round(base + (weights[stage] || 0) * ratio)
        if (pct < 0) pct = 0
        if (pct > 99) pct = 99
        return pct
    },

    _inferCancelled: function (snap, counts, mode) {
        var outcomes = counts.inserted + counts.updated + counts.skipped + counts.failed
        var stage = 'draft'
        var ratio = 0
        if (snap.target_processing_completed_at || snap.target_received_at || outcomes > 0) {
            stage = 'target'
            if (outcomes <= 0) ratio = 0
            else {
                var denom = counts.selected > 0 ? counts.selected : 1
                ratio = outcomes / denom
            }
        } else if (snap.transfer_completed_at) {
            stage = 'transfer'
            ratio = 1
        } else if (snap.transfer_sent_at || counts.sent > 0) {
            stage = 'transfer'
            ratio = this._ratio(counts.sent, counts.selected)
        } else if (snap.source_read_completed_at) {
            stage = 'reading'
            ratio = 1
        } else if (counts.selected > 0) {
            stage = 'reading'
            ratio = 0.05
        } else if (snap.queued_at || snap.started_at) {
            stage = 'queued'
            ratio = 1
        }
        if (mode === 'dry_run' && (stage === 'transfer' || stage === 'target' || stage === 'ack')) {
            stage = 'reading'
            ratio = 1
        }
        if (ratio < 0) ratio = 0
        if (ratio > 1) ratio = 1
        return { stage: stage, ratio: ratio }
    },

    _message: function (stage, counts, number, mode, intra, snap) {
        var prefix = this._prefix(mode)
        if (stage === 'queued') return prefix + 'Queued ' + number
        if (stage === 'validating') return prefix + 'Validating ' + number
        if (stage === 'preparing') return prefix + 'Preparing ' + number
        if (stage === 'reading') {
            if (intra && intra.indeterminate) return prefix + 'Reading source — ' + counts.selected + ' selected so far'
            return prefix + 'Reading source — ' + counts.selected + ' selected'
        }
        if (stage === 'transfer') return prefix + 'Transferring — ' + counts.sent + '/' + counts.selected + ' sent'
        if (stage === 'target') {
            var outcomes = counts.inserted + counts.updated + counts.skipped + counts.failed
            if (outcomes > 0) return prefix + 'Applied — ' + counts.updated + ' updated, ' + counts.failed + ' failed'
            return prefix + 'Processing target'
        }
        if (stage === 'ack') return this._ackDetail(snap, true) || prefix + 'Awaiting acknowledgement'
        if (stage === 'finalising') return prefix + 'Finalising ' + number
        return prefix + number
    },

    _ackDetail: function (snap, ackEnabled) {
        if (!ackEnabled) return ''
        snap = snap || {}
        var stage = String(snap.ack_stage || '').toLowerCase()
        var updated = this._n(snap.updated_count)
        var inserted = this._n(snap.inserted_count)
        var error = snap.ack_error ? String(snap.ack_error) : ''
        if (stage === 'completed') {
            return 'Acknowledgement COMPLETED — ' + updated + ' updated, ' + inserted + ' inserted'
        }
        if (stage === 'failed') return 'Acknowledgement FAILED' + (error ? ' — ' + error : '')
        if (stage === 'rejected') return 'Acknowledgement REJECTED' + (error ? ' — ' + error : '')
        if (stage === 'processed' || stage === 'validated' || stage === 'accepted') {
            return 'Awaiting acknowledgement — ' + stage.toUpperCase()
        }
        if (stage === 'received' || snap.execution_state === 'awaiting_acknowledgement' || snap.target_received_at) {
            return 'Awaiting acknowledgement — RECEIVED'
        }
        if (snap.execution_state === 'completed') {
            var result = snap.execution_result || ''
            if (result === 'failed') return 'Acknowledgement FAILED'
            return 'Acknowledgement COMPLETED — ' + updated + ' updated, ' + inserted + ' inserted'
        }
        return 'Awaiting acknowledgement'
    },

    _prefix: function (mode) {
        return mode === 'dry_run' ? 'Dry run — ' : ''
    },

    _resultLabel: function (result) {
        var map = {
            successful: 'Successful',
            successful_with_warnings: 'Successful with warnings',
            partially_completed: 'Partially completed',
            failed: 'Failed',
            cancelled: 'Cancelled',
        }
        return map[(result || '') + ''] || ''
    },

    _n: function (value) {
        var n = parseInt(value, 10)
        if (isNaN(n) || n < 0) return 0
        return n
    },

    type: 'SyncBridgeProgress',
}
