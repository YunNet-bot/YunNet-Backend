//src/server.ts
import 'module-alias/register';
import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import { Express } from 'express';

import appInit from '@/app';
import { RegisterRoutes } from '@/routes';

// Entries
import { User, Group, GroupUser } from '@/entry';
// Services
import { UserService } from '@/service';

const port = process.env.PORT || 3000;

appInit().then(async (app: Express) => {
    await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: '1234',
        database: 'db',
        entities: [ User, Group, GroupUser ],
    });

    UserService.init();

    RegisterRoutes(app);

    app.listen(port);
    console.log(`Example app listening at http://localhost:${port}`)
}).catch((err) => {
    console.error(err);
});
  