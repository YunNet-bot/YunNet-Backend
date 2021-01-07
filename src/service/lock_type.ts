// src/service/lock_type.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { LockType } from '@/entry';
import { filterObjectUndefined } from '@/utils';

export class LockTypeService {
  private static INSTANCE: LockTypeService;
  private locktypeRepo: Repository<LockType>;

  public static init(): LockTypeService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new LockTypeService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): LockTypeService {
    return this.INSTANCE;
  }

  constructor() {
    this.locktypeRepo = getRepository(LockType);
  }

  public async getById(lockid: number): Promise<LockType> {
    const locktype: LockType | undefined = await this.locktypeRepo.findOne({
      lock_type_id: lockid,
    });

    if (locktype === undefined) {
      throw new Error(`No such LockType with lockid: ${lockid}.`);
    }
    return locktype;
  }

  public async deleteById(lockId: number): Promise<boolean> {
    const result: DeleteResult = await this.locktypeRepo.delete({
      lock_type_id: lockId,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(lock_type_id: number, str: string | null): Promise<any> {
    const result: InsertResult = await this.locktypeRepo.insert({
      lock_type_id, str,
    });

    return result.raw;
  }

  public async updateById(lock_type_id: number, str?: string): Promise<any> {
    const result: UpdateResult = await this.locktypeRepo
      .createQueryBuilder()
      .update(LockType)
      .set(filterObjectUndefined({
        str,
      }))
      .where('lock_type_id = :lock_type_id', { lock_type_id })
      .execute();

    return result.raw;
  }
}
