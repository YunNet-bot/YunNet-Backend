// src/service/group_managed_by.ts
import { DeleteResult, getRepository, Repository } from 'typeorm';

import { GroupManagedBy } from '@/entry';

export class GroupManagedByService {
    private static INSTANCE: GroupManagedByService;
    private groupmanagedbyRepo: Repository<GroupManagedBy>;

    public static init(): GroupManagedByService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new GroupManagedByService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): GroupManagedByService {
        return this.INSTANCE;
    }

    constructor() {
        this.groupmanagedbyRepo = getRepository(GroupManagedBy);
    }

    public async getByGid(gid: number): Promise<GroupManagedBy> {
        const groupmanagedby: GroupManagedBy | undefined = await this.groupmanagedbyRepo.findOne({
            gid: gid,
        });

        if (groupmanagedby === undefined) {
            throw new Error(`No such GroupManageBy with Gid: ${gid}.`);
        }
        return groupmanagedby;
    }

    public async deleteByGid(gid: number): Promise<boolean> {
        const result: DeleteResult = await this.groupmanagedbyRepo.delete({
            gid: gid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}