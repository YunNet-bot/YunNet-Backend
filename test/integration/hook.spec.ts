// test/integration/hook.spec.ts
/**
 * This file is global hook for integration tests.
 * It resiponsible for running setup & teardown function at mocha.
 *
 * You can pre-insert any value defined at test_data, like below comment.
 *   await conn.getConn().getRepository(SomeType).insert(someVariableFromTestData);
 *
 * @author Clooooode
 */
import { use as chaiUse } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { PermissionService } from '@/service';
import { Permission } from '@/entry';

import TestConnection from '../test_connection';
import { permission } from '../test_data';

chaiUse(chaiAsPromised);

export const conn = new TestConnection();
export const mochaHooks = {
  async beforeAll(): Promise<void> {
    await conn.create();

    PermissionService.init();
    // Service should init at here if they need to be run integration tests.
    // SomeService.init();

    await conn.getConn().getRepository(Permission).insert(permission);
    // await conn.getConn().getRepository(SomeType).insert(someVariableFromTestData);
  },
  afterAll(): void {
    conn.close();
  },
};
