//src/server.ts
import 'module-alias/register';
import 'reflect-metadata';
import { Express } from 'express';

import appInit from '@/app';

const port = process.env.PORT || 3000;

appInit().then(async (app: Express) => {
    app.listen(port);
    console.log(`Example app listening at http://localhost:${port}`);
}).catch((err) => {
    console.error(err);
});
