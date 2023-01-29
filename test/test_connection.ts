// test/test_conntection.ts
import { DataSource, EntityManager } from 'typeorm';
import {
  getDataSource, RuntimeTenant, Service, getTenantService,
} from '@yunology/ts-multi-tenancy';

export default class TestConnection {
  get getDs(): DataSource {
    return getDataSource('yunnet-test', 'standard')!;
  }

  getTenant(): RuntimeTenant {
    return getTenantService().getTenantByInfo('yunnet-test')!;
  }

  getModule<T extends Service>(t: (new (...args: any[]) => T) | string): T {
    return this.getTenant().service(t);
  }

  async autoRollbackSerialTran<T>(
    runInTransaction: (manager: EntityManager) => Promise<T>,
  ): Promise<void> {
    const qr = this.getDs.createQueryRunner();
    await qr.connect();
    await qr.startTransaction('SERIALIZABLE');

    try {
      await runInTransaction(qr.manager);
    } finally {
      await qr.rollbackTransaction();
      await qr.release();
    }
  }

  async destroy(): Promise<void> {
    await this.getDs.destroy();
  }

  async clear(): Promise<void> {
    const entities = this.getDs.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = this.getDs.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  }
}
