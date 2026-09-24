# Sync Bridge (Fluent / now-sdk)

Enhanced rebuild of the kkrdev **Sync Bridge** outbox pattern as a scoped Fluent app for Ali Qaiser.

| | |
|---|---|
| **App name** | Sync Bridge |
| **Scope** | `x_33764_sbridge` |
| **Proposed scope** | `x_33764_sync_bridge` was **19 chars** (SDK max 18) → shortened to `x_33764_sbridge` |
| **SDK** | `@servicenow/sdk` 4.12.2 |
| **App version** | 0.4.1 (Case 2 worker ACLs and reference remap) |
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
| BridgeRefTranslate | user_name / group_name / identity, plus Record Mapping xref (0.4.1) |
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

## Apply worker ACLs and reference remap (0.4.1)

Case 2 apply runs as the integration user (`sbridge.worker` by default), which holds `x_33764_sbridge.operator`. 0.4.0 could insert `cmdb_ci_computer` and `alm_hardware` and rejected `sys_script` and `sc_cat_item` with `insert into {table} returned no sys_id`.

**Role.** `x_33764_sbridge.worker` is contained by `x_33764_sbridge.operator`, so the existing integration user inherits it when this version is installed. Record ACLs also list `x_33764_sbridge.operator` directly. Every metadata ACL script requires `gs.getUserName()` to equal `x_33764_sbridge.integration_user`, so other operator accounts do not gain these writes. Do not run apply as admin to prove the path.

| Table | Operations | Fields |
|---|---|---|
| `sys_script` | read, create, write | `*`, plus `script`, `condition`, `filter_condition`, `advanced` |
| `sc_cat_item` | read, create, write | `*` |
| `item_option_new` | read, create, write | `*`, plus `cat_item` |

A `*` field rule does not override a more specific field rule, which is why `sys_script.script` is granted on its own.

**Record Mapping.** After each successful upsert, including CMDB mode, apply upserts `x_33764_sbridge_xref` (`peer` + `source_table` + `source_sys_id` → `target_sys_id`).

**Reference remap.** Before insert or update, apply resolves references:

1. `user_name` and `group_name` are unchanged.
2. `identity` and `preserve` on a ref_map entry keep the source sys_id. Movement-config **Reference handling** `preserve` does the same for fields with no entry.
3. `xref`, `record_mapping`, `mapping`, or `business_key` look up Record Mapping first (same source sys_id, preferring the entry's `table` when set, then any table). If that misses and `business_key` is set, apply queries the target table with the keys captured in payload `ref_keys`. A miss nulls the field and writes a DLQ note.
4. Any other reference field (and glide_list) is remapped when a Record Mapping exists. A miss keeps the source sys_id. `sys_user` and `sys_user_group` stay on the user/group strategies so department head and group fields are left alone. `alm_hardware.ci` (reference `cmdb_ci`) and `item_option_new.cat_item` (reference `sc_cat_item`) follow this path with no ref_map entry required.

Example ref_map when a business-key fallback is wanted:

```json
{
  "ci": { "strategy": "xref", "table": "cmdb_ci_computer", "business_key": "name" },
  "cat_item": { "strategy": "xref", "table": "sc_cat_item", "business_key": "name" }
}
```

Apply the referenced table first (CI before hardware, catalog item before variables) so the mapping exists. Re-applying hardware or variables after the mapping exists rewrites `ci` and `cat_item`.

**Case 1 smoke.** Department capture, the integration-user echo skip, drain, and `/apply` are the same path. `ack_required` on configuration `0c74f48953e78b50a88275e0a0490e03` stays false. Re-execute that movement as `sbridge.worker` and confirm each `SBMOVE` department updates the existing target row (receipt, then Record Mapping) instead of inserting a duplicate. Reference fields on `cmn_department` change on that re-apply only when a Record Mapping exists for the source sys_id and **Reference handling** is Resolve (the default). User and group references are unchanged by the xref path. A configuration set to Preserve keeps source sys_ids.

## Operator runbook (stub)

1. **Install** on both peers (PDI lab first): `npm run build && npm run deploy -a <auth-alias>`
2. **Integration user** — the shipped default is `sbridge.worker`, with roles `x_33764_sbridge.operator` (contains `x_33764_sbridge.worker`) and `x_33764_sbridge.reader`. Metadata ACLs allow that user to create and update `sys_script`, `sc_cat_item`, and `item_option_new`. Blank still fail-closes capture at runtime if an admin clears the property.
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
