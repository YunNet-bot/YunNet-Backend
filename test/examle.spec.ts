// test/a.spec.ts
import { Server } from 'http';
import { Express } from 'express';
import appInit from '@/app';

let server: Server;
before('Server up', async (done) => {
    appInit().then((app: Express) => {
        server = app.listen(3000, done);
    });
});

after('Server down', () => {
    server.close();
})