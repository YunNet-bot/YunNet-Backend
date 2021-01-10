// src/service/user_permission.ts

import { UserPermission } from "@/entry";
import { filterObjectUndefined } from "@/utils";
import { DeleteResult, getRepository, InsertResult, Repository, UpdateResult } from "typeorm";

export class UserPermissionService {
    private static INSTANCE: UserPermissionService;
    private userpermissionRepo: Repository<UserPermission>;

    public static init(): UserPermissionService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new UserPermissionService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): UserPermissionService {
        return this.INSTANCE;
    }

    constructor() {
        this.userpermissionRepo = getRepository(UserPermission);
    }

    public async getByUid(uid: number): Promise<UserPermission> {
        const userperm: UserPermission | undefined = await this.userpermissionRepo.findOne({
            uid,
        });

        if(userperm === undefined) {
            throw new Error(`No such UserPermission with Uid: ${uid}.`);
        }

        return userperm;
    }

    public async getByPid(pid: number): Promise<UserPermission> {
        const userperm: UserPermission | undefined = await this.userpermissionRepo.findOne({
            pid,
        });

        if(userperm === undefined) {
            throw new Error(`No such UserPermission with Pid: ${pid}.`);
        }

        return userperm;
    }

    public async deleteByUid(uid: number): Promise<boolean> {
        const result: DeleteResult = await this.userpermissionRepo.delete({
            uid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async deleteByPid(pid: number): Promise<boolean> {
        const result: DeleteResult = await this.userpermissionRepo.delete({
            pid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async add(uid: number, pid: number, is_excluded: number): Promise<any> {
        const result: InsertResult = await this.userpermissionRepo.insert({
            uid, pid, is_excluded,
        });

        return result.raw;
    }

    public async updateByUid(uid: number, pid?: number, is_excluded?: number): Promise<any> {
        const result: UpdateResult = await this.userpermissionRepo
            .createQueryBuilder()
            .update(UserPermission)
            .set(filterObjectUndefined({
                pid, is_excluded,
            }))
            .where("uid = :uid", { uid })
            .execute();

        return result.raw;
    }

    public async updateByPid(pid: number, uid?: number, is_excluded?: number): Promise<any> {
        const result: UpdateResult = await this.userpermissionRepo
            .createQueryBuilder()
            .update(UserPermission)
            .set(filterObjectUndefined({
                uid, is_excluded,
            }))
            .where("pid = :pid", { pid })
            .execute();

        return result.raw;
    }
}