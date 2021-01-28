// test/connect.ts
import { createConnection, Connection } from 'typeorm';

// Entries
import {
  Announcement, BackupMac, Bed, GroupInherit, Group,
  GroupManagedBy, GroupPermission, GroupUser, IpType,
  IpTableTest, IpTable, LockType, Lock, Netflow, Permission,
  Switch, Token, UserPermission, User, Variable,
} from '@/entry';
// Migrations
import { Init1606331057077 } from '@/migration';

export default class TestConnection {
  private conn!: Connection;

  async create(): Promise<void> {
    this.conn = await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: '1234',
      database: 'YunNet',
      dropSchema: true,
      entities: [
        Announcement, BackupMac, Bed, GroupInherit, Group,
        GroupManagedBy, GroupPermission, GroupUser, IpType,
        IpTableTest, IpTable, LockType, Lock, Netflow, Permission,
        Switch, Token, UserPermission, User, Variable,
      ],
      migrationsRun: true,
      migrations: [Init1606331057077],
      extra: {
        charset: 'utf8_unicode_ci',
      },
    });
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
