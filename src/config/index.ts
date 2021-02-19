// src/config/index.ts
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import * as prodConfig from './production';
import * as devConfig from './dev';

function verboseParse(verbose: any): boolean | ['schema'] | 'all' {
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

export async function runMigrations(verbose: any): Promise<void> {
  const config: any = process.env.MODE === 'production' ? prodConfig : devConfig;
  config.default.logging = verboseParse(verbose);
  const conn: Connection = await createConnection(config.default as ConnectionOptions);

  await conn.runMigrations();

  conn.close();
}

export async function revertMigrations(verbose: any): Promise<void> {
  const config: any = process.env.MODE === 'production' ? prodConfig : devConfig;
  config.default.logging = verboseParse(verbose);
  const conn: Connection = await createConnection(config.default as ConnectionOptions);

  for (let _ of conn.migrations) {
    await conn.undoLastMigration();
  }

  await conn.close();
}
