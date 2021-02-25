// scripts/typeorm.ts
import 'module-alias/register';
import { runMigrations, revertMigrations } from '@/config';
import { parseIntDefault } from '@/utils';

const argv = require('minimist')(process.argv.slice(2));
const verbose: number = parseIntDefault({
  value: argv.verbose,
  default: 2,
});
const migrations: string | undefined = argv.migrations;

let lowerCaseMigrations: string;

if (migrations !== undefined) {
  lowerCaseMigrations = migrations.toLowerCase();
  if (lowerCaseMigrations === 'run') {
    console.log(`Run migrations with: run mode.`);
    runMigrations(verbose);
  } else if (lowerCaseMigrations === 'revert') {
    console.log(`Run migrations with: revert mode.`);
    revertMigrations(verbose);
  } else {
    console.error(`Unknown migration mode, should be 'run' or 'revert'.`);
    process.exit(0);
  }
}
