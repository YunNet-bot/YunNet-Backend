// src/service/group_permission.ts
import { DeleteResult, getRepository, InsertResult, Repository, UpdateResult } from "typeorm";

import { GroupPermission } from "@/entry";
import { filterObjectUndefined } from "@/utils";

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
            gid,
        });

        if(grouppermission === undefined) {
            throw new Error(`No such GroupPermission with Gid: ${gid}.`);
        }
        return grouppermission;
    }

    public async getByPid(pid: number): Promise<GroupPermission> {
        const grouppermission: GroupPermission | undefined = await this.grouppermissionRepo.findOne({
            pid,
        });

        if(grouppermission === undefined) {
            throw new Error(`No such GroupPermission with Pid: ${pid}.`);
        }
        return grouppermission;
    }

    public async deleteByGid(gid: number): Promise<boolean> {
        const result: DeleteResult = await this.grouppermissionRepo.delete({
            gid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async deleteByPid(pid: number): Promise<boolean> {
        const result: DeleteResult = await this.grouppermissionRepo.delete({
            pid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async add(gid: number, pid: number): Promise<any> {
        const result: InsertResult = await this.grouppermissionRepo.insert({
            gid, pid,
        });

        return result.raw;
    }

    public async updateByGid(gid: number, pid: number): Promise<any> {
        const result: UpdateResult = await this.grouppermissionRepo
            .createQueryBuilder()
            .update(GroupPermission)
            .set(filterObjectUndefined({
                pid,
            }))
            .where("gid = :gid", { gid })
            .execute()
        
        return result.raw;
    }

    public async updateByPid(gid: number, pid: number): Promise<any> {
        const result: UpdateResult = await this.grouppermissionRepo
            .createQueryBuilder()
            .update(GroupPermission)
            .set(filterObjectUndefined({
                gid,
            }))
            .where("pid = :pid", { pid })
            .execute()
        
        return result.raw;
    }
}