# Sync Bridge (Fluent / now-sdk)

Enhanced rebuild of the kkrdev **Sync Bridge** outbox pattern as a scoped Fluent app for Ali Qaiser.

| | |
|---|---|
| **App name** | Sync Bridge |
| **Scope** | `x_33764_sbridge` |
| **Proposed scope** | `x_33764_sync_bridge` was **19 chars** (SDK max 18) → shortened to `x_33764_sbridge` |
| **SDK** | `@servicenow/sdk` 4.12.2 |
| **App version** | 0.4.6 (software-instance apply; includes 0.4.5 global metadata writer, 0.4.4 Case 1 DETAILED fields and child FK xref, 0.4.3 metadata apply, 0.4.2 empty Data Execution hygiene, and 0.4.1 ACL/xref) |
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
| BridgeRefTranslate | user_name / group_name / identity, Record Mapping xref (0.4.1), Path A child FKs (0.4.4) |
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

## Apply worker ACLs (0.4.3)

Apply runs as the integration user (`sbridge.worker` by default). `/apply` rejects any other caller. Do not run apply as admin to prove Cases 5, 6, 7, or 9. Do not grant the `admin` role to `sbridge.worker`.

**How ACL evaluation actually works.** Allow-If rules at the same point are OR: passing any one grants that level. Inside a single rule, the role list, the condition, and the script are AND. Deny-Unless rules are evaluated first, and every matching Deny-Unless must pass. A scoped Allow-If does not cancel a failed Deny-Unless. Table create and each field write are separate checks. A `*` field rule does not override a more specific field rule.

**Why 0.4.1 still failed with the scoped ACLs present.** PDI2 already showed Sync Bridge allow rules for `sys_script` and `sc_cat_item` create/write, and Cases 5 and 6 still failed outbox as `sbridge.worker`. That is what a Deny-Unless looks like: the out-of-box create rules (`admin` on `sys_script`, `catalog_admin` on `sc_cat_item`, `user_admin` / `itil` on `sys_user_group`) and, on Zurich and later, the data-type Deny-Unless rules on `script` and `condition_string` (`snc_required_script_writer_permission`). Admin does not skip the script data-type rules. PDI2's login build date is 06-12-2026, which is in that family. `item_option_new` has no equivalent gate, which is why Case 7 rows landed. 0.4.1 also did not cover `sys_user_group` (Case 9). The 0.4.1 ACL script is gone either way: an ACL script that calls `gs.getProperty` can fail closed, and `/apply` already checks the integration user.

**Role.** `x_33764_sbridge.worker` is what the metadata ACLs check. `x_33764_sbridge.operator` contains it, and every rule lists both roles. The install fix script assigns `x_33764_sbridge.worker` directly to the user named by `x_33764_sbridge.integration_user` and logs `worker=`, `operator=`, and `admin=` for that user. It does not grant operator or admin. There is no ACL script. This repo cannot read PDI2 role rows until that install log (the PDI2 connection was not available from this session).

**Metadata write fallback.** Role allow rules remain the first attempt, so a table with no Deny-Unless (Case 7, Case 1) never leaves the integration user. When insert or update of `sys_script`, `sc_cat_item`, `item_option_new`, or `sys_user_group` returns no sys_id and the failure looks like security (`canCreate`/`canWrite` false, an empty platform message, or an access error), apply retries once through `global.SyncBridgeMetadataWrite`. Global `GlideRecord` is the platform path that does not apply the scoped ACL evaluator, so a Deny-Unless admin or script-writer rule does not block it. The session user is still the integration user (`sys_created_by` stays that user). The writer accepts only those four tables, only insert and update, and only a session token that apply sets for the call. It does not impersonate and it does not grant `admin`. Each success is `gs.info` and a Transfer Audit row with `result=metadata_privilege` (the note is in the error column; the apply result stays applied). The apply response includes `privilege: "global_metadata_writer"`. A validation message that is not an access refusal is not retried.

Fluent cannot ship that script include. `apiName` must start with `x_33764_sbridge.`, and a scoped `GlideRecord` insert is stamped into this application. On Zurich, `GlideUpdateManager2` is refused from a scoped fix script (`Invalid object in scoped script: UpdateManager2`), which is why the 0.4.4 install logged `loadXML refused` and then `metadata writer insert failed`.

0.4.5 publishes it the same way the manual admin step did. Fix script **Publish global SyncBridgeMetadataWrite** calls the Table API as the installing user: `POST` or `PATCH` `api/now/table/sys_script_include?sysparm_transaction_scope=global`. That request is a new transaction, so the app-install thread does not stamp the row into `x_33764_sbridge`. Accessible from = All application scopes. Caller Access = Caller Tracking. API name = `global.SyncBridgeMetadataWrite`. The worker is not granted admin.

If that call does not leave a callable global row, the same fix script queues a one-time `sys_trigger` (run once, about 15 seconds later) whose script upserts the include outside the install thread. An app-scoped row that already exists is still offered to `sn_gfiles.GlobalApp.moveMetadata`. UpdateManager2 is not called.

**Why earlier installs still reported `SyncBridgeMetadataWrite is not installed in global`.** A fix script runs once per record. 0.4.3 and 0.4.4 each added a record, and those already ran. 0.4.5 adds **Publish global SyncBridgeMetadataWrite** so the upgrade runs the new publisher.

Confirm after install, before re-running Cases 5, 6, 7, and 9:

- System log contains `[bridge] metadata writer callable as global.SyncBridgeMetadataWrite scope=global api_name=global.SyncBridgeMetadataWrite access=public`.
- **System Definition → Script Includes**, name `SyncBridgeMetadataWrite`, Application **Global**, API Name `global.SyncBridgeMetadataWrite`, Accessible from **All application scopes**. An app-scoped row with API Name `x_33764_sbridge.SyncBridgeMetadataWrite` is not the one apply calls.

| Table | Record operations | Field operations |
|---|---|---|
| `sys_script` | read, create, write | `*`, `script`, `condition`, `filter_condition`, `advanced`, action/when/collection fields, and `sys_metadata` columns (`sys_scope`, `sys_class_name`, `sys_package`, `sys_policy`, `sys_update_name`, `sys_name`) |
| `sc_cat_item` | read, create, write | `*`, name/description/price/catalog/category/workflow/flow/roles, and the same `sys_metadata` columns |
| `item_option_new` | read, create, write | `*`, `cat_item`, and the variable fields apply writes (`name`, `question_text`, `type`, `order`, `mandatory`, `reference`, `default_value`, `variable_set`, `active`, `description`) |
| `sys_user_group` | read, create, write | `*`, plus `name`, `description`, `email`, `manager`, `parent`, `type`, `active`, `source`, `roles`, `default_assignee`, `include_members`, `cost_center`, `exclude_manager` |

**Application access.** Record ACLs do not override a global table's Can read / Can create / Can update flags, and a cross-scope privilege cannot raise that ceiling. The same fix script sets those three flags (and Accessible from = All application scopes) on `sys_script`, `sc_cat_item`, `item_option_new`, and `sys_user_group`. It runs as the installing admin and does not impersonate the worker. If the install log says a flag was not saved, open that table in the Global application and check Can read, Can create, and Can update by hand. Delete stays off.

**Cross-scope privileges.** Allowed read, write, and create privileges are shipped for those four tables so Enforcing runtime-access tracking does not refuse the call after the flags are on. An execute privilege for `SyncBridgeMetadataWrite` in global is shipped for the same reason. Delete is not granted.

A failed insert or update now appends `canCreate` / `canWrite` and `getLastErrorMessage()` to `insert into {table} returned no sys_id`, so the next outbox row shows an ACL denial separately from a cross-scope ceiling.

