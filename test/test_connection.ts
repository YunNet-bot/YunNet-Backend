// test/connect.ts
import { createConnection, Connection, ConnectionOptions } from 'typeorm';

import * as devConfig from '@/config/dev';

export default class TestConnection {
  private conn!: Connection;

  async create(): Promise<void> {
    const cfg = Object.assign(devConfig.default, { logging: false });
    this.conn = await createConnection(cfg as ConnectionOptions);
  }

  getConn(): Connection {
    return this.conn;
  }

  async close(): Promise<void> {
    await this.conn.close();
  }

  async clear(): Promise<void> {
    const entities = this.conn.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = this.conn.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  }
}
