// src/service/user_permission.ts

import { UserPermission } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

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
            uid: uid,
        });

        if(userperm === undefined) {
            throw new Error(`No such UserPermission with Uid: ${uid}.`);
        }

        return userperm;
    }

    public async getByPid(pid: number): Promise<UserPermission> {
        const userperm: UserPermission | undefined = await this.userpermissionRepo.findOne({
            pid: pid,
        });

        if(userperm === undefined) {
            throw new Error(`No such UserPermission with Pid: ${pid}.`);
        }

        return userperm;
    }

    public async deleteByUid(uid: number): Promise<boolean> {
        const result: DeleteResult = await this.userpermissionRepo.delete({
            uid: uid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async deleteByPid(pid: number): Promise<boolean> {
        const result: DeleteResult = await this.userpermissionRepo.delete({
            pid: pid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}