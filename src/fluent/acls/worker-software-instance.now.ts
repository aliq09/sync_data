import { Acl } from '@servicenow/sdk/core'
import { operator, worker } from '../roles/roles.now'

/**
 * Role-only Allow-If rules for cmdb_software_instance and the software
 * package table the dictionary points at when SAM is not installed.
 *
 * canCreate() can stay true while setValue on name and installed_on does
 * not stick: a field write ACL or a cross-scope field ceiling drops the
 * value, the before rule sees the mandatory pair empty, and insert returns
 * no sys_id. Allow-If rules are OR. A Deny-Unless that the worker fails
 * still wins; BridgeApply then reports the payload and the pre-insert
 * readback instead of only "empty name, installed_on". These rules do not
 * grant admin.
 *
 * cmdb_ci_spkg is opened so a missing software package can be created as
 * the same user. The install does not depend on cmdb_sam_sw_install.
 */
Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-read'],
    type: 'record',
    table: 'cmdb_software_instance',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read software instances during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-create'],
    type: 'record',
    table: 'cmdb_software_instance',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create software instances during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-write'],
    type: 'record',
    table: 'cmdb_software_instance',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can update software instances during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-star-read'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: '*',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read cmdb_software_instance.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-star-write'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: '*',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write cmdb_software_instance.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-star-create'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: '*',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create cmdb_software_instance.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-name-read'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: 'name',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read software instance name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-name-write'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: 'name',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write software instance name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-name-create'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: 'name',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create software instance name during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-installed-on-read'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: 'installed_on',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read software instance installed_on during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-installed-on-write'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: 'installed_on',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write software instance installed_on during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-installed-on-create'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: 'installed_on',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create software instance installed_on during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-software-read'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: 'software',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read software instance software during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-software-write'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: 'software',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write software instance software during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-software-instance-software-create'],
    type: 'record',
    table: 'cmdb_software_instance',
    field: 'software',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create software instance software during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-ci-spkg-read'],
    type: 'record',
    table: 'cmdb_ci_spkg',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read software packages during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-ci-spkg-create'],
    type: 'record',
    table: 'cmdb_ci_spkg',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create software packages during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-ci-spkg-write'],
    type: 'record',
    table: 'cmdb_ci_spkg',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can update software packages during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-ci-spkg-star-read'],
    type: 'record',
    table: 'cmdb_ci_spkg',
    field: '*',
    operation: 'read',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can read cmdb_ci_spkg.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-ci-spkg-star-write'],
    type: 'record',
    table: 'cmdb_ci_spkg',
    field: '*',
    operation: 'write',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can write cmdb_ci_spkg.* during apply.',
})

Acl({
    $id: Now.ID['acl-worker-cmdb-ci-spkg-star-create'],
    type: 'record',
    table: 'cmdb_ci_spkg',
    field: '*',
    operation: 'create',
    roles: [worker, operator],
    decisionType: 'allow',
    adminOverrides: true,
    description: 'Sync Bridge worker can create cmdb_ci_spkg.* during apply.',
})
