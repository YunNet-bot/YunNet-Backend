// src/server.ts
import 'module-alias/register';
import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { Express } from 'express';

import * as prodConfig from '@/config/production';
import * as devConfig from '@/config/dev';
import appInit from '@/app';

// mode should be 'production' or 'dev'
const mode = process.env.MODE || 'dev';
const port = process.env.PORT || 3000;
const typeormConfig = mode === 'production' ? prodConfig : devConfig;

appInit(typeormConfig.default as ConnectionOptions).then(async (app: Express) => {
  app.listen(port);
  console.log(`Example app listening at http://localhost:${port}`);
}).catch((err) => {
  console.error(err);
});
