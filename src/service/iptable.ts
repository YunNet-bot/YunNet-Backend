// src/service/iptable.ts

import { IpTable } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

export class IpTableService {
    private static INSTANCE: IpTableService;
    private iptableRepo: Repository<IpTable>;

    public static init(): IpTableService {
        if(this.INSTANCE == undefined) {
            this.INSTANCE = new IpTableService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): IpTableService {
        return this.INSTANCE;
    }

    constructor() {
        this.iptableRepo = getRepository(IpTable);
    }

    public async getByIp(ip: string): Promise<IpTable> {
        const iptable: IpTable | undefined = await this.iptableRepo.findOne({
            ip: ip,
        });

        if(iptable === undefined) {
            throw new Error(`No such IpTable with ip: ${ip}.`);
        }

        return iptable;
    }

    public async deleteByIp(ip: string): Promise<boolean> {
        const result: DeleteResult = await this.iptableRepo.delete({
            ip: ip,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}