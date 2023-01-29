// src/service/lock.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Lock } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult,
} from '@/entry/dto';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

export class LockService {
  private static INSTANCE: LockService;
  private lockRepo: Repository<Lock>;

  public static init(): LockService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new LockService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): LockService {
    return this.INSTANCE;
  }

  constructor() {
    this.lockRepo = getRepository(Lock);
  }

  public async getById(lockid: number): Promise<Lock> {
    const lock: Lock | null = await this.lockRepo.findOneBy({
      lock_id: lockid,
    });

    if (lock === null) {
      throw new Error(`No such Lock with id: ${lockid}.`);
    }
    return lock;
  }

  public async deleteById(lockId: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.lockRepo.delete({
      lock_id: lockId,
    });

    return filterDeleteResult(result);
  }

  public async add(
    lock_type_id: number, ip: string, uid: number, gid: number, lock_date: Date,
    unlock_date: Date, title: string, description: string, lock_by_user_id: number,
  ): Promise<AddResultDTO> {
    const result: InsertResult = await this.lockRepo.insert({
      lock_type_id, ip, uid, gid, lock_date, unlock_date, title, description, lock_by_user_id,
    });

    return filterAddResult(result);
  }

  public async updateById(
    lock_id: number, lock_type_id?: number, ip?: string, uid?: number, gid?: number,
    lock_date?: Date, unlock_date?: Date, title?: string, description?: string,
    lock_by_user_id?: number,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.lockRepo
      .createQueryBuilder()
      .update(Lock)
      .set(filterObjectUndefined({
        lock_type_id, ip, uid, gid, lock_date, unlock_date, title, description, lock_by_user_id,
      }))
      .where('lock_id = :lock_id', { lock_id })
      .execute();

    return filterUpdateResult(result);
  }
}
