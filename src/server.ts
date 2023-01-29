// src/server.ts
import 'reflect-metadata';
import { addAlias } from 'module-alias';
import { config } from 'dotenv';
import { Express } from 'express';

const envName = `.env.${process.env.ENV_NAME}`;
config({ path: envName });
// mode should be 'production' or 'dev', otherwise defaul is dev.
const isProduction = process.env.MODE === 'production';
addAlias('@', `${process.cwd()}/${isProduction ? 'dist' : 'src'}`);

/* eslint-disable import/first */
import {
  initNMSBackend, initNMSPlans, initTenancyPlatform,
} from '@/app';
import Preloader from '@/preloader';
import { Color } from '@/utils';
/* eslint-enable import/first */

const preloader = new Preloader(isProduction);

preloader.envLoad()
  .then(() => initNMSPlans())
  .then(() => initTenancyPlatform(preloader))
  .then(() => initNMSBackend(preloader))
  .then((app: Express) => {
    const port = preloader.backendPort;
    app.listen(port);
    console.log(`> RunningMode: { ${Color.fgGreen(isProduction ? 'Production' : 'Develope')} }`);
    console.log('> DataBase');
    console.log(`>>> Config: { ${Color.fgGreen(preloader.dbVariable)} }`);
    console.log(`> SwaggerMode: { ${Color.fgGreen(preloader.isSwagger.toString())} }`);
    console.log(`> Backend listening at ${Color.fgGreen(`http://localhost:${port}`)} NOW!`);
  })
  .catch((err) => {
    console.error(err);
  });
