// src/config/production.ts
// Entries
import {
  Announcement, BackupMac, Bed, Group,
  GroupInherit, GroupManagedBy, GroupPermission, GroupUser,
  IpTable, IpTableTest, IpType, Lock,
  LockType, Netflow, Permission, Switch,
  Token, User, UserPermission, Variable,
} from '@/entry';
// Migrations
import { Init1606331057077 } from '@/migration';
import { ConnectionOptions } from 'typeorm';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: '1234',
  database: 'YunNet',
  dropSchema: false,
  entities: [
    Announcement, BackupMac, Bed, GroupInherit, Group,
    GroupManagedBy, GroupPermission, GroupUser, IpType,
    IpTableTest, IpTable, LockType, Lock, Netflow, Permission,
    Switch, Token, UserPermission, User, Variable,
  ],
  migrationsRun: false,
  migrations: [Init1606331057077],
  extra: {
    charset: 'utf8_unicode_ci',
  },
} as ConnectionOptions;
