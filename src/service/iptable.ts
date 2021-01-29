// src/service/iptable.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { IpTable } from '@/entry';
import { filterObjectUndefined } from '@/utils';

export class IpTableService {
  private static INSTANCE: IpTableService;
  private iptableRepo: Repository<IpTable>;

  public static init(): IpTableService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new IpTableService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): IpTableService {
    return this.INSTANCE;
  }

  constructor() {
    this.iptableRepo = getRepository(IpTable);
  }

  public async getByIp(ip: string): Promise<IpTable> {
    const iptable: IpTable | undefined = await this.iptableRepo.findOne({
      ip,
    });

    if (iptable === undefined) {
      throw new Error(`No such IpTable with ip: ${ip}.`);
    }
    return iptable;
  }

  public async deleteByIp(ip: string): Promise<boolean> {
    const result: DeleteResult = await this.iptableRepo.delete({
      ip,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(
    ip: string, ipTypeId: number | null, isUnlimited: number, switchId: number | null,
    port: number, portType: number, mac: string | null, isUpdated: number,
    uid: number, gid: number, description: string, lockId: number | null,
  ): Promise<any> {
    const result: InsertResult = await this.iptableRepo.insert({
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
    port?: number, portType?: number, mac?: string, isUpdated?: number,
    uid?: number, gid?: number, description?: string, lockId?: number,
  ): Promise<any> {
    const result: UpdateResult = await this.iptableRepo
      .createQueryBuilder()
      .update(IpTable)
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
