// test/integration/service/permission.spec.ts
import { expect } from 'chai';

import { Permission } from '@/entry';
import { AddResultDTO } from '@/entry/dto';
import { PermissionService } from '@/service';

import { conn } from '../hook.spec';

const addedPermissionPid: Array<number> = [];

describe.skip('Permission Service', async () => {
  describe('method add', () => {
    it('should add a new permission.', async () => {
      const newPermissionStr = 'new permission str';
      const addResult: AddResultDTO = await PermissionService.getInstance().add(newPermissionStr);
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const pid: number = addResult.id[0] as number;

      const result = conn.getDs
        .getRepository(Permission)
        .createQueryBuilder('p')
        .select(['p'])
        .where('pid = :pid', { pid });

      const resultPermission = await result.getOneOrFail();
      expect(resultPermission.pid).to.be.eq(pid);
      expect(resultPermission.str).to.be.eq(newPermissionStr);

      addedPermissionPid.push(pid);
    });
  });

  describe('method getByPid', () => {
    it('should raise error when given not exists pid', async () => {
      const notExistsPid = -1;
      await expect(PermissionService.getInstance().getByPid(notExistsPid)).to.be.rejectedWith(Error, `No such Permission with Pid: ${notExistsPid}.`);
    });

    it('should get permission with pid', async () => {
      const addResult: AddResultDTO = await PermissionService.getInstance().add('permission for get');
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const pid: number = addResult.id[0] as number;
      const permission = await PermissionService.getInstance().getByPid(pid);
      expect(permission.pid).to.be.eq(pid);
      expect(permission.str).to.be.eq('permission for get');

      addedPermissionPid.push(pid);
    });
  });

  describe('method deleteByPid', () => {
    it('should delete a permission by pid', async () => {
      const addResult = await PermissionService.getInstance().add('permission to be delete');
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const pid: number = addResult.id[0] as number;

      await PermissionService.getInstance().deleteByPid(pid);
      await expect(PermissionService.getInstance().getByPid(pid))
        .to.be.rejectedWith(Error, `No such Permission with Pid: ${pid}.`);
    });
  });

  describe('method updateByPid', () => {
    it('should change str to something else', async () => {
      const addResult: AddResultDTO = await PermissionService.getInstance().add('permission for update');
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const pid: number = addResult.id[0] as number;
      await PermissionService.getInstance().updateByPid(pid, 'updated permission for update');
      const updatedPermission = await PermissionService.getInstance().getByPid(pid);
      expect(updatedPermission.str).not.to.be.eq('permission for update');
      expect(updatedPermission.str).to.be.eq('updated permission for update');

      addedPermissionPid.push(pid);
    });
  });

  after('Recycle produced data', async () => {
    for (let i = 0; i < addedPermissionPid.length; i += 1) {
      const pid = addedPermissionPid[i];
      await PermissionService.getInstance().deleteByPid(pid);
    }
  });
});
