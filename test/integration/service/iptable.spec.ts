// test/integration/service/iptable.spec.ts
import { expect } from 'chai';

import { IpTable } from '@/entry';
import { AddResultDTO } from '@/entry/dto';
import { IpTableService } from '@/service';

import { conn } from '../hook.spec';

const addedIPList: Array<string> = [];

describe('Iptable Service', async () => {
  describe('method add', () => {
    it('should add a new record in iptable.', async () => {
      const newIpTable: IpTable = {
        ip: '111.112.113.114',
        ip_type_id: 1,
        is_unlimited: 1,
        switch_id: 1,
        port: 123,
        port_type: 1,
        mac: 'a',
        is_updated: 1,
        uid: 1,
        gid: 123,
        description: 'hi',
        lock_id: 1,
      }

      const addResult: AddResultDTO = await IpTableService.getInstance().add(
        newIpTable.ip,
        newIpTable.ip_type_id,
        newIpTable.is_unlimited,
        newIpTable.switch_id,
        newIpTable.port,
        newIpTable.port_type,
        newIpTable.mac,
        newIpTable.is_updated,
        newIpTable.uid,
        newIpTable.gid,
        newIpTable.description,
        newIpTable.lock_id,
      );
      if (!addResult.success) {
        throw new Error(`Add failed: ${addResult.message}`);
      }
      const expectResult = newIpTable.ip;
      const queryResult = conn.getConn()
        .getRepository(IpTable)
        .createQueryBuilder()
        .select(
          ['ip', 'ip_type_id', 'is_unlimited', 'switch_id', 'port', 'port_type', 'mac', 'is_updated', 'uid', 'gid', 'description', 'lock_id'],
        )
        .where('ip = :ip', { expectResult });

      const resultIptable = await queryResult.getOneOrFail();
      expect(resultIptable.ip).to.be.eq(newIpTable.ip);
      expect(resultIptable.ip_type_id).to.be.eq(newIpTable.ip_type_id);
      expect(resultIptable.is_unlimited).to.be.eq(newIpTable.is_unlimited);
      expect(resultIptable.switch_id).to.be.eq(newIpTable.switch_id);
      expect(resultIptable.port).to.be.eq(newIpTable.port);
      expect(resultIptable.port_type).to.be.eq(newIpTable.port_type);
      expect(resultIptable.is_updated).to.be.eq(newIpTable.is_updated);
      expect(resultIptable.uid).to.be.eq(newIpTable.uid);
      expect(resultIptable.gid).to.be.eq(newIpTable.gid);
      expect(resultIptable.description).to.be.eq(newIpTable.description);
      expect(resultIptable.lock_id).to.be.eq(newIpTable.lock_id);

      addedIPList.push(newIpTable.ip);
    });
  });

  after('Recycle produced data', async () => {
    for (let i = 0; i < addedIPList.length; i += 1) {
      const ip = addedIPList[i];
      await IpTableService.getInstance().deleteByIp(ip);
    }
  });
});
