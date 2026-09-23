import { Acl, UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['ui-preview-records'],
    category: 'general',
    endpoint: 'x_33764_sbridge_preview.do',
    description: 'Preview source rows for a data movement configuration. No target writes.',
    html: Now.include('../../scripts/ui/preview-page.html'),
})

UiPage({
    $id: Now.ID['ui-execute-confirm'],
    category: 'general',
    endpoint: 'x_33764_sbridge_execute.do',
    description: 'Confirm Execute Now or a dry run. Processing calls the execution controller only.',
    html: Now.include('../../scripts/ui/execute-page.html'),
    clientScript: Now.include('../../scripts/ui/execute-page.client.js'),
    processingScript: Now.include('../../scripts/ui/execute-page.server.js'),
})

Acl({
    $id: Now.ID['acl-ui-preview'],
    type: 'ui_page',
    operation: 'read',
    name: 'x_33764_sbridge_preview',
    roles: ['x_33764_sbridge.operator'],
    adminOverrides: true,
    description: 'Operators can open the preview page.',
})

Acl({
    $id: Now.ID['acl-ui-execute'],
    type: 'ui_page',
    operation: 'read',
    name: 'x_33764_sbridge_execute',
    roles: ['x_33764_sbridge.operator'],
    adminOverrides: true,
    description: 'Operators can open the execute confirmation page.',
})
