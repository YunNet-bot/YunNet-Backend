// src/service/iptable_test.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { IpTableTest } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult,
} from '@/entry/dto';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

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
    const iptabletest: IpTableTest | null = await this.iptabletestRepo.findOneBy({
      ip,
    });

    if (iptabletest === null) {
      throw new Error(`No such IpTableTest with ip: ${ip}.`);
    }
    return iptabletest;
  }

  public async deleteByIp(ip: string): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.iptabletestRepo.delete({
      ip,
    });

    return filterDeleteResult(result);
  }

  public async add(
    ip: string, ip_type_id: number | null, is_unlimited: number, switch_id: number | null,
    port: number, port_type: number, mac: string | null, is_updated: number, uid: number,
    gid: number, description: string, lock_id: number | null,
  ): Promise<AddResultDTO> {
    const result: InsertResult = await this.iptabletestRepo.insert({
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
    port?: number, port_type?: number, mac?: string, is_updated?: number, uid?: number,
    gid?: number, description?: string, lock_id?: number,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.iptabletestRepo
      .createQueryBuilder()
      .update(IpTableTest)
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
