import { ScheduledScript } from '@servicenow/sdk/core'

ScheduledScript({
    $id: Now.ID['job-continue-executions'],
    name: 'Sync Bridge — continue executions',
    active: true,
    frequency: 'periodically',
    executionInterval: { minutes: 1 },
    conditional: true,
    condition: Now.include('../../scripts/jobs/continue-condition.js'),
    script: Now.include('../../scripts/jobs/continue-executions.js'),
})
