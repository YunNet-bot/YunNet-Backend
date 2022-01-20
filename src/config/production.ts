// src/config/production.ts
// Entries
import {
  Iptable, IpType, Lock,
  LockType, Switch, User
} from '@/entry';
// Migrations
import { Init1606331057077, RefactorBase1642703686145 } from '@/migration';
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
    Iptable, IpType, Lock,
    LockType, Switch, User
  ],
  migrationsRun: false,
  migrations: [Init1606331057077, RefactorBase1642703686145],
  extra: {
    charset: 'utf8_unicode_ci',
  },
} as ConnectionOptions;
