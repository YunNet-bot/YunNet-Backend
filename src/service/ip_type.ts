// src/service/ip_type.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { IpType } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

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

  public async getById(iptypeId: number): Promise<IpType> {
    const iptype: IpType | null = await this.iptypeRepo.findOneBy({
      ip_type_id: iptypeId,
    });

    if (iptype === null) {
      throw new Error(`No such IpType with iptypeId: ${iptypeId}.`);
    }
    return iptype;
  }

  public async deleteById(iptypeId: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.iptypeRepo.delete({
      ip_type_id: iptypeId,
    });

    return filterDeleteResult(result);
  }

  public async add(ip_type_id: number, type: string | null): Promise<AddResultDTO> {
    const result: InsertResult = await this.iptypeRepo.insert({
      ip_type_id, type,
    });

    return filterAddResult(result);
  }

  public async updateById(ip_type_id: number, type?: string): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.iptypeRepo
      .createQueryBuilder()
      .update(IpType)
      .set(filterObjectUndefined({
        type,
      }))
      .where('ip_type_id = :ip_type_id', { ip_type_id })
      .execute();

    return filterUpdateResult(result);
  }
}