**Record Mapping.** After each successful upsert, including CMDB mode, apply upserts `x_33764_sbridge_xref` (`peer` + `source_table` + `source_sys_id` → `target_sys_id`).

**Reference remap.** Before insert or update, apply resolves references:

1. `user_name` and `group_name` are unchanged.
2. `identity` and `preserve` on a ref_map entry keep the source sys_id. Movement-config **Reference handling** `preserve` does the same for fields with no entry.
3. `xref`, `record_mapping`, `mapping`, or `business_key` look up Record Mapping first (same source sys_id, preferring the entry's `table` when set, then any table). If that misses and `business_key` is set, apply queries the target table with the keys captured in payload `ref_keys`. A miss nulls the field and writes a DLQ note.
4. Any other reference field (and glide_list) is remapped when a Record Mapping exists. A miss keeps the source sys_id. `sys_user` and `sys_user_group` stay on the user/group strategies so department head and group fields are left alone. `alm_hardware.ci` (reference `cmdb_ci`) and `item_option_new.cat_item` (reference `sc_cat_item`) follow this path with no ref_map entry required. 0.4.4 uses this same path for the Path A child foreign keys listed under Case 1 DETAILED.

Example ref_map when a business-key fallback is wanted:

```json
{
  "ci": { "strategy": "xref", "table": "cmdb_ci_computer", "business_key": "name" },
  "cat_item": { "strategy": "xref", "table": "sc_cat_item", "business_key": "name" }
}
```

Apply the referenced table first (CI before hardware, catalog item before variables) so the mapping exists. Re-applying hardware or variables after the mapping exists rewrites `ci` and `cat_item`.

**Case 1 smoke.** Department capture, the integration-user echo skip, drain, and `/apply` are the same path. `ack_required` on configuration `0c74f48953e78b50a88275e0a0490e03` stays false. Re-execute that movement as `sbridge.worker` and confirm each `SBMOVE` department updates the existing target row (receipt, then Record Mapping) instead of inserting a duplicate. Reference fields on `cmn_department` change on that re-apply only when a Record Mapping exists for the source sys_id and **Reference handling** is Resolve (the default). User and group references are unchanged by the xref path. A configuration set to Preserve keeps source sys_ids.

## Empty Data Execution hygiene (0.4.2)

Kept on 0.4.3. These guards are in this build, so installing it on a 0.4.2 instance does not remove them.

0.4.2 stopped empty Data Execution rows. It did not change the 0.4.1 Record Mapping xref.

`BridgeTransport.drain` opens a new sync run on every poll. Dual-write treated that run like a movement and inserted `x_33764_sbridge_data_execution` with `legacy_key` `run:<drain run>`. A drain run has no seed policy, so **Configuration** stayed empty. Closing the run then set **State** = Completed and **Result** = Successful, often with the same selected count as the real execution a second earlier. The next poll inserted another shell. `continueQueued` does not insert a Data Execution; it only pages controller rows that already have a configuration.

Rules in this version:

- A Data Execution is inserted only when `configuration` is set. There is no `internal_probe` type.
- Completed / Successful is set only on that configured row, after a real source read or apply (or an explicit dry run). A drain poll does not complete a shell.
- `continueQueued` and `drain` update the existing controller execution or no-op. They do not insert a DEX per call.
- **Data Executions** and **Overview** use the list filter `configurationISNOTEMPTY`. A before-query rule applies the same hide when the list is opened without that module. Loading one row by `sys_id` still works.
- Admins see an info message on the configuration and data execution forms while any orphan remains, and **Data Movement → Orphan executions** (role `x_33764_sbridge.admin`) opens the review list.

**Orphan cleanup (review, do not auto-delete).** Existing empty rows are left in place. There is no fix script and no production job that deletes them. On a lab instance, an admin may delete after review:

| | |
|---|---|
| Table | `x_33764_sbridge_data_execution` |
| Encoded query | `configurationISEMPTY` |

That is the same filter as **Orphan executions**. Clear the default `configurationISNOTEMPTY` filter only by opening that module (or by pasting `configurationISEMPTY`). Do not run that delete on a customer production instance from this app.

## Case 1 DETAILED computer fields and child references (0.4.4)

Kept from 0.4.3: empty Data Execution guards, the metadata writer, and Case 2 `alm_hardware.ci` xref. This does not add a Path B multi-table expand pack. It only sends a fuller computer field set and remaps foreign keys that are already in the payload.

**Why the computer form was thin.** Capture and BridgeSeed copy `policy.field_list` and nothing else. The CASE1-COMP-DETAILED policy list is the eight `cmdb_ci` fields (`name`, `short_description`, `operational_status`, `install_status`, `serial_number`, `asset_tag`, `category`, `subcategory`), so `os`, `os_version`, `ip_address`, `manufacturer`, `model_id`, `ram`, `cpu_count`, `cpu_core_count`, and `discovery_source` never entered `values`.

**Include-list.** For `cmdb_ci_computer` and any subclass, capture unions that policy list with `x_33764_sbridge.cmdb_computer_fields`. Blank uses the built-in computer set (the eight fields above plus the standard computer attributes). Set the property to `off` to keep only the policy list. A field that is not on that class is skipped. `cmn_department` is not a computer, so the Case 1 department payload is unchanged.

Computer user and group references with no ref_map strategy are sent as `user_name` / `group_name` (`natural_keys` on the payload) so apply can resolve them. `manufacturer`, `model_id`, `location`, `department`, `company`, `vendor`, `cost_center`, and `asset` keep the source sys_id and stamp `ref_keys` for a business-key fallback after Record Mapping. An implicit miss keeps the source sys_id and does not dead-letter the row.

**Child foreign keys.** The same xref-first path as `alm_hardware.ci` now knows these fields when dictionary metadata is missing, and capture stamps a business key (`name`, or `display_name` / `asset_tag` where that is the key) when the payload already contains the field:

| Table | Fields |
|---|---|
| `cmdb_ci_network_adapter` | `cmdb_ci` |
| `cmdb_serial_number` | `cmdb_ci` |
| `cmdb_ci_disk`, `cmdb_ci_disk_partition`, `cmdb_ci_storage_device`, `cmdb_ci_storage_volume` | `computer`, `cmdb_ci` |
| `cmdb_ci_memory_module` | `cmdb_ci`, `computer` |
| `cmdb_software_instance` | `installed_on`, `software` |
| `cmdb_sam_sw_install` | `installed_on`, `software`, `software_model`, `discovery_model` |
| `cmdb_ci_file_system` | `computer`, `cmdb_ci` |
| `cmdb_running_process` | `computer`, `cmdb_ci` |
| `cmdb_tcp` | `computer`, `cmdb_ci` |
| `cmdb_rel_ci` | `parent`, `child`, `type` |

Record Mapping is still written after a successful upsert and read before insert or update. A reference with no mapping and no unique business key is left as the source sys_id. `sys_user` and `sys_user_group` stay off that implicit xref path.

**Same sequence.** Apply used to skip whenever `receipt.last_seq` was already at this `sys_mod_count`, so a re-execute could not fill newly captured fields or rewrite a child FK. A same-seq payload is now a skip only when the translated values already match the target row. An older seq is still a skip. A matching replay does not insert a second row and does not append a journal again. Case 1 department re-execute still updates the existing row instead of duplicating it.

**Verify (do not deploy from this change set).** Install 0.4.5 on both peers. `now-sdk build` must succeed before that install.

1. Re-Execute the CASE1-COMP-DETAILED computer movement. On PDI1, the outbox `values` for that computer include `os`, `os_version`, `ip_address`, `manufacturer`, `model_id`, `ram`, `cpu_count`, `cpu_core_count`, and `discovery_source` when those fields are filled on the source (plus any other include-list field that exists on the class).
2. On PDI2, open the computer. Those fields are populated, not only the previous eight.
3. Re-Execute Path A children after the computer Record Mapping exists: network adapter, serial number, storage or disk, memory, software instance, file system, running process, tcp, and `cmdb_rel_ci`.
4. On the PDI2 computer, the NIC and software related lists show the child rows. `cmdb_ci`, `installed_on`, `software`, `parent`, and `child` are PDI2 sys_ids. They are not the PDI1 ids left on the source.
5. Case 2 `alm_hardware.ci` still follows Record Mapping. Case 1 department still updates the existing row and does not insert a duplicate. A drain poll still does not insert an empty Data Execution.
6. After install, **System Definition → Script Includes** shows `SyncBridgeMetadataWrite` in the **Global** application, API name `global.SyncBridgeMetadataWrite`, Accessible from **All application scopes**. The system log contains `[bridge] metadata writer table api POST sysparm_transaction_scope=global status=201` (or `PATCH` / `200` when the row already exists) and `[bridge] metadata writer callable as global.SyncBridgeMetadataWrite scope=global api_name=global.SyncBridgeMetadataWrite access=public`. There is no `UpdateManager2` / `loadXML refused` line. If the Table API status is not 2xx, the log instead says a one-time `sys_trigger` was queued; within a minute the same callable line must appear from that job. Re-run Cases 5, 6, and 9 as `sbridge.worker`. Outbox must not fail with `SyncBridgeMetadataWrite is not installed in global`. A security refusal still retries through that global include; admin is not granted.

## Software instance apply (0.4.6)

Path A `cmdb_software_instance` on PDI2 selected 15 rows, sent 0, and left **0** rows on the destination. The apply error was `insert into cmdb_software_instance returned no sys_id (canCreate=true)` with no `getLastErrorMessage()` text. NIC, storage, and the other Path A children in that run applied, and their foreign keys were PDI2 computer sys_ids. Cases 5, 6, 7, and 9, Gap A, and empty Data Executions were already passing. This build does not grant `sbridge.worker` admin and does not add `cmdb_software_instance` to `global.SyncBridgeMetadataWrite`.

**Root cause.** `canCreate=true` plus an empty platform message is a before-rule `setAbortAction(true)`, not a Deny-Unless ACL. Two things on this table produce that result:

1. Capture only sent `policy.field_list`. A list without `name`, `installed_on`, and `software` inserts a row the software-instance rule refuses. Those fields are mandatory for the install even when the dictionary mandatory flag is only on `name` and `installed_on`.
2. When `software` is in the payload, xref keeps the source sys_id if the product model was not synced and the name lookup misses. The target rule loads that reference, finds no row, and aborts. `canCreate()` is still true because the table ACL allows create. The same abort happens when the GlideRecord is opened on the parent `cmdb_software_instance` while the install class is `cmdb_sam_sw_install`. The metadata writer allow-list stays `sys_script`, `sc_cat_item`, `item_option_new`, and `sys_user_group`. A global GlideRecord runs the same before rules, so it would still return no sys_id.

**Fix.** Capture and seed union a child include-list (foreign keys plus `name`, `version`, `edition`, and `discovery_source` on software) for every Path A child, including NIC and storage, so a thin field list still sends the parent pointer. Apply rewrites a child foreign key that is not a row on this instance: Record Mapping, then the business key, then a software product matched by name. If the product is still missing, apply inserts one `cmdb_software_product_model` (or `cmdb_ci_spkg` when that is the reference) as the integration user and stores a Record Mapping for that source sys_id. It does not create a CI for a dangling `installed_on`. A product reference that still does not resolve is omitted when `name` is set, so the dangling sys_id is not what aborts the insert. The insert is made on `cmdb_sam_sw_install` when that table exists. The policy table on the payload stays `cmdb_software_instance`, so the inbound policy still matches. A failure still records empty required fields and dangling references on the no-sys_id error.

**Configuration filter vs policy condition.** `BridgeSeed` and `BridgeCapture` still evaluate **sync policy condition**. Preview, dry run, and the Data Execution snapshot read the **configuration filter**. Execute calls `linkPolicies` before seed. That copy used to replace a saved filter with `policy.condition`. A filter that is already set is now left alone, including Case 7 `nameSTARTSWITHcase6_max_` next to whatever condition the policy uses. A new configuration, and an existing one whose filter is empty, still takes the policy condition as the initial filter. Clear the configuration filter to copy the condition again on the next policy link. This does not change which rows seed sends.

**Verify (do not deploy from this change set).** Install 0.4.6 on both peers. No new fix script: script includes update with the application. `now-sdk build` must succeed before that install. Re-Execute only the Path A software-instance movement, as `sbridge.worker`, after the computer Record Mapping exists.

1. On PDI1, the new outbox `values` for those 15 rows include `name`, `installed_on`, and `software` (plus `version` and `discovery_source` when the source has them). `installed_on` in the apply payload is a PDI2 computer sys_id, not the PDI1 id.
2. On PDI2, `cmdb_sam_sw_install` (or `cmdb_software_instance` if that class is the one the instance accepted) has the 15 rows. The computer Software related list shows them. `installed_on` is the PDI2 computer.
3. The Data Execution is not left at selected 15 / sent 0 / cancelled, and the outbox error is not `insert into cmdb_software_instance returned no sys_id (canCreate=true)` with nothing after it. A remaining failure names the empty field or the dangling reference.
4. NIC and storage still apply. Cases 5, 6, 7, and 9 still pass as `sbridge.worker`. Gap A computer fields still populate. A drain poll still does not insert an empty Data Execution. `sbridge.worker` is not admin. Case 7 can keep policy condition and configuration filter `nameSTARTSWITHcase6_max_` as separate values; Execute does not clear the filter.

## Operator runbook (stub)

1. **Install** on both peers (PDI lab first): `npm run build && npm run deploy -a <auth-alias>`
2. **Integration user** — the shipped default is `sbridge.worker`, with roles `x_33764_sbridge.operator` (contains `x_33764_sbridge.worker`) and `x_33764_sbridge.reader`. Install assigns `x_33764_sbridge.worker` directly when that user already exists and logs whether `x_33764_sbridge.operator` is present. It does not grant operator or `admin`. Metadata apply uses the worker allow rules first, then `global.SyncBridgeMetadataWrite` for `sys_script`, `sc_cat_item`, `item_option_new`, and `sys_user_group` when a security refusal remains. Blank still fail-closes capture at runtime if an admin clears the property. Do not substitute admin for this user when proving apply.
3. **Instances** — create a row for *this* instance (`base_url` contains `instance_name`) and one for the remote instance. Keep remote `active=true` only when ready. The physical table is still `x_33764_sbridge_peer`.
4. **Credentials** — set the instance `connection_alias` or OAuth profile (never commit secrets).
5. **Policy** — outbound on source (owner_peer = local), inbound on target. Saving a policy links a Data Movement Configuration and, for outbound, auto-ensures a capture Business Rule. Capture still follows the policy, not the configuration row.
6. **Seed** — `POST /api/x_33764_sbridge/sync/seed` with `{ "policy": "<sys_id>" }` as the integration user. Repeat with `run_id` until `done: true`. Does **not** update source rows. A Data Execution shadow is written when dual-write is on.
7. **Monitor** — Data Executions (default filter `configurationISNOTEMPTY`), Transfers, Failed Transfers, and Audit. Legacy queue and technical logs are under Developer / Diagnostics. Watch `last_error` on the instance and lag on sync runs. Empty-configuration orphans, if any remain from older builds, are under **Orphan executions** (`configurationISEMPTY`). Review them there; this app does not delete them.

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
