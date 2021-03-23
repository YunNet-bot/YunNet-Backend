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

import { PermissionService, GroupService } from '@/service';
import { Permission, Group } from '@/entry';

import TestConnection from '../test_connection';
import { permission, group } from '../test_data';

chaiUse(chaiAsPromised);

export const conn = new TestConnection();
export const mochaHooks = {
  async beforeAll(): Promise<void> {
    await conn.create();

    PermissionService.init();
    GroupService.init();
    // Service should init at here if they need to be run integration tests.
    // SomeService.init();

    await conn.getConn().getRepository(Permission).insert(permission);
    await conn.getConn().getRepository(Group).insert(group);
    // await conn.getConn().getRepository(SomeType).insert(someVariableFromTestData);
  },
  afterAll(): void {
    conn.close();
  },
};
