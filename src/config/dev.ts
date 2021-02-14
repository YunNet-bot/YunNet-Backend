// src/config/dev.ts
import { ConnectionOptions } from 'typeorm';
import * as prodConfig from './production';

// extends from production config.
export default {
  ...prodConfig.default,
  dropSchema: true,
  migrationsRun: true,
  logging: 'all',
} as ConnectionOptions;
