// src/service/bed.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Bed } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

export class BedService {
  private static INSTANCE: BedService;
  private bedRepo: Repository<Bed>;

  public static init(): BedService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new BedService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): BedService {
    return this.INSTANCE;
  }

  constructor() {
    this.bedRepo = getRepository(Bed);
  }

  public async getByBed(bed: string): Promise<Bed> {
    const b: Bed | null = await this.bedRepo.findOneBy({
      bed,
    });

    if (b === null) {
      throw new Error(`No such Bed with Bed Position: ${bed}.`);
    }
    return b;
  }

  public async deleteByBed(bed: string): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.bedRepo.delete({
      bed,
    });

    return filterDeleteResult(result);
  }

  public async add(
    bed: string, type: number, portal: string | null, ip: string,
  ): Promise<AddResultDTO> {
    const result: InsertResult = await this.bedRepo.insert({
      bed, type, portal, ip,
    });

    return filterAddResult(result);
  }

  public async updateByBed(
    bed: string, type?: number, portal?: string, ip?: string,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.bedRepo
      .createQueryBuilder()
      .update(Bed)
      .set(filterObjectUndefined({
        type, portal, ip,
      }))
      .where('bed = :bed', { bed })
      .execute();

    return filterUpdateResult(result);
  }
}
