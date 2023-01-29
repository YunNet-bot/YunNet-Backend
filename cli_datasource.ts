// cli_datasource.ts
import { config } from 'dotenv';
import { addAlias } from 'module-alias';
import { DataSource } from 'typeorm';
import { createDataSource, getPlan } from '@yunology/ts-multi-tenancy';

config({ path: `.env.${process.env.ENV_NAME}` });
addAlias('@', `${process.cwd()}/src`);

import { initNMSPlans } from '@/app';

const { env } = process;
const { DB_NAME, PLAN_NAME, DB_URL } = env;

initNMSPlans();
let dataSource: DataSource;
const { entries, migrations } = getPlan(PLAN_NAME!);
dataSource = createDataSource(
  DB_NAME!, PLAN_NAME!, {
    url: DB_URL!,
    entities: entries,
    migrations,
  },
);

export default dataSource;
