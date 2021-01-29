// src/service/ip_type.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { IpType } from '@/entry';
import { filterObjectUndefined } from '@/utils';

export class IpTypeService {
  private static INSTANCE: IpTypeService;
  private iptypeRepo: Repository<IpType>;

  public static init(): IpTypeService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new IpTypeService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): IpTypeService {
    return this.INSTANCE;
  }

  constructor() {
    this.iptypeRepo = getRepository(IpType);
  }

  public async getById(ipTypeId: number): Promise<IpType> {
    const iptype: IpType | undefined = await this.iptypeRepo.findOne({
      ipTypeId,
    });

    if (iptype === undefined) {
      throw new Error(`No such IpType with ipTypeId: ${ipTypeId}.`);
    }
    return iptype;
  }

  public async deleteById(ipTypeId: number): Promise<boolean> {
    const result: DeleteResult = await this.iptypeRepo.delete({
      ipTypeId,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(ipTypeId: number, type: string | null): Promise<any> {
    const result: InsertResult = await this.iptypeRepo.insert({
      ipTypeId, type,
    });

    return result.raw;
  }

  public async updateById(ipTypeId: number, type?: string): Promise<any> {
    const result: UpdateResult = await this.iptypeRepo
      .createQueryBuilder()
      .update(IpType)
      .set(filterObjectUndefined({
        type,
      }))
      .where('ip_type_id = :ipTypeId', { ipTypeId })
      .execute();

    return result.raw;
  }
}
