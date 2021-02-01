// src/app.ts
import 'module-alias/register';
import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { readFileSync } from 'fs';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

// Entries
import {
  Announcement, BackupMac, Bed, GroupInherit, Group,
  GroupManagedBy, GroupPermission, GroupUser, IpType,
  IpTableTest, IpTable, LockType, Lock, Netflow, Permission,
  Switch, Token, UserPermission, User, Variable,
} from '@/entry';
// Migrations
import { Init1606331057077 } from '@/migration';
// Services
import {
  UserService, AnnouncementService, BackupMacService,
  BedService, GroupInheritService, GroupManagedByService,
  GroupPermissionService, GroupUserService, GroupService,
  IpTypeService, IpTableService, IpTableTestService,
  LockTypeService, LockService, NetflowService,
  PermissionService, SwitchService, TokenService,
  UserPermissionService, VariableService,
} from '@/service';
// Route generate by tsoa
import { RegisterRoutes } from '@/routes';

const isTest = process.env.MODE === 'TEST';
const port = process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 3000;
const app = express();

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: '1234',
  database: 'YunNet',
  dropSchema: true,
  entities: [
    Announcement, BackupMac, Bed, GroupInherit, Group,
    GroupManagedBy, GroupPermission, GroupUser, IpType,
    IpTableTest, IpTable, LockType, Lock, Netflow, Permission,
    Switch, Token, UserPermission, User, Variable,
  ],
  migrationsRun: true,
  migrations: [Init1606331057077],
  extra: {
    charset: 'utf8_unicode_ci',
  },
}).then(async () => {
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Use body parser to read sent json payloads
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  if (!isTest) {
    const swaggerJSON = JSON.parse(readFileSync('./swagger.json', 'utf-8'));
    const swaggerHtml = swaggerUi.generateHTML(swaggerJSON);
    app.use('/docs', swaggerUi.serve, (_: Request, res: Response) => res.send(swaggerHtml));
  }

  UserService.init();
  AnnouncementService.init();
  BackupMacService.init();
  BedService.init();
  GroupInheritService.init();
  GroupManagedByService.init();
  GroupPermissionService.init();
  GroupUserService.init();
  GroupService.init();
  IpTypeService.init();
  IpTableTestService.init();
  IpTableService.init();
  LockTypeService.init();
  LockService.init();
  NetflowService.init();
  PermissionService.init();
  SwitchService.init();
  TokenService.init();
  UserPermissionService.init();
  VariableService.init();

  RegisterRoutes(app);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    app.emit('ready');
  });
});

export default app;
