// scripts/typeorm.ts
import 'module-alias/register';
import { runMigrations } from '@/config';

const argv = require('minimist')(process.argv.slice(2));
const verbose: string | undefined = argv.verbose || 2;
const migrations: string | undefined = argv.migrations;

if (verbose !== undefined) {
  console.log(`verbose mode: ${verbose}.`);
}

if (migrations !== undefined) {
  const lowerCase = migrations.toLowerCase();
  if (lowerCase === 'run') {
    console.log(`Run migrations with: run mode.`);
    runMigrations(verbose);
  } else if (lowerCase === 'revert') {
    console.log(`Run migrations with: revert mode.`);
    // revertMigrations(verbose);
  } else {
    console.error(`Unknown migration mode, should be 'run' or 'revert'.`);
    process.exit(0);
  }
}
