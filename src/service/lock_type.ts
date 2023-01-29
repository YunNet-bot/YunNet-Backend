// src/service/lock_type.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { LockType } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult,
} from '@/entry/dto';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

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
    const locktype: LockType | null = await this.locktypeRepo.findOneBy({
      lock_type_id: lockid,
    });

    if (locktype === null) {
      throw new Error(`No such LockType with lockid: ${lockid}.`);
    }
    return locktype;
  }

  public async deleteById(lockId: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.locktypeRepo.delete({
      lock_type_id: lockId,
    });

    return filterDeleteResult(result);
  }

  public async add(lock_type_id: number, str: string | null): Promise<AddResultDTO> {
    const result: InsertResult = await this.locktypeRepo.insert({
      lock_type_id, str,
    });

    return filterAddResult(result);
  }

  public async updateById(lock_type_id: number, str?: string): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.locktypeRepo
      .createQueryBuilder()
      .update(LockType)
      .set(filterObjectUndefined({
        str,
      }))
      .where('lock_type_id = :lock_type_id', { lock_type_id })
      .execute();

    return filterUpdateResult(result);
  }
}
