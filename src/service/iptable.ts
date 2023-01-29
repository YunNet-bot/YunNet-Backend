// src/service/iptable.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { IpTable } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult,
} from '@/entry/dto';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

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
    const iptable: IpTable | null = await this.iptableRepo.findOneBy({
      ip,
    });

    if (iptable === null) {
      throw new Error(`No such IpTable with ip: ${ip}.`);
    }
    return iptable;
  }

  public async deleteByIp(ip: string): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.iptableRepo.delete({
      ip,
    });

    return filterDeleteResult(result);
  }

  public async add(
    ip: string, ip_type_id: number | null, is_unlimited: number, switch_id: number | null,
    port: number, port_type: number, mac: string | null, is_updated: number,
    uid: number, gid: number, description: string, lock_id: number | null,
  ): Promise<AddResultDTO> {
    const result: InsertResult = await this.iptableRepo.insert({
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
    });

    return filterAddResult(result);
  }

  public async updateByIp(
    ip: string, ip_type_id?: number, is_unlimited?: number, switch_id?: number,
    port?: number, port_type?: number, mac?: string, is_updated?: number,
    uid?: number, gid?: number, description?: string, lock_id?: number,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.iptableRepo
      .createQueryBuilder()
      .update(IpTable)
      .set(filterObjectUndefined({
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
      }))
      .where('ip = :ip', { ip })
      .execute();

    return filterUpdateResult(result);
  }
}
