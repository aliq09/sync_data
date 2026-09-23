# Sync Bridge (Fluent / now-sdk)

Enhanced rebuild of the kkrdev **Sync Bridge** outbox pattern as a scoped Fluent app for Ali Qaiser.

| | |
|---|---|
| **App name** | Sync Bridge |
| **Scope** | `x_33764_sbridge` |
| **Proposed scope** | `x_33764_sync_bridge` was **19 chars** (SDK max 18) → shortened to `x_33764_sbridge` |
| **SDK** | `@servicenow/sdk` 4.12.2 |
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

## Operator runbook (stub)

1. **Install** on both peers (PDI lab first): `npm run build && npm run deploy -a <auth-alias>`
2. **Integration user** — create a named account; set `x_33764_sbridge.integration_user` to its `user_name`. Blank = capture off (fail closed).
3. **Peers** — create a row for *this* instance (`base_url` contains `instance_name`) and one for the remote peer. Keep remote `active=true` only when ready.
4. **Credentials** — set peer `connection_alias` or OAuth profile (never commit secrets).
5. **Policy** — outbound on source (owner_peer = local), inbound on target. Saving an outbound policy auto-ensures a capture Business Rule.
6. **Seed** — `POST /api/x_33764_sbridge/sync/seed` with `{ "policy": "<sys_id>" }` as the integration user. Repeat with `run_id` until `done: true`. Does **not** update source rows.
7. **Monitor** — Runs / Outbox / DLQ modules; watch `last_error` on peer and lag on runs.

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
