import { ScheduledScript } from '@servicenow/sdk/core'

ScheduledScript({
    $id: Now.ID['job-execution-schedules'],
    name: 'Sync Bridge — run execution schedules',
    active: true,
    frequency: 'periodically',
    executionInterval: { minutes: 1 },
    conditional: true,
    condition: Now.include('../../scripts/jobs/schedule-condition.js'),
    script: Now.include('../../scripts/jobs/run-schedules.js'),
})
