// src/service/ip_type.ts

import { IpType } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

export class IpTypeService {
    private static INSTANCE: IpTypeService;
    private iptypeRepo: Repository<IpType>;

    public static init(): IpTypeService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new IpTypeService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): IpTypeService {
        return this.INSTANCE;
    }

    constructor() {
        this.iptypeRepo = getRepository(IpType);
    }

    public async getById(iptypeId: number): Promise<IpType> {
        const iptype: IpType | undefined = await this.iptypeRepo.findOne({
            ip_type_id: iptypeId,
        });

        if(iptype === undefined) {
            throw new Error(`No such IpType with iptypeId: ${iptypeId}.`);
        }
        
        return iptype;
    }

    public async deleteById(iptypeId: number): Promise<boolean> {
        const result: DeleteResult = await this.iptypeRepo.delete({
            ip_type_id: iptypeId,
        });
        
        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}