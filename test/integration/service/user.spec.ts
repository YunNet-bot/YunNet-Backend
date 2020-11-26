// test/integration/service/user.spec.ts
import { expect } from 'chai';
import { createConnection, Connection } from 'typeorm';

import { User, Group, GroupUser, Bed } from '@/entry';
import { UserService } from '@/service';

describe('UserService', () => {
    let conn: Connection;
    before('TypeORM up', async () => {
        conn = await createConnection({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "user",
            "password": "1234",
            "database": "YunNet",
            "entities": [ User, Group, GroupUser, Bed ],
            "extra": {
                "charset": "utf8_unicode_ci"
            }
        });
        UserService.init();
    });

    // Tests for User

    after('TypeORM down', (done) => {
        conn.close();
        done();
    });
});
