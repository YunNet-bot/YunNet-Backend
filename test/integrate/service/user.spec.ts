// test/integrate/service/user.spec.ts
import { expect } from 'chai';

import { User } from '@/entity';
import { UserService } from '@/service';

import { conn, testAdmin } from '../hook.spec';

describe('UserService', () => {
  describe('Method getIdByUserName', () => {
    it('Should get by username', async () => {
      await conn.autoRollbackSerialTran(async (manager) => {
        const savedUser = await manager.getRepository(User).save({
          tenantId: conn.getTenant().tenantId,
          username: 'john',
          passwordHash: 'hash',
          nick: 'john_nick',
          department: 'somewhere',
          backMail: null,
          note: null,
        });
        const getUserId = await conn.getModule(UserService).getIdByUserName(
          testAdmin,
          conn.getTenant(),
          'john',
          manager,
        );

        expect(getUserId).to.be.eq(savedUser.id);
      })
    });

    it('Should get null because not exists', async () => {
      await conn.autoRollbackSerialTran(async (manager) => {
        const getUserId = await conn.getModule(UserService).getIdByUserName(
          testAdmin,
          conn.getTenant(),
          'not_exists',
          manager,
        );

        expect(getUserId).to.be.null;
      });
    });
  })
});
