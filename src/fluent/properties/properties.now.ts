import { Property } from '@servicenow/sdk/core'

Property({
    $id: Now.ID['prop-enabled'],
    name: 'x_33764_sbridge.enabled',
    type: 'boolean',
    value: true,
    description:
        'Emergency stop for drain and seed jobs. Ships true; deactivate peers for a durable stop.',
})

Property({
    $id: Now.ID['prop-batch'],
    name: 'x_33764_sbridge.drain_batch_size',
    type: 'integer',
    value: 200,
    description: 'Outbox rows per batch POST to a peer (baseline ≥200).',
})

Property({
    $id: Now.ID['prop-max-attempts'],
    name: 'x_33764_sbridge.drain_max_attempts',
    type: 'integer',
    value: 8,
    description: 'Send attempts before an outbox row is dead-lettered.',
})

Property({
    $id: Now.ID['prop-integration-user'],
    name: 'x_33764_sbridge.integration_user',
    type: 'string',
    value: 'sbridge.worker',
    description:
        'user_name of the apply-worker account. Shipped default is sbridge.worker so install does not wipe a working lab. Blank still fail-closes capture at runtime if an admin clears it.',
})

Property({
    $id: Now.ID['prop-lag'],
    name: 'x_33764_sbridge.lag_alert_seconds',
    type: 'integer',
    value: 900,
    description: 'Alert when oldest unprocessed outbox row exceeds this age (seconds).',
})

Property({
    $id: Now.ID['prop-dlq'],
    name: 'x_33764_sbridge.dlq_alert_depth',
    type: 'integer',
    value: 25,
    description: 'Alert when unresolved DLQ rows exceed this count.',
})

Property({
    $id: Now.ID['prop-dual-write'],
    name: 'x_33764_sbridge.dual_write',
    type: 'boolean',
    value: true,
    description:
        'Phase 1 best-effort shadows: Data Execution, Transfer, and Transfer Audit. Failures are logged only and never fail capture, drain, seed, or apply. Set false to pause shadows. Case 1 outbox /apply path stays primary.',
})

Property({
    $id: Now.ID['prop-ack-enabled'],
    name: 'x_33764_sbridge.ack.enabled',
    type: 'boolean',
    value: true,
    description:
        'Staged acknowledgement code is installed. Per-configuration Require acknowledgement still defaults to false so existing Case 1 peers complete on /apply until an operator opts in.',
})

Property({
    $id: Now.ID['prop-ack-timeout'],
    name: 'x_33764_sbridge.ack.timeout_minutes',
    type: 'integer',
    value: 30,
    description:
        'Minutes a data execution may stay awaiting acknowledgement before it is failed with peer does not support ACK. Applies only when that configuration requires acknowledgement.',
})

Property({
    $id: Now.ID['prop-cmdb-computer-fields'],
    name: 'x_33764_sbridge.cmdb_computer_fields',
    type: 'string',
    value:
        'name,short_description,operational_status,install_status,serial_number,asset_tag,category,subcategory,os,os_version,os_domain,os_service_pack,os_address_width,ip_address,mac_address,default_gateway,fqdn,host_name,dns_domain,manufacturer,model_id,model_number,ram,cpu_count,cpu_core_count,cpu_core_thread,cpu_speed,cpu_type,cpu_name,cpu_manufacturer,disk_space,chassis_type,virtual,discovery_source,first_discovered,last_discovered,location,department,company,vendor,assigned_to,owned_by,managed_by,supported_by,support_group,assignment_group,managed_by_group,environment,warranty_expiration,po_number,cost,cost_center,asset,correlation_id,description,hardware_status,hardware_substatus,life_cycle_stage,life_cycle_stage_status',
    description:
        'Comma-separated cmdb_ci_computer fields merged into capture and seed when the source class is Computer or a subclass. Unioned with the sync policy field list. Blank uses the built-in computer set. Set to off to keep only the policy field list.',
})
