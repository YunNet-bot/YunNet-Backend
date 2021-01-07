// src/service/bed.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Bed } from '@/entry';
import { filterObjectUndefined } from '@/utils';

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
    const b: Bed | undefined = await this.bedRepo.findOne({
      bed,
    });

    if (b === undefined) {
      throw new Error(`No such Bed with Bed Position: ${bed}.`);
    }
    return b;
  }

  public async deleteByBed(bed: string): Promise<boolean> {
    const result: DeleteResult = await this.bedRepo.delete({
      bed,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(bed: string, type: number, portal: string | null, ip: string): Promise<any> {
    const result: InsertResult = await this.bedRepo.insert({
      bed, type, portal, ip,
    });

    return result.raw;
  }

  public async updateByBed(bed: string, type?: number, portal?: string, ip?: string): Promise<any> {
    const result: UpdateResult = await this.bedRepo
      .createQueryBuilder()
      .update(Bed)
      .set(filterObjectUndefined({
        type, portal, ip,
      }))
      .where('bed = :bed', { bed })
      .execute();

    return result.raw;
  }
}
