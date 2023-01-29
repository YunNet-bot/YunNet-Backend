// test.ts
import { config } from 'dotenv';
import systemDs from '@yunology/ts-multi-tenancy/dist/cli_datasource';

config({ path: `.env.${process.env.ENV_NAME}` });

(async () => {
  const { env } = process;
  const { PLAN_NAME } = env;

  await systemDs.initialize();
  await systemDs.manager.query(`CREATE SCHEMA IF NOT EXISTS ${PLAN_NAME}`);
})();
