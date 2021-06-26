// test/integration/service/ip_type_id.spec.ts
import { expect } from 'chai';

import { IpType } from '@/entry';
import { AddResultDTO } from '@/entry/dto';
import { IpTypeService } from '@/service';

import { conn } from '../hook.spec';

const addedIpTypeList: Array<number> = [];

describe('Iptype Service', async () => {
  describe('method add', () => {
    it('should add a new record in ip_type.', async () => {
      const newIpType: IpType = {
        ip_type_id: 1,
        type: 'hi',
      };
      const addResult: AddResultDTO = await IpTypeService.getInstance().add(
        newIpType.ip_type_id,
        newIpType.type,
      );
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const temp = newIpType.ip_type_id;
      const queryResult = await conn.getConn()
        .getRepository(IpType)
        .createQueryBuilder()
        .select(
          ['ip_type_id', 'type'],
        )
        .where('ip_type_id = :temp', { temp });
      const resultIpType = await queryResult.getOneOrFail();
      expect(resultIpType.ip_type_id).to.be.eq(newIpType.ip_type_id);
      expect(resultIpType.type).to.be.eq(newIpType.type);
      addedIpTypeList.push(newIpType.ip_type_id);
    });
  });

  describe('method getById', () => {
    it('should raise error when given not exists ip_type_id', async () => {
      const notExistIpTypeId = -1;
      await expect(IpTypeService.getInstance().getById(notExistIpTypeId)).to.be.rejectedWith(Error, `No such IpType with iptypeId: ${notExistIpTypeId}.`);
    });

    it('should get type with ip_type_id', async () => {
      const ipTypeId = 1234;
      const type = 'type to test ip_type';
      const addResult: AddResultDTO = await IpTypeService.getInstance().add(ipTypeId, type);
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const ipType = await IpTypeService.getInstance().getById(ipTypeId);
      expect(ipType.ip_type_id).to.be.eq(ipTypeId);
      expect(ipType.type).to.be.eq(type);
      addedIpTypeList.push(ipTypeId);
    });
  });

  describe('method deleteById', () => {
    it('should delete a ip_type by id', async () => {
      const ipTypeId = 1235;
      const type = 'type to test delete';
      const addResult = await IpTypeService.getInstance().add(ipTypeId, type);
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }

      await IpTypeService.getInstance().deleteById(ipTypeId);
      await expect(IpTypeService.getInstance().getById(ipTypeId))
        .to.be.rejectedWith(Error, `No such IpType with iptypeId: ${ipTypeId}.`);
    });
  });

  describe('method updateById', () => {
    it('should change type to something else', async () => {
      const ipTypeId = 4321;
      const type = 'name for update';
      const addResult: AddResultDTO = await IpTypeService.getInstance().add(ipTypeId, type);
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const newType = 'new type from update';
      await IpTypeService.getInstance().updateById(ipTypeId, newType);
      const updatedIpType = await IpTypeService.getInstance().getById(ipTypeId);

      expect(updatedIpType.type).not.to.be.eq(type);
      expect(updatedIpType.type).to.be.eq(newType);

      expect(updatedIpType.ip_type_id).to.be.eq(ipTypeId);

      addedIpTypeList.push(ipTypeId);
    });
  });

  after('Recycle produced data', async () => {
    for (let i = 0; i < addedIpTypeList.length; i += 1) {
      const ipTypeId = addedIpTypeList[i];
      await IpTypeService.getInstance().deleteById(ipTypeId);
    }
  });
});

