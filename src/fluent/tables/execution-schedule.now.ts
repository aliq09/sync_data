import {
    Table,
    BooleanColumn,
    StringColumn,
    IntegerColumn,
    DateTimeColumn,
    TimeColumn,
    ReferenceColumn,
    GenericColumn,
} from '@servicenow/sdk/core'

/**
 * Execution Schedule (SCH######) — when a configuration should run.
 * The operator edits this row. A single platform job calls
 * SyncBridgeExecutionService.executeScheduled and never BridgeTransport.
 */
export const x_33764_sbridge_execution_schedule = Table({
    name: 'x_33764_sbridge_execution_schedule',
    label: 'Execution Schedule',
    display: 'number',
    audit: true,
    liveFeed: true,
    allowWebServiceAccess: true,
    createAccessControls: true,
    userRole: 'x_33764_sbridge.admin',
    autoNumber: {
        prefix: 'SCH',
        number: 1,
        numberOfDigits: 6,
    },
    schema: {
        number: StringColumn({
            label: 'Number',
            maxLength: 40,
            readOnly: true,
            default: 'javascript:getNextObjNumberPadded();',
        }),
        name: StringColumn({ label: 'Name', mandatory: true, maxLength: 200 }),
        active: BooleanColumn({ label: 'Active', default: true }),
        configuration: ReferenceColumn({
            label: 'Configuration',
            mandatory: true,
            referenceTable: 'x_33764_sbridge_movement_config',
        }),
        frequency: StringColumn({
            label: 'Frequency',
            mandatory: true,
            default: 'daily',
            choices: {
                once: 'Once',
                hourly: 'Hourly',
                daily: 'Daily',
                weekly: 'Weekly',
                monthly: 'Monthly',
            },
        }),
        run_time: TimeColumn({
            label: 'Run time',
            hint: 'Local time of day in the schedule timezone. Daily 23:00 Europe/London is the operator example.',
            default: { hours: 23, minutes: 0, seconds: 0 },
        }),
        timezone: StringColumn({
            label: 'Timezone',
            maxLength: 80,
            default: 'Europe/London',
        }),
        day_of_week: StringColumn({
            label: 'Day of week',
            hint: 'Used when frequency is weekly.',
            choices: {
                monday: 'Monday',
                tuesday: 'Tuesday',
                wednesday: 'Wednesday',
                thursday: 'Thursday',
                friday: 'Friday',
                saturday: 'Saturday',
                sunday: 'Sunday',
            },
        }),
        day_of_month: IntegerColumn({
            label: 'Day of month',
            hint: 'Used when frequency is monthly. Days that do not exist in a month are skipped.',
            default: 1,
        }),
        next_execution: DateTimeColumn({ label: 'Next execution' }),
        previous_execution: ReferenceColumn({
            label: 'Previous execution',
            referenceTable: 'x_33764_sbridge_data_execution',
        }),
        previous_result: StringColumn({ label: 'Previous result', maxLength: 80, readOnly: true }),
        overlap_policy: StringColumn({
            label: 'Overlap',
            hint: 'do_not_start_if_running aligns with the configuration Prevent policy.',
            default: 'do_not_start_if_running',
            choices: {
                do_not_start_if_running: 'Do not start if running',
                queue: 'Queue',
                allow: 'Allow',
            },
        }),
        platform_job: StringColumn({
            label: 'Platform job',
            hint: 'sys_id of the shared schedule runner. Operators do not edit sys_trigger rows.',
            maxLength: 32,
            readOnly: true,
        }),
        work_notes: GenericColumn({
            columnType: 'journal_input',
            label: 'Work notes',
            maxLength: 4000,
            spellCheck: true,
        }),
        comments: GenericColumn({
            columnType: 'journal_input',
            label: 'Additional comments',
            maxLength: 4000,
            spellCheck: true,
        }),
        comments_and_work_notes: GenericColumn({
            columnType: 'journal_list',
            dependent: 'comments,work_notes',
            label: 'Comments and Work notes',
            maxLength: 4000,
        }),
    },
    index: [
        { name: 'idx_sch_config', unique: false, element: 'configuration' },
        { name: 'idx_sch_next', unique: false, element: 'next_execution' },
    ],
})
