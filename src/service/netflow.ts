// src/service/netflow.ts

import { Netflow } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

export class NetflowService {
    private static INSTANCE: NetflowService;
    private netflowRepo: Repository<Netflow>;

    public static init(): NetflowService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new NetflowService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): NetflowService {
        return this.INSTANCE;
    }

    constructor() {
        this.netflowRepo = getRepository(Netflow);
    }

    public async getByIp(ip: number): Promise<Netflow> {
        const netflow: Netflow | undefined = await this.netflowRepo.findOne({
            ip: ip,
        });

        if(netflow === undefined) {
            throw new Error(`No such Netflow with ip: ${ip}.`);
        }

        return netflow;
    }

    public async deleteByIp(ip: number): Promise<boolean> {
        const result: DeleteResult = await this.netflowRepo.delete({
            ip: ip,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}