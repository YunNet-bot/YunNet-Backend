// src/app.ts
import { createConnection } from 'typeorm';
import express, { Express, Request, Response } from 'express';
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

const app = express();

export default function appInit(): Promise<Express> {
  return new Promise(async (resolve) => {
    app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    // Use body parser to read sent json payloads
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const swaggerHtml = swaggerUi.generateHTML(await import('./swagger.json'));
    app.use('/docs', swaggerUi.serve, (_: Request, res: Response) => res.send(swaggerHtml));

    await createConnection({
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
    });

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

    return resolve(app);
  });
}
