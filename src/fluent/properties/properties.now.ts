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
    value: '',
    description:
        'user_name of the apply-worker account. Blank disables capture (fail closed).',
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
