// src/service/lock.ts

import { Lock } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

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
        const lock: Lock | undefined = await this.lockRepo.findOne({
            lock_id: lockid,
        });

        if(lock === undefined) {
            throw new Error(`No such Lock with id: ${lockid}.`);
        }

        return lock;
    }

    public async deleteById(lockid: number): Promise<boolean> {
        const result: DeleteResult = await this.lockRepo.delete({
            lock_id: lockid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}