import { expect } from 'chai';

import { LockType } from '@/entry';
import { AddResultDTO } from '@/entry/dto';
import { LockTypeService } from '@/service';

import { conn } from '../hook.spec';

const addedLockTypeId: Array<number> = [];

describe.skip('LockType Service', async () => {
  describe('method add', () => {
    it('should add a new locktype.', async () => {
      const newLockType: LockType = {
        lock_type_id: 1,
        str: 'TEST ADD'
      };
      const addResult: AddResultDTO = await LockTypeService.getInstance().add(newLockType.lock_type_id, newLockType.str);
      if(!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const id: number = addResult.id[0] as number;
      const result = conn.getDs
        .getRepository(LockType)
        .createQueryBuilder('lt')
        .select(['lt'])
        .where('lock_type_id = :id', { id });

      const resultLockType = await result.getOneOrFail();
      expect(resultLockType.lock_type_id).to.be.eq(id);
      expect(resultLockType.str).to.be.eq(newLockType.str);

      addedLockTypeId.push(id);
    });
  });

  describe('method getById', () => {
    it('should raise error when given not exists locktype', async () => {
      const notExistsId = -1;
      await expect(LockTypeService.getInstance().getById(notExistsId)).to.be.rejectedWith(Error, `No such LockType with lockid: ${notExistsId}.`);
    });

    it('should get locktype with id', async () => {
      const addResult: AddResultDTO = await LockTypeService.getInstance().add(2, 'TEST GET');
      if(!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const id: number = addResult.id[0] as number;
      const locktype = await LockTypeService.getInstance().getById(id);
      expect(locktype.lock_type_id).to.be.eq(id);
      expect(locktype.str).to.be.eq('TEST GET');

      addedLockTypeId.push(id);
    });
  });

  describe('method deleteById', () => {
    it('should delete a locktype by id', async () => {
      const addResult: AddResultDTO = await LockTypeService.getInstance().add(3, 'TEST DELETE');
      if(!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const id: number = addResult.id[0] as number;

      await LockTypeService.getInstance().deleteById(id);
      await expect(LockTypeService.getInstance().getById(id))
        .to.be.rejectedWith(Error, `No such LockType with lockid: ${id}.`);
    });
  });

  describe('method updateById', () => {
    it('should change str to something else', async () => {
      const addResult: AddResultDTO = await LockTypeService.getInstance().add(4, 'TEST UPDATE');
      if(!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const id: number = addResult.id[0] as number;
      await LockTypeService.getInstance().updateById(id, 'TEST UPDATE SECOND');
      const locktype = await LockTypeService.getInstance().getById(id);
      expect(locktype.lock_type_id).to.be.eq(id);
      expect(locktype.str).not.to.be.eq('TEST UPDATE');

      addedLockTypeId.push(id);
    });
  });

  after('Recycle produced data', async () => {
    for(let i = 0; i < addedLockTypeId.length; i++) {
      const id = addedLockTypeId[i];
      await LockTypeService.getInstance().deleteById(id);
    }
  });
});
