// src/service/netflow.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Netflow } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

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

  public async deleteByIp(ip: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.netflowRepo.delete({
      ip,
    });

    return filterDeleteResult(result);
  }

  public async add(
    ip: number, wan_upload: number, wan_download: number,
    lan_upload: number, lan_download: number,
  ): Promise<AddResultDTO> {
    const result: InsertResult = await this.netflowRepo.insert({
      ip, wan_upload, wan_download, lan_upload, lan_download,
    });

    return filterAddResult(result);
  }

  public async updateByIp(
    ip: number, wan_upload?: number, wan_download?: number,
    lan_upload?: number, lan_download?: number,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.netflowRepo
      .createQueryBuilder()
      .update(Netflow)
      .set(filterObjectUndefined({
        wan_upload, wan_download, lan_upload, lan_download,
      }))
      .where('ip = :ip', { ip })
      .execute();

    return filterUpdateResult(result);
  }
}
