// src/preloader.ts
/* eslint-disable no-underscore-dangle, @typescript-eslint/no-explicit-any */
import { LoggerOptions } from 'typeorm';
import {
  createSystemDataSource, createRedisDataSource,
} from '@yunology/ts-multi-tenancy';

import { Color } from '@/utils';

export default class Preloader {
  private _isProduction;
  private _backendPort = 3000;
  private _redisUrl = 'redis://localhost:6379';
  private _isSwagger = false;
  private _swaggerJson: any;
  private _dbUrl = 'postgresql://localhost';
  private _dbDropSchema = false;
  private _dbMigrationsRun = false;
  private _dbLogging: LoggerOptions = false;

  constructor(isProduction: boolean) {
    this._isProduction = isProduction;
  }

  async envLoad(): Promise<Preloader> {
    const { env, stdout } = process;
    const {
      BACKEND_PORT, REDIS_URL, SWAGGER, DB_URL, DB_DROP_SCHEMA,
      DB_MIGRATIONS_RUN, DB_LOGGING,
    } = env;

    stdout.write(' ⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽\n');
    stdout.write('⎛     Preloader                                                       ⎞\n');
    stdout.write('⎢               Loading environement variable & configs               ⎠\n');
    stdout.write('⎢ ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n');

    if (BACKEND_PORT === undefined) {
      stdout.write(`⎢ ❕ ${Color.fgYellow('env BACKEND_PORT is not found')}`
        + `, use default { ${this._backendPort} }\n`);
    } else {
      this._backendPort = parseInt(BACKEND_PORT, 10);
    }

    if (REDIS_URL === undefined) {
      stdout.write(`⎢ ❕ ${Color.fgYellow('env REDIS_URL is not found')}`
      + `, use default '${this._redisUrl}'\n`);
    } else {
      this._redisUrl = REDIS_URL;
    }

    createRedisDataSource(this._redisUrl);

    this._isSwagger = ![undefined, 'false'].includes(SWAGGER);
    if (this.isSwagger === true) {
      stdout.write('⎢  → Reading swagger config\n');
      const path = '@/swagger.json';
      this._swaggerJson = await import(path);
      stdout.write('⎢     ↳ Complete\n');
    }

    if (DB_URL === undefined) {
      throw new Error('env DB_URL is required.');
    } else {
      this._dbUrl = DB_URL;
    }

    this._dbDropSchema = ![undefined, 'false'].includes(DB_DROP_SCHEMA);
    this._dbMigrationsRun = ![undefined, 'false'].includes(DB_MIGRATIONS_RUN);
    this._dbLogging = DB_LOGGING as LoggerOptions || false;

    createSystemDataSource(
      this._dbUrl, this._dbDropSchema, this._dbMigrationsRun, this._dbLogging,
    );

    stdout.write('⎢\n');
    stdout.write(`⎝ 🎊 ${Color.fgGreen('Everything is loaded and completed!')} 🎊\n`);
    stdout.write('  ⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺\n');

    return this;
  }

  get isProduction(): boolean {
    return this._isProduction;
  }

  get redisUrl(): string {
    return this._redisUrl;
  }

  get url(): string {
    return this._dbUrl;
  }

  get dropSchema(): boolean {
    return this._dbDropSchema;
  }

  get migrationsRun(): boolean {
    return this._dbMigrationsRun;
  }

  get logging(): LoggerOptions {
    return this._dbLogging;
  }

  get backendPort(): number {
    return this._backendPort;
  }

  get isSwagger(): boolean {
    return this._isSwagger;
  }

  get swaggerJson(): any {
    return this._swaggerJson;
  }

  get dbVariable(): string {
    return `DropSchema: ${this._dbDropSchema} `
      + `/ MigrationsRun: ${this._dbMigrationsRun} `
      + `/ Logging: ${this._dbLogging}`;
  }
}
