# Sync Bridge — ServiceNow Data Movement Platform

A ServiceNow Fluent / now-sdk implementation of a controlled, observable cross-instance data movement pattern.

This repository is the engineering source of truth for the Sync Bridge prototype: capture, queueing, transport, apply, execution tracking, monitoring, acknowledgements, and operator-facing controls are developed as a scoped application and validated in non-production ServiceNow instances.

## At a glance

| Area | Approach |
| --- | --- |
| Platform | ServiceNow |
| Development | Fluent / ServiceNow SDK |
| Scope | `x_33764_sbridge` |
| Pattern | Outbox + scheduled drain + peer apply API |
| Reliability | Correlation, receipts, DLQ, execution tracking, staged acknowledgement |
| Safety | PDI-first; no secrets in Git; no production deployment from this repo |

## Engineering goals

- Keep remote I/O out of source-record transactions.
- Make movement observable through executions, transfers, audit, and failure records.
- Support resumable bulk seeding as well as normal capture.
- Keep transport and execution control separated from operator UI logic.
- Maintain an explicit upgrade path from basic delivery to acknowledgement-aware delivery.
- Preserve a Git-first development workflow for SDK-managed application metadata.

---

## Detailed implementation notes

Enhanced rebuild of the kkrdev **Sync Bridge** outbox pattern as a scoped Fluent app for Ali Qaiser.

| | |
|---|---|
| **App name** | Sync Bridge |
| **Scope** | `x_33764_sbridge` |
| **Proposed scope** | `x_33764_sync_bridge` was **19 chars** (SDK max 18) → shortened to `x_33764_sbridge` |
| **SDK** | `@servicenow/sdk` 4.12.2 |
| **App version** | 0.4.0 (staged acknowledgement and correlation) |
| **Target** | PDI `https://dev440454.service-now.com` only (not kkrdev / not prod) |

## Architecture

```
source save → after BR → BridgeCapture (outbox only, no remote I/O)
                              ↓
              BridgeSeed (bulk pages of existing rows, mode=bulk_seed)
                              ↓
         Scheduled drain (only if outbox depth > 0) → BridgeTransport
                              ↓
              peer POST /api/x_33764_sbridge/sync/apply → BridgeApply
                              ↓
              optional POST /api/x_33764_sbridge/sync/v1/ack → BridgeAck
```

## Vertical slice (this repo)

| Piece | Status |
|---|---|
| Tables: peer, policy, outbox, run, receipt, xref, dlq, test_record | Implemented (Fluent) |
| BridgeCapture / Config / Transport / Apply / Api | Implemented (adapted from kkrdev scripts) |
| BridgeSeed (batch 200, resumable cursor, run type `bulk_seed`) | Implemented |
| BridgePolicyHelper + policy after-BR (declarative capture BR) | Implemented |
| Scripted REST: `/apply`, `/seed`, `/ensure_capture` | Implemented |
| Drain job + condition (skip empty outbox) | Implemented |
| BridgeRefTranslate | Minimal (user_name / group_name / identity) |
| BridgeDivergence / compare API / OAuth peer pack | Stubbed / deferred |
| ATF | Minimal stubs (SI load + intent; not green until fixtures) |

## Phase 1 navigator and dual-write

Operator navigation is Overview, Data Movement (Configurations, Data Executions), Monitoring (Transfers, Failed Transfers, Audit), and Administration (Instances, Connections, Mappings, Settings). Developer / Diagnostics is role-gated (`x_33764_sbridge.diagnostics`) and holds sync policies, sync runs, the payload inspector (outbound queue), technical logs, legacy receipt rows, lab test records, and API diagnostics.

Case 1 is unchanged while **Require acknowledgement** is false (the default): capture still writes the outbox, drain still POSTs `/api/x_33764_sbridge/sync/apply` with the connection-alias Basic Auth path, and `/seed` plus `/ensure_capture` stay as they are. `x_33764_sbridge.dual_write` defaults to true and best-effort shadows Data Execution, Transfer, and Transfer Audit (plus processing errors and record results) from those same hooks. A shadow failure is logged and does not fail drain or apply. The peer table is relabeled Instance in place.

## Phase 2 — Data Execution record page (0.2.2)

