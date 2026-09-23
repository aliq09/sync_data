import { Acl, UiPage } from '@servicenow/sdk/core'

UiPage({
    $id: Now.ID['ui-preview-records'],
    category: 'general',
    endpoint: 'x_33764_sbridge_preview.do',
    description:
        'Fallback preview page. The form button opens a dialog instead. Jelly evaluation uses detail_html and always links back to the configuration.',
    html: Now.include('../../scripts/ui/preview-page.html'),
})

UiPage({
    $id: Now.ID['ui-execute-confirm'],
    category: 'general',
    endpoint: 'x_33764_sbridge_execute.do',
    description:
        'Fallback execute page. The form button confirms in a dialog and stays on the configuration when cancelled. This page keeps a real configuration sys_id on Cancel.',
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
