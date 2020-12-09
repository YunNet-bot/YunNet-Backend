// src/service/lock_type.ts

import { LockType } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

export class LockTypeService {
    private static INSTANCE: LockTypeService;
    private locktypeRepo: Repository<LockType>;

    public static init(): LockTypeService {
        if(this.INSTANCE === undefined) {
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

        if(locktype === undefined) {
            throw new Error(`No such LockType with lockid: ${lockid}.`);
        }

        return locktype;
    }

    public async deleteById(lockid: number): Promise<boolean> {
        const result: DeleteResult = await this.locktypeRepo.delete({
            lock_type_id: lockid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}