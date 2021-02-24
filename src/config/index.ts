// src/config/index.ts
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import * as prodConfig from './production';
import * as devConfig from './dev';

function verboseParse(verbose: number): boolean | ['schema'] | 'all' {
  switch (verbose) {
    case 0:
      return false;
    case 1:
      return ['schema'];
    case 2:
    default:
      return 'all';
  }
}

export async function runMigrations(verbose: number): Promise<void> {
  const config: any = process.env.MODE === 'production' ? prodConfig : devConfig;
  config.default.logging = verboseParse(verbose);
  const conn: Connection = await createConnection(config.default as ConnectionOptions);

  await conn.runMigrations();

  conn.close();
}

export async function revertMigrations(verbose: number): Promise<void> {
  const config: any = process.env.MODE === 'production' ? prodConfig : devConfig;
  config.default.logging = verboseParse(verbose);
  const conn: Connection = await createConnection(config.default as ConnectionOptions);

  conn.migrations.forEach(async () => {
    await conn.undoLastMigration();
  });

  await conn.close();
}
