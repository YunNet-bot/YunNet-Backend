// src/service/group.ts

import { Group } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

export class GroupService {
    private static INSTANCE: GroupService;
    private groupRepo: Repository<Group>;

    public static init(): GroupService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new GroupService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): GroupService {
        return this.INSTANCE;
    }

    constructor() {
        this.groupRepo = getRepository(Group);
    }

    public async getByGid(gid: number): Promise<Group> {
        const group: Group | undefined = await this.groupRepo.findOne({
            gid: gid,
        });

        if(group === undefined) {
            throw new Error(`No such Group with Gid: ${gid}.`);
        }
        
        return group;
    }

    public async deleteByGid(gid: number): Promise<boolean> {
        const result: DeleteResult = await this.groupRepo.delete({
            gid: gid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}