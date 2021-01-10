// src/service/group_user.ts
import { DeleteResult, getRepository, InsertResult, Repository, UpdateResult } from "typeorm";

import { GroupUser } from "@/entry";
import { filterObjectUndefined } from "@/utils";

export class GroupUserService {
    private static INSTANCE: GroupUserService;
    private groupuserRepo: Repository<GroupUser>;

    public static init(): GroupUserService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new GroupUserService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): GroupUserService {
        return this.INSTANCE;
    }

    constructor() {
        this.groupuserRepo = getRepository(GroupUser);
    }

    public async getByUid(uid: number): Promise<GroupUser> {
        const groupuser: GroupUser | undefined = await this.groupuserRepo.findOne({
            uid,
        });

        if(groupuser === undefined) {
            throw new Error(`No such GroupUser with Uid: ${uid}.`);
        }

        return groupuser;
    }

    public async getByGid(gid: number): Promise<GroupUser> {
        const groupuser: GroupUser | undefined = await this.groupuserRepo.findOne({
            gid,
        });

        if(groupuser === undefined) {
            throw new Error(`No such GroupUser with Gid: ${gid}.`);
        }

        return groupuser;
    }

    public async deleteByUid(uid: number): Promise<boolean> {
        const result: DeleteResult = await this.groupuserRepo.delete({
            uid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async deleteByGid(gid: number): Promise<boolean> {
        const result: DeleteResult = await this.groupuserRepo.delete({
            gid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async add(uid: number, gid: number): Promise<any> {
        const result: InsertResult = await this.groupuserRepo.insert({
            uid, gid,
        });

        return result.raw;
    }

    public async updateByUid(uid: number, gid: number): Promise<any> {
        const result: UpdateResult = await this.groupuserRepo
            .createQueryBuilder()
            .update(GroupUser)
            .set(filterObjectUndefined({
                gid,
            }))
            .where("uid = :uid", { uid })
            .execute();

        return result.raw;
    }

    public async updateByGid(uid: number, gid: number): Promise<any> {
        const result: UpdateResult = await this.groupuserRepo
            .createQueryBuilder()
            .update(GroupUser)
            .set(filterObjectUndefined({
                uid,
            }))
            .where("gid = :gid", { gid })
            .execute();

        return result.raw;
    }
}