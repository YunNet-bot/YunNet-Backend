// src/service/iptable_test.ts

import { IpTableTest } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

export class IpTableTestService {
    private static INSTANCE: IpTableTestService;
    private iptabletestRepo: Repository<IpTableTest>;

    public static init(): IpTableTestService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new IpTableTestService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): IpTableTestService {
        return this.INSTANCE;
    }

    constructor() {
        this.iptabletestRepo = getRepository(IpTableTest);
    }

    public async getByIp(ip: string): Promise<IpTableTest> {
        const iptabletest: IpTableTest | undefined = await this.iptabletestRepo.findOne({
            ip: ip,
        });

        if(iptabletest === undefined) {
            throw new Error(`No such IpTableTest with ip: ${ip}.`);
        }

        return iptabletest;
    }
    
    public async deleteByIp(ip: string): Promise<boolean> {
        const result: DeleteResult = await this.iptabletestRepo.delete({
            ip: ip,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}