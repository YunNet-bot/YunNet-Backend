// src/service/bed.ts
import { DeleteResult, getRepository, Repository } from "typeorm";

import { Bed } from '@/entry';

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
            bed: bed,
        });

        if(b === undefined) {
            throw new Error(`No such Bed with Bed Position: ${bed}.`);
        }
        return b;
    }

    public async deleteByBed(bed: string): Promise<boolean> {
        const result: DeleteResult = await this.bedRepo.delete({
            bed: bed,
        })

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}