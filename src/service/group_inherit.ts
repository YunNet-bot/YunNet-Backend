// src/service/group_inherit.ts
import { DeleteResult, getRepository, Repository } from "typeorm";

import { GroupInherit } from '@/entry';

export class GroupInheritService {
    private static INSTANCE: GroupInheritService;
    private groupinheritRepo: Repository<GroupInherit>;

    public static init(): GroupInheritService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new GroupInheritService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): GroupInheritService {
        return this.INSTANCE;
    }

    constructor() {
        this.groupinheritRepo = getRepository(GroupInherit);
    }

    public async getByGid(gid: number): Promise<GroupInherit> {
        const groupinherit: GroupInherit | undefined = await this.groupinheritRepo.findOne({
            gid: gid,
        });

        if (groupinherit === undefined) {
            throw new Error(`No such GroupInherit with Gid: ${gid}.`);
        }
        return groupinherit;
    }

    public async deleteByGid(gid: number): Promise<boolean> {
        const result: DeleteResult = await this.groupinheritRepo.delete({
            gid: gid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}