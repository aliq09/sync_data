# Sync Bridge (Fluent / now-sdk)

Enhanced rebuild of the kkrdev **Sync Bridge** outbox pattern as a scoped Fluent app for Ali Qaiser.

| | |
|---|---|
| **App name** | Sync Bridge |
| **Scope** | `x_33764_sbridge` |
| **Proposed scope** | `x_33764_sync_bridge` was **19 chars** (SDK max 18) → shortened to `x_33764_sbridge` |
| **SDK** | `@servicenow/sdk` 4.12.2 |
| **App version** | 0.2.0 (Phase 2 Data Execution record page) |
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

Case 1 is unchanged: capture still writes the outbox, drain still POSTs `/api/x_33764_sbridge/sync/apply` with the connection-alias Basic Auth path, and `/seed` plus `/ensure_capture` stay as they are. `x_33764_sbridge.dual_write` defaults to true and best-effort shadows Data Execution, Transfer, and Transfer Audit (plus processing errors and record results) from those same hooks. A shadow failure is logged and does not fail drain or apply. The peer table is relabeled Instance in place. There is no staged acknowledgement rewrite in this release.

## Phase 2 — Data Execution record page (0.2.0)

Opening a Data Execution in the classic UI shows, in order: **Header**, **Scope**, **Counts**, **Timeline**, **Configuration Snapshot** (read-only), and **Notes** with the Activities formatter. The Default view related lists are Transfers, Record Results, Transfer Audits, Processing Errors, and Record Mappings (mappings for this execution's source table and target instance). The Data Executions list shows number, configuration, state, result, selected, failed, started, and completed.

New Data Execution and Transfer rows leave `number` empty on insert. The table number attribute assigns `DEX000001` / `TRN000001`. The before-insert rule that wrote `DEX` plus epoch milliseconds (`DEX1790…`) is inactive and no longer assigns a number. Existing epoch-style numbers are not rewritten.

Dual-write still does not change Case 1 movement. It fills state, result, the timestamps Case 1 already knows (started, transfer sent, execution completed), selected/sent/failed plus insert/update/skip counts from the apply result, and a system work note when state changes. `acknowledged_at` and `acknowledged_count` stay empty for a later phase. A UI Builder workspace is not part of 0.2.0 (Phase 2b).

Configurations keep a **Data Executions** related list and a **View latest execution** form button.

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
