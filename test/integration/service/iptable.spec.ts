// test/integration/service/iptable.spec.ts
import { expect } from 'chai';
import { InsertResult } from 'typeorm';

import { IpTable } from '@/entry';
import { filterAddResult, AddResultDTO } from '@/entry/dto';
import { IpTableService } from '@/service';

import { conn } from '../hook.spec';

const addedIPList: Array<string> = [];

describe('Iptable Service', async () => {
  describe('method add', () => {
    it('should add a new record in iptable.', async () => {
      //const newPermissionStr = 'new permission str';
      const ip = "111.112.113.114";
      const ip_type_id = 1;
      const is_unlimited = 1;
      const switch_id = 1;
      const port = 123;
      const port_type = 1;
      const mac = "a";
      const is_updated = 1;
      const uid = 1;
      const gid = 1;
      const description = "hi";
      const lock_id = 1;

      const addResult: AddResultDTO = await IpTableService.getInstance().add(
        ip,
        ip_type_id,
        is_unlimited,
        switch_id,
        port,
        port_type,
        mac,
        is_updated,
        uid,
        gid,
        description,
        lock_id,
      );
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const queryResult = conn.getConn()
        .getRepository(IpTable)
        .createQueryBuilder()
        .select(['ip', 'ip_type_id', 'is_unlimited', 'switch_id', 'port', 'port_type', 'mac', 'is_updated', 'uid', 'gid', 'description', 'lock_id'])
        .where('ip = :ip', { ip });

      const resultIptable = await queryResult.getOneOrFail();
      expect(resultIptable.ip).to.be.eq(ip);
      expect(resultIptable.ip_type_id).to.be.eq(ip_type_id);
      expect(resultIptable.is_unlimited).to.be.eq(is_unlimited);
      expect(resultIptable.switch_id).to.be.eq(switch_id);
      expect(resultIptable.port).to.be.eq(port);
      expect(resultIptable.port_type).to.be.eq(port_type);
      expect(resultIptable.is_updated).to.be.eq(is_updated);
      expect(resultIptable.uid).to.be.eq(uid);
      expect(resultIptable.gid).to.be.eq(gid);
      expect(resultIptable.description).to.be.eq(description);
      expect(resultIptable.lock_id).to.be.eq(lock_id);

      addedIPList.push(ip);
    });
  });

  after('Recycle produced data', async () => {
    for (let i = 0; i < addedIPList.length; i += 1) {
      const ip = addedIPList[i];
      await IpTableService.getInstance().deleteByIp(ip);
    }
  });
});
