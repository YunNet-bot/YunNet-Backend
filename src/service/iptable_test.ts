// src/service/iptable_test.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { IpTableTest } from '@/entry';
import { filterObjectUndefined } from '@/utils';

export class IpTableTestService {
  private static INSTANCE: IpTableTestService;
  private iptabletestRepo: Repository<IpTableTest>;

  public static init(): IpTableTestService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new IpTableTestService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): IpTableTestService {
    return this.INSTANCE;
  }

  constructor() {
    this.iptabletestRepo = getRepository(IpTableTest);
  }

  public async getByIp(ip: string): Promise<IpTableTest> {
    const iptabletest: IpTableTest | undefined = await this.iptabletestRepo.findOne({
      ip,
    });

    if (iptabletest === undefined) {
      throw new Error(`No such IpTableTest with ip: ${ip}.`);
    }
    return iptabletest;
  }

  public async deleteByIp(ip: string): Promise<boolean> {
    const result: DeleteResult = await this.iptabletestRepo.delete({
      ip,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(
    ip: string, ipTypeId: number | null, isUnlimited: number, switchId: number | null,
    port: number, portType: number, mac: string | null, isUpdated: number, uid: number,
    gid: number, description: string, lockId: number | null,
  ): Promise<any> {
    const result: InsertResult = await this.iptabletestRepo.insert({
      ip,
      ipTypeId,
      isUnlimited,
      switchId,
      port,
      portType,
      mac,
      isUpdated,
      uid,
      gid,
      description,
      lockId,
    });

    return result.raw;
  }

  public async updateByIp(
    ip: string, ipTypeId?: number, isUnlimited?: number, switchId?: number,
    port?: number, portType?: number, mac?: string, isUpdated?: number, uid?: number,
    gid?: number, description?: string, lockId?: number,
  ): Promise<any> {
    const result: UpdateResult = await this.iptabletestRepo
      .createQueryBuilder()
      .update(IpTableTest)
      .set(filterObjectUndefined({
        ipTypeId,
        isUnlimited,
        switchId,
        port,
        portType,
        mac,
        isUpdated,
        uid,
        gid,
        description,
        lockId,
      }))
      .where('ip = :ip', { ip })
      .execute();

    return result.raw;
  }
}
