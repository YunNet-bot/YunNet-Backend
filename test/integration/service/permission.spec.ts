// test/integration/service/permission.spec.ts
import { expect, use as chaiUse } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Permission } from '@/entry';
import { PermissionService } from '@/service';

import TestConnection from '../../test_connection';
import { AddResultDTO } from '@/entry/dto';

chaiUse(chaiAsPromised);
const conn = new TestConnection();

describe('Permission Service', async () => {
  before(async () => {
    await conn.create();
    PermissionService.init();
  });

  const firstPermission = new Permission({ pid: 1, str: 'test permission str' });
  describe('method add', () => {
    it('should add a new first permission.', async () => {
      const addResult: AddResultDTO = await PermissionService.getInstance().add(firstPermission.str);
      const pid: number = addResult['id'][0];

      const result = conn.getConn()
        .getRepository(Permission)
        .createQueryBuilder('p')
        .select(['p']);

      const resultCount = await result.getCount();
      expect(resultCount).to.be.eq(1);

      const resultPermission = await result.getOneOrFail();
      expect(resultPermission.pid).to.be.eq(pid);
      expect(resultPermission.str).to.be.eq(firstPermission.str);
    });
  });

  describe('method getByPid', () => {
    it('should raise error when given not exists pid', async () => {
      const notExistsPid = -1;
      await expect(PermissionService.getInstance().getByPid(notExistsPid)).to.be.rejectedWith(Error, `No such Permission with Pid: ${notExistsPid}.`);
    });

    it('should get first permission with pid 1', async () => {
      const permission = await PermissionService.getInstance().getByPid(1);
      expect(permission.pid).to.be.eq(firstPermission.pid);
      expect(permission.str).to.be.eq(firstPermission.str);
    });
  });

  describe('method deleteByPid', () => {
    it('should delete a permission by pid', async () => {
      const addResult = await PermissionService.getInstance().add('permission to be delete');
      const pidForDelete = addResult['id'][0];
      const result = conn.getConn()
        .getRepository(Permission)
        .createQueryBuilder('p')
        .select(['p']);

      const resultCount = await result.getCount();
      expect(resultCount).to.be.eq(2);

      await PermissionService.getInstance().deleteByPid(pidForDelete);
      await expect(PermissionService.getInstance().getByPid(pidForDelete)).to.be.rejectedWith(Error, `No such Permission with Pid: ${pidForDelete}.`);
    });
  });

  describe('method updateByPid', () => {
    it('should change str to something else', async () => {
      await PermissionService.getInstance().updateByPid(firstPermission.pid, 'updated firstPermission str');
      const updatedPermission = await PermissionService.getInstance().getByPid(firstPermission.pid);
      expect(updatedPermission.str).not.to.be.eq(firstPermission.str);
      expect(updatedPermission.str).to.be.eq('updated firstPermission str');
    });
  });

  after('TypeORM down', () => {
    conn.close();
  });
});
