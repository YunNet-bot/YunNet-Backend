// src/service/lock.ts

import { Lock } from "@/entry";
import { filterObjectUndefined } from "@/utils";
import { DeleteResult, getRepository, InsertResult, Repository, UpdateResult } from "typeorm";

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
            lock_id: lockId,
        });

        if(lock === undefined) {
            throw new Error(`No such Lock with id: ${lockId}.`);
        }

        return lock;
    }

    public async deleteById(lockId: number): Promise<boolean> {
        const result: DeleteResult = await this.lockRepo.delete({
            lock_id: lockId,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async add(lock_type_id: number, ip: string, uid: number, gid: number, lock_date: Date, unlock_date: Date, title: string, description: string, lock_by_user_id: number): Promise<any> {
        const result: InsertResult = await this.lockRepo.insert({
            lock_type_id, ip, uid, gid, lock_date, unlock_date, title, description, lock_by_user_id,
        });

        return result.raw;
    }

    public async updateById(lock_id: number, lock_type_id?: number, ip?: string, uid?: number, gid?: number, lock_date?: Date, unlock_date?: Date, title?: string, description?: string, lock_by_user_id?: number): Promise<any> {
        const result: UpdateResult = await this.lockRepo
            .createQueryBuilder()
            .update(Lock)
            .set(filterObjectUndefined({
                lock_type_id, ip, uid, gid, lock_date, unlock_date, title, description, lock_by_user_id,
            }))
            .where("lock_id = :lock_id", { lock_id })
            .execute();

        return result.raw;
    }
}