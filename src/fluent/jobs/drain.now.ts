import { ScheduledScript } from '@servicenow/sdk/core'

ScheduledScript({
    $id: Now.ID['job-drain'],
    name: 'Sync Bridge — drain outbox',
    active: true,
    frequency: 'periodically',
    executionInterval: { minutes: 1 },
    conditional: true,
    condition: Now.include('../../scripts/jobs/drain-condition.js'),
    script: Now.include('../../scripts/jobs/drain.js'),
})
