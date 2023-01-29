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
import { permission, bed, locktype, systemDb, tenant } from '../test_data';
import { config } from 'dotenv';
import Preloader from '@/preloader';
import { initNMSBackend, initNMSPlans, initTenancyPlatform } from '@/app';
import { Database, getPlan, Tenant } from '@yunology/ts-multi-tenancy';
import { User } from '@/entity';

chaiUse(chaiAsPromised);

export const conn = new TestConnection();
export let app: Express.Application;
export let testAdmin: User;
export const mochaHooks = {
  async beforeAll(): Promise<void> {
    /*
    PermissionService.init();
    BedService.init();
    LockTypeService.init();
    // Service should init at here if they need to be run integration tests.
    // SomeService.init();
    */


    config({ path: `.env.${process.env.ENV_NAME || 'test'}` });
    const preloader = await new Preloader(false).envLoad();
    const { url } = preloader;
    initNMSPlans();
    await initTenancyPlatform(
      preloader,
      async (systemManager) => {
        systemDb.url = url;
        tenant.plan = getPlan('standard');
        await systemManager.getRepository(Database).save(systemDb);
        await systemManager.getRepository(Tenant).save(tenant);
      },
      async () => {
        await conn.getDs.runMigrations();

        // await conn.getDs.getRepository(Permission).insert(permission);
        // await conn.getDs.getRepository(Bed).insert(bed);
        // await conn.getDs.getRepository(LockType).insert(locktype);
        // await conn.getConn().getRepository(SomeType).insert(someVariableFromTestData);
      },
    );
    app = await initNMSBackend(preloader);
    testAdmin = await conn.getDs.manager.getRepository(User).save({
      tenantId: tenant.id,
      username: 'test_admin',
      passwordHash: 'has',
      nick: 'test admin',
    });
  },
  afterAll(): void {
    setTimeout(async () => {
      await conn.clear();
      await conn.destroy();
    }, 1000);
  },
};
