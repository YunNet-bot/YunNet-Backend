// src/app.ts
import { EntityManager } from 'typeorm';
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';

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
import { Database, initInfrastructures, initPlans, initMultiTenancy, Tenant, TenantPlanInfo } from '@yunology/ts-multi-tenancy';
import { UserInfrastructure } from './infrastructure/user';
import Preloader from './preloader';
import { User } from './entity';
import { UserTable1674994800644 } from './migration/1674994800644-UserTable';

const app = express();
export const tenantHeaderName = 'X-NMS-TENANT-ID';

export function initNMSPlans(): void {
  initPlans(() => ({
    standard: new TenantPlanInfo(
      'standard',
      [UserService],
      [Tenant, Database, User],
      [UserTable1674994800644],
    ),
  }));
}

export async function initTenancyPlatform(
  preloader: Preloader,
  preCreateSystemDatasFunction?: (manager: EntityManager) => Promise<void>,
  preCreateTenantDatasFunction?: () => Promise<void>,
): Promise<void> {
  const { logging } = preloader;
  await initInfrastructures(async () => {
    UserInfrastructure.init();
    /*
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
    */
  });
  await initMultiTenancy(
    async () => ({
      [UserService.name]: new UserService(),
    }),
    preCreateSystemDatasFunction,
    preCreateTenantDatasFunction,
    tenantHeaderName,
    logging,
  );
}

export async function initNMSBackend(
  preloader: Preloader,
): Promise<Express> {
  const {
    redisUrl, isProduction, isSwagger, swaggerJson,
  } = preloader;
  app.set('trust proxy', true);
  app.use(cors({
    origin: [
      'http://localhost:8080',
      'https://localhost:8080',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorizations', tenantHeaderName],
    exposedHeaders: ['Content-Disposition'],
  }));

  // Use body parser to read sent json payloads
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  /*
  const sessionRedisClient = createClient({ url: redisUrl, legacyMode: true });
  await sessionRedisClient.connect();
  sessionRedis = new RedisStore({ client: sessionRedisClient });

  app.use(session({
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'none',
    },
    secret: 'i-love-husky',
    resave: false,
    saveUninitialized: true,
    store: sessionRedis,
  }));
  app.use((req, res, next) => {
    const tenantId = req.header(tenantHeaderName);
    req.tenant = getTenantService().getTenantByInfo(tenantId);
    next();
  });
  */

  if (isSwagger === true) {
    app.use('/docs', swaggerUi.serve as any, swaggerUi.setup(swaggerJson) as any);
  }

  const routesPath = '@/routes';
  const tsoaRouter = await import(routesPath);
  tsoaRouter.RegisterRoutes(app);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res
      .status(400)
      .json({
        status: 'fail',
        message: err.message,
      });
  });

  return app;
}
