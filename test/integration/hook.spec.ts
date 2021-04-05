// test/integration/hook.spec.ts
/**
 * This file is global hook for integration tests.
 * It resiponsible for running setup & teardown function at mocha.
 *
 * You can pre-insert any value defined at {@link test_data}, like below comment.
 *   await conn.getConn().getRepository(SomeType).insert(someVariableFromTestData);
 *
 * Typically, you shall only need to pre-insert data whom use as fk(ForeignKey) and init services.
 * For instance, {@link Announcement} entry has an fk for field uid, then you shall pre-insert a
 * {@link User} entry.
 *
 * @author Clooooode
 */
import { use as chaiUse } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { PermissionService } from '@/service';
import { Permission } from '@/entry';

import { BedService } from '@/service';
import { Bed } from '@/entry';

import { LockTypeService } from '@/service';
import { LockType } from '@/entry';

import TestConnection from '../test_connection';
import { permission, bed, locktype } from '../test_data';

chaiUse(chaiAsPromised);

export const conn = new TestConnection();
export const mochaHooks = {
  async beforeAll(): Promise<void> {
    await conn.create();

    PermissionService.init();
    BedService.init();
    LockTypeService.init();
    // Service should init at here if they need to be run integration tests.
    // SomeService.init();

    await conn.getConn().getRepository(Permission).insert(permission);
    await conn.getConn().getRepository(Bed).insert(bed);
    await conn.getConn().getRepository(LockType).insert(locktype);
    // await conn.getConn().getRepository(SomeType).insert(someVariableFromTestData);
  },
  afterAll(): void {
    conn.close();
  },
};
