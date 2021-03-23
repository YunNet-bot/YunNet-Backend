// test/integration/service/group.spec.ts
import { expect } from 'chai';

import { Group } from '@/entry';
import { AddResultDTO } from '@/entry/dto';
import { GroupService } from '@/service';

import { conn } from '../hook.spec';

const addedGidList: Array<number> = [];

describe('Group Service', async () => {
  describe('method add', () => {
    it('should add a new record in group.', async () => {
      const name = 'tester';
      const description = 'control all the things';

      const addResult: AddResultDTO = await GroupService.getInstance().add(
        name,
        description,
      );
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const queryResult = await conn.getConn()
        .getRepository(Group)
        .createQueryBuilder('grp')
        .select(['grp.name', 'grp.description'])
        .where('grp.name = :name', { name });
      const resultGroup = await queryResult.getOneOrFail();
      const { gid } = resultGroup;
      expect(resultGroup.name).to.be.eq(name);
      expect(resultGroup.description).to.be.eq(description);
      addedGidList.push(gid);
    });
  });

  describe('method getByGid', () => {
    it('should raise error when given not exists gid', async () => {
      const notExistsGid = -1;
      await expect(GroupService.getInstance().getByGid(notExistsGid)).to.be.rejectedWith(Error, `No such Group with Gid: ${notExistsGid}.`);
    });

    it('should get group with gid', async () => {
      const name = 'for get by gid';
      const description = 'group for get';
      const addResult: AddResultDTO = await GroupService.getInstance().add(name, description);
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const gid: number = addResult.id[0] as number;
      const group = await GroupService.getInstance().getByGid(gid);
      expect(group.gid).to.be.eq(gid);
      expect(group.name).to.be.eq(name);
      expect(group.description).to.be.eq(description);

      addedGidList.push(gid);
    });
  });

  describe('method deleteByGid', () => {
    it('should delete a group by gid', async () => {
      const name = 'name for delete';
      const description = 'description for delete';
      const addResult = await GroupService.getInstance().add(name, description);
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const gid: number = addResult.id[0] as number;

      await GroupService.getInstance().deleteByGid(gid);
      await expect(GroupService.getInstance().getByGid(gid))
        .to.be.rejectedWith(Error, `No such Group with Gid: ${gid}.`);
    });
  });

  describe('method updateByGid', () => {
    it('should change description to something else', async () => {
      const name = 'name for update';
      const description = 'description for update';
      const addResult: AddResultDTO = await GroupService.getInstance().add(name, description);
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const gid: number = addResult.id[0] as number;
      const newDescription = 'new description from update';
      const newName = 'new name from update';
      await GroupService.getInstance().updateByGid(gid, newName, newDescription);
      const updatedGroup = await GroupService.getInstance().getByGid(gid);

      expect(updatedGroup.description).not.to.be.eq(description);
      expect(updatedGroup.description).to.be.eq(newDescription);

      expect(updatedGroup.name).not.to.be.eq(name);
      expect(updatedGroup.name).to.be.eq(newName);

      expect(updatedGroup.gid).to.be.eq(gid);

      addedGidList.push(gid);
    });
  });

  after('Recycle produced data', async () => {
    Object.values(addedGidList).map(async (gid: number) => {
      await GroupService.getInstance().deleteByGid(gid);
    });
  });
});
