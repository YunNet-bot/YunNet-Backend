// src/service/group_permission.ts
import { DeleteResult, getRepository, Repository } from "typeorm";

import { GroupPermission } from "@/entry";

export class GroupPermissionService {
    private static INSTANCE: GroupPermissionService;
    private grouppermissionRepo: Repository<GroupPermission>;

    public static init(): GroupPermissionService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new GroupPermissionService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): GroupPermissionService {
        return this.INSTANCE;
    }

    constructor() {
        this.grouppermissionRepo = getRepository(GroupPermission);
    }

    public async getByGid(gid: number): Promise<GroupPermission> {
        const grouppermission: GroupPermission | undefined = await this.grouppermissionRepo.findOne({
            gid: gid,
        });

        if(grouppermission === undefined) {
            throw new Error(`No such GroupPermission with Gid: ${gid}.`);
        }
        return grouppermission;
    }

    public async getByPid(pid: number): Promise<GroupPermission> {
        const grouppermission: GroupPermission | undefined = await this.grouppermissionRepo.findOne({
            pid: pid,
        });

        if(grouppermission === undefined) {
            throw new Error(`No such GroupPermission with Pid: ${pid}.`);
        }
        return grouppermission;
    }

    public async deleteByGid(gid: number): Promise<boolean> {
        const result: DeleteResult = await this.grouppermissionRepo.delete({
            gid: gid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async deleteByPid(pid: number): Promise<boolean> {
        const result: DeleteResult = await this.grouppermissionRepo.delete({
            pid: pid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}