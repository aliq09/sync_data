import { RestApi } from '@servicenow/sdk/core'

RestApi({
    $id: Now.ID['sync-bridge-api'],
    name: 'Sync Bridge API',
    serviceId: 'sync',
    active: true,
    consumes: 'application/json',
    produces: 'application/json',
    routes: [
        {
            $id: Now.ID['route-apply'],
            name: 'Apply',
            method: 'POST',
            path: '/apply',
            active: true,
            authentication: true,
            authorization: true,
            script: Now.include('../../scripts/rest/apply.js'),
        },
        {
            $id: Now.ID['route-seed'],
            name: 'Seed',
            method: 'POST',
            path: '/seed',
            active: true,
            authentication: true,
            authorization: true,
            script: Now.include('../../scripts/rest/seed.js'),
        },
        {
            $id: Now.ID['route-ensure-capture'],
            name: 'Ensure capture',
            method: 'POST',
            path: '/ensure_capture',
            active: true,
            authentication: true,
            authorization: true,
            script: Now.include('../../scripts/rest/ensure-capture.js'),
        },
    ],
})
