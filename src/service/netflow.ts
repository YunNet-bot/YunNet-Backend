// src/service/netflow.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Netflow } from '@/entry';
import { filterObjectUndefined } from '@/utils';

export class NetflowService {
  private static INSTANCE: NetflowService;
  private netflowRepo: Repository<Netflow>;

  public static init(): NetflowService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new NetflowService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): NetflowService {
    return this.INSTANCE;
  }

  constructor() {
    this.netflowRepo = getRepository(Netflow);
  }

  public async getByIp(ip: number): Promise<Netflow> {
    const netflow: Netflow | undefined = await this.netflowRepo.findOne({
      ip,
    });

    if (netflow === undefined) {
      throw new Error(`No such Netflow with ip: ${ip}.`);
    }
    return netflow;
  }

  public async deleteByIp(ip: number): Promise<boolean> {
    const result: DeleteResult = await this.netflowRepo.delete({
      ip,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(
    ip: number, wanUpload: number, wanDownload: number,
    lanUpload: number, lanDownload: number,
  ): Promise<any> {
    const result: InsertResult = await this.netflowRepo.insert({
      ip, wanUpload, wanDownload, lanUpload, lanDownload,
    });

    return result.raw;
  }

  public async updateByIp(
    ip: number, wanUpload?: number, wanDownload?: number,
    lanUpload?: number, lanDownload?: number,
  ): Promise<any> {
    const result: UpdateResult = await this.netflowRepo
      .createQueryBuilder()
      .update(Netflow)
      .set(filterObjectUndefined({
        wanUpload, wanDownload, lanUpload, lanDownload,
      }))
      .where('ip = :ip', { ip })
      .execute();

    return result.raw;
  }
}
