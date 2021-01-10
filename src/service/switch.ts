// src/service/switch.ts

import { Switch } from "@/entry";
import { filterObjectUndefined } from "@/utils";
import { DeleteResult, getRepository, InsertResult, Repository, UpdateResult } from "typeorm";

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
            id,
        });

        if(switchid === undefined) {
            throw new Error(`No such Switch with id: ${id}.`);
        }

        return switchid;
    }

    public async deleteById(id: number): Promise<boolean> {
        const result: DeleteResult = await this.switchRepo.delete({
            id,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async add(id: number, upper_switch: number, upper_port: number, upper_port_type: number, location: string, account: string, password: string, vlan: string, machine_type: number, port_description: string, port_type: string, ip: string): Promise<any> {
        const result: InsertResult = await this.switchRepo.insert({
            id, upper_switch, upper_port, upper_port_type, location, account, password, vlan, machine_type, port_description, port_type, ip,
        });

        return result.raw;
    }

    public async updateById(id: number, upper_switch?: number, upper_port?: number, upper_port_type?: number, location?: string, account?: string, password?: string, vlan?: string, machine_type?: number, port_description?: string, port_type?: string, ip?: string): Promise<any> {
        const result: UpdateResult = await this.switchRepo
            .createQueryBuilder()
            .update(Switch)
            .set(filterObjectUndefined({
                upper_switch, upper_port, upper_port_type, location, account, password, vlan, machine_type, port_description, port_type, ip,
            }))
            .where("id = :id", { id })
            .execute();

        return result.raw;
    }
}