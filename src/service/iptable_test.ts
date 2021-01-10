// src/service/iptable_test.ts

import { IpTableTest } from "@/entry";
import { filterObjectUndefined } from "@/utils";
import { DeleteResult, getRepository, InsertResult, Repository, UpdateResult } from "typeorm";

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
            ip,
        });

        if(iptabletest === undefined) {
            throw new Error(`No such IpTableTest with ip: ${ip}.`);
        }

        return iptabletest;
    }
    
    public async deleteByIp(ip: string): Promise<boolean> {
        const result: DeleteResult = await this.iptabletestRepo.delete({
            ip,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async add(ip: string, ip_type_id: number, is_unlimited: number, switch_id: number, port: number, port_type: number, mac: string, is_updated: number, uid: number, gid: number, description: string, lock_id: number): Promise<any> {
        const result: InsertResult = await this.iptabletestRepo.insert({
            ip, ip_type_id, is_unlimited, switch_id, port, port_type, mac, is_updated, uid, gid, description, lock_id,
        });

        return result.raw;
    }

    public async updateByIp(ip: string, ip_type_id?: number, is_unlimited?: number, switch_id?: number, port?: number, port_type?: number, mac?: string, is_updated?: number, uid?: number, gid?: number, description?: string, lock_id?: number): Promise<any> {
        const result: UpdateResult = await this.iptabletestRepo
            .createQueryBuilder()
            .update(IpTableTest)
            .set(filterObjectUndefined({
                ip_type_id, is_unlimited, switch_id, port, port_type, mac, is_updated, uid, gid, description, lock_id,
            }))
            .where("ip = :ip", { ip })
            .execute();

        return result.raw;
    }
}