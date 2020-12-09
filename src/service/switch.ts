// src/service/switch.ts

import { Switch } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

export class SwitchService {
    private static INSTANCE: SwitchService;
    private switchRepo: Repository<Switch>;

    public static init(): SwitchService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new SwitchService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): SwitchService {
        return this.INSTANCE;
    }

    constructor() {
        this.switchRepo = getRepository(Switch);
    }

    public async getById(id: number): Promise<Switch> {
        const switchid: Switch | undefined = await this.switchRepo.findOne({
            id: id,
        });

        if(switchid === undefined) {
            throw new Error(`No such Switch with id: ${id}.`);
        }

        return switchid;
    }

    public async deleteById(id: number): Promise<boolean> {
        const result: DeleteResult = await this.switchRepo.delete({
            id: id,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}