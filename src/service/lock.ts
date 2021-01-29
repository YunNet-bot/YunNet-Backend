// src/service/lock.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Lock } from '@/entry';
import { filterObjectUndefined } from '@/utils';

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

  public async getById(lockId: number): Promise<Lock> {
    const lock: Lock | undefined = await this.lockRepo.findOne({
      lockId,
    });

    if (lock === undefined) {
      throw new Error(`No such Lock with id: ${lockId}.`);
    }
    return lock;
  }

  public async deleteById(lockId: number): Promise<boolean> {
    const result: DeleteResult = await this.lockRepo.delete({
      lockId,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(
    lockTypeId: number, ip: string, uid: number, gid: number, lockDate: Date,
    unlockDate: Date, title: string, description: string, lockByUserId: number,
  ): Promise<number> {
    const result: InsertResult = await this.lockRepo.insert({
      lockTypeId, ip, uid, gid, lockDate, unlockDate, title, description, lockByUserId,
    });

    return result.raw.insertId;
  }

  public async updateById(
    lockId: number, lockTypeId?: number, ip?: string, uid?: number, gid?: number,
    lockDate?: Date, unlockDate?: Date, title?: string, description?: string,
    lockByUserId?: number,
  ): Promise<any> {
    const result: UpdateResult = await this.lockRepo
      .createQueryBuilder()
      .update(Lock)
      .set(filterObjectUndefined({
        lockTypeId, ip, uid, gid, lockDate, unlockDate, title, description, lockByUserId,
      }))
      .where('lock_id = :lockId', { lockId })
      .execute();

    return result.raw;
  }
}