Opening a Data Execution in the classic UI shows, in order: **Header**, **Scope**, **Counts**, **Timeline**, **Configuration Snapshot** (read-only), and **Notes** with the Activities formatter. The Default view related lists are Transfers, Record Results, Transfer Audits, Processing Errors, and Record Mappings (mappings for this execution's source table and target instance). The Data Executions list shows number, configuration, state, result, selected, failed, started, and completed.

New Data Execution and Transfer rows get `DEX######` / `TRN######` when `GlideRecord.insert()` runs. The number column default is `javascript:getNextObjNumberPadded()`. Shadow inserts call `newRecord()` and do not write an empty `number`. If the field is still nil, dual-write and the before-insert rule call `GlideNumberManager.getNextObjNumberPadded()` (then `NumberManager`, then an update of this app’s `sys_number` row) so the counter cannot stay stuck at 1. Epoch-style values (`DEX1790…`) are not written. Existing epoch numbers are left as historical.

The Default form section **Configuration Snapshot** contains read-only `config_snapshot` (and the Case 1 sync run). 0.2.1 declared that section only through `Form()`. Both PDIs applied the other five sections (Notes already at position 5) and left no snapshot section and no `config_snapshot` element. 0.2.2 does not rely on that `Form()` entry. It writes the section, the two elements, and the Default-view link as their own records (section id `5edf9b4f473a422198044825a384682b`, position 4), drops the author-elective delete for the Phase 1 caption `Configuration snapshot`, and runs fix script **Place DEX snapshot section** after the application files load. That script inserts the same section, `config_snapshot`, `run`, and the form link when the metadata update did not leave them on the instance.

Dual-write still does not change Case 1 movement. It fills state, result, the timestamps Case 1 already knows (started, transfer sent, execution completed), selected/sent/failed plus insert/update/skip counts from the apply result, and a system work note when state changes. `acknowledged_at` and `acknowledged_count` stay empty for a later phase. A UI Builder workspace is not part of this release (Phase 2b).

Configurations keep a **Data Executions** related list and a **View latest execution** form button.

## Phase 5 — Execution control (0.3.1)

Data Movement Configuration still defines what moves. **SyncBridgeExecutionService** decides when and how. Validate, Preview, Dry Run, Execute Now, Schedule, REST `POST /api/x_33764_sbridge/sync/executions`, and `executeFromFlow` all call that service. UI actions and the schedule job do not contain transfer loops and do not call `BridgeTransport`.

**Preview Records** and **Execute Now** open a dialog on the configuration form (GlideAjax to `SyncBridgeExecutionAjax`, which calls the execution service). Close and Cancel leave that form open. Confirm queues a `DEX######` row and opens it. Schedule opens a new execution schedule with `configuration` set on the URL. The preview and execute UI pages remain as hardened fallbacks: Jelly evaluation is marked `jelly="true"`, preview renders `detail_html`, and Cancel/Close always returns to the configuration sys_id (or the configuration list when that id is missing).

Execute Now creates a `DEX######` row (`legacy_key` `ctrl:<sys_id>`) and returns. A continue job pages **BridgeSeed** for the configuration's linked policy. The existing outbox drain still sends. Dry run creates a real DEX and predicts insert, update, and skip counts without enqueueing and without writing transfer `validated` or acknowledgement fields. Concurrent policy defaults to **Prevent**. Queue waits for the current run; Allow starts anyway. Reconcile is a stub. There is no Pause.

Schedules live on `x_33764_sbridge_execution_schedule` (`SCH######`) under Data Movement → Schedules. One platform job calls `executeScheduled` only. Case 1 capture → outbox → drain → `/apply` is unchanged, including the `run:<run sys_id>` dual-write path.

## Live execution progress (0.3.2)

The configuration form opens with a **Live execution** section (`last_execution`, `last_result`, `last_run_at`). A client script mounts a compact panel under the form header and polls `SyncBridgeExecutionAjax.getLiveProgress` about every 1.75 seconds while the tab is visible and the execution is not terminal. The percent is computed on the server from the data execution's state, counts, and milestone timestamps. It does not advance with the clock, and it does not add columns.

Execute Now still confirms in the 0.3.1 dialog. After the data execution is queued, the form stays open so the panel can show that run. A short job may already be finished on the first poll; the panel shows the final summary immediately. Result stays separate from percent: a finished run with warnings is 100% and `successful_with_warnings`. Dry run uses the same panel, with transfer and target weight folded into reading. When nothing is running, the panel shows the last execution and stops polling.

While Prevent is the concurrent policy and a data execution is still open, **Execute Now** becomes **Execution in progress** and opens that record. Dry Run is disabled. The server Prevent check still decides whether a second run may start. There is no Pause and no UI Builder page.

## Staged acknowledgement (0.4.0)

`POST /api/x_33764_sbridge/sync/apply` is unchanged for Case 1. The request may include `correlation_id` on each item (`SB-` plus the outbox sys_id). The response adds `acknowledgement: "received"`, `ack_supported: true`, and `bridge_version`. Older peers ignore those fields.

`POST /api/x_33764_sbridge/sync/v1/ack` is the inbound acknowledgement. It requires `correlation_id` and `ack_stage` (`received`, `completed`, `failed`, `rejected`, and the optional mid stages). The same correlation and stage posted twice is one outcome. The caller is the integration user (`sbridge.worker`), same as `/apply`.

**Require acknowledgement** on the Data Movement Configuration defaults to **false**. Leave the department Case 1 configuration (`0c74f48953e78b50a88275e0a0490e03`) false until both peers are on 0.4.0. When the flag is true, a successful `/apply` sets the transfer to sent and the execution to Awaiting Acknowledgement. `execution_result` is set only from the terminal ACK. Dry run never waits. If the peer omits `ack_supported`, the continue job fails the execution after `x_33764_sbridge.ack.timeout_minutes` (default 30) with a note that the peer does not support ACK.

Live progress uses acknowledgement weight **9** (reading 25, transfer 30, target 18) when the flag is on, and the 0.3.2 weights with `ack_skipped: true` when it is off. The configuration panel shows the ACK stage instead of “Acknowledgement not enabled”. Transfer Audit lists `message_type` (including Ack), `ack_stage`, `acknowledged_at`, and `remote_audit_id`. The Data Execution timeline already shows Acknowledged At.

## Operator runbook (stub)

1. **Install** on both peers (PDI lab first): `npm run build && npm run deploy -a <auth-alias>`
2. **Integration user** — the shipped default is `sbridge.worker`. Blank still fail-closes capture at runtime if an admin clears the property.
3. **Instances** — create a row for *this* instance (`base_url` contains `instance_name`) and one for the remote instance. Keep remote `active=true` only when ready. The physical table is still `x_33764_sbridge_peer`.
4. **Credentials** — set the instance `connection_alias` or OAuth profile (never commit secrets).
5. **Policy** — outbound on source (owner_peer = local), inbound on target. Saving a policy links a Data Movement Configuration and, for outbound, auto-ensures a capture Business Rule. Capture still follows the policy, not the configuration row.
6. **Seed** — `POST /api/x_33764_sbridge/sync/seed` with `{ "policy": "<sys_id>" }` as the integration user. Repeat with `run_id` until `done: true`. Does **not** update source rows. A Data Execution shadow is written when dual-write is on.
7. **Monitor** — Data Executions, Transfers, Failed Transfers, and Audit. Legacy queue and technical logs are under Developer / Diagnostics. Watch `last_error` on the instance and lag on sync runs.

## Scripts

```bash
npm install
npm run build          # now-sdk build
npm run deploy         # now-sdk install (needs auth)
npm run types          # now-sdk dependencies
npm run auth:list      # list SDK credentials
```

## Auth notes (PDI)

Basic auth to `dev440454` as `qaisa1` currently returns **401**. Configure SDK auth (basic or OAuth / UI session) before deploy:

```bash
# non-interactive basic (pipe password; do not echo)
echo "$SERVICENOW_PDI_PASSWORD" | npx now-sdk auth --add https://dev440454.service-now.com \
  --type basic --alias pdi --username qaisa1 --password-stdin
npx now-sdk auth --use pdi
```

If basic remains 401, use interactive OAuth / browser session per ServiceNow SDK auth guide. **Do not** commit `.env` or credentials.

## Constraints

- No secrets in git
- Do **not** deploy to KKR production
- Prefer PDI; promote to kkrdev only when Ali asks
