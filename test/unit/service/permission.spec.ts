// test/unit/service/permission.sepc.ts
import { expect } from 'chai';
import { assert, createSandbox } from 'sinon';
import { Connection, ConnectionManager, Repository } from 'typeorm';

import { PermissionService } from '@/service';
import { Permission } from '@/entry';
import { AddResultDTO, DeleteResultDTO } from '@/entry/dto';
import * as ormresult from '@/entry/dto/ormresult';

describe('Permission Service', async () => {
  const sandbox = createSandbox();
  const repoStub = sandbox.createStubInstance(Repository);
  sandbox.stub(ConnectionManager.prototype, 'get').returns({
    getRepository: sandbox.stub().withArgs(Permission).returns(repoStub),
  } as unknown as Connection);

  afterEach('Teardown Sinon instance', () => {
    sandbox.restore();
  });

  describe('method init', () => {
    it('should get same instance everytime', () => {
      const instance = PermissionService.init();

      expect(PermissionService.init()).not.to.be.eq(undefined);
      expect(PermissionService.init()).to.be.eq(instance);
    });
  });

  describe('method getByPid', () => {
    it('should getByPid', async () => {
      const findOneStub = sandbox.stub(repoStub, 'findOne').returns({
        pid: 1,
        str: 'permission str',
      } as any);

      const getResult: Permission | undefined = await PermissionService.getInstance().getByPid(1);

      assert.calledWith(repoStub.findOne, { pid: 1 } as any);
      expect(getResult.pid).to.be.eq(1);
      expect(getResult.str).to.be.eq('permission str');
      findOneStub.restore();
    });

    it('should fail with undefined', async () => {
      const findOneStub = sandbox.stub(repoStub, 'findOne').returns(undefined as any);

      await expect(PermissionService.getInstance().getByPid(1)).to.be.rejectedWith(Error, `No such Permission with Pid: 1.`);

      assert.calledWith(repoStub.findOne, { pid: 1 } as any);
      findOneStub.restore();
    });
  });

  describe('method deleteByPid', () => {
    it('should delete permission', async () => {
      const deleteStub = sandbox.stub(repoStub, 'delete').returns(sandbox.stub() as any);
      const filterStub = sandbox.stub(ormresult, 'filterDeleteResult').returns({
        success: true,
      });

      const deleteResult: DeleteResultDTO = await PermissionService.getInstance().deleteByPid(1);

      assert.calledWith(repoStub.delete, { pid: 1 } as any);

      expect(deleteResult.success).to.be.eq(true);
      filterStub.restore();
      deleteStub.restore();
    });

    it('should fail', async () => {
      const deleteStub = sandbox.stub(repoStub, 'delete').returns(sandbox.stub() as any);
      const filterStub = sandbox.stub(ormresult, 'filterDeleteResult').returns({
        success: false,
        message: '',
      });

      const deleteResult: DeleteResultDTO = await PermissionService.getInstance().deleteByPid(1);

      assert.calledWith(repoStub.delete, { pid: 1 } as any);
      expect(deleteResult.success).to.be.eq(false);
      expect(deleteResult.message).to.be.eq('');
      filterStub.restore();
      deleteStub.restore();
    });
  });

  describe('method add', () => {
    it('should add a new permission', async () => {
      const insertStub = sandbox.stub(repoStub, 'insert').returns(sandbox.stub() as any);
      const filterStub = sandbox.stub(ormresult, 'filterAddResult').returns({
        success: true,
        id: [ 1 ],
      });

      const newPermissionStr = 'new permission str';
      const addResult: AddResultDTO = await PermissionService.getInstance().add(newPermissionStr);

      assert.calledWith(repoStub.insert, { str: newPermissionStr } as any);

      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      expect(addResult.success).to.be.eq(true);
      expect(addResult.id).to.be.deep.eq([1]);
      filterStub.restore();
      insertStub.restore();
    });

    it('should fail', async () => {
      const insertStub = sandbox.stub(repoStub, 'insert').returns(sandbox.stub() as any);
      const filterStub = sandbox.stub(ormresult, 'filterAddResult').returns({
        success: false,
        message: '',
      });

      const failPermissionStr = 'fail permission str';
      const addResult: AddResultDTO = await PermissionService.getInstance().add(failPermissionStr);

      assert.calledWith(repoStub.insert, { str: failPermissionStr } as any);
      expect(addResult.success).to.be.eq(false);
      expect(addResult.message).to.be.eq('');
      filterStub.restore();
      insertStub.restore();
    });
  });

  describe('method updateByPid', () => {
    // Wait for program.
  });
});
