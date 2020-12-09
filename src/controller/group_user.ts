// src/controller/group_user.ts

import { GroupUser } from "@/entry";
import { GroupUserService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('Group_User')
@Route('group_user')
export class GroupUserController extends Controller {
    @Get('{uid}')
    public async getByUid(
        @Path('uid') uid: number,
    ): Promise<GroupUser> {
        return GroupUserService.getInstance().getByUid(uid);
    }

    @Get('{gid}')
    public async getByGid(
        @Path('gid') gid: number,
    ): Promise<GroupUser> {
        return GroupUserService.getInstance().getByGid(gid);
    }

    @Delete('{uid}')
    public async deleteByUid(
        @Path('uid') uid: number,
    ): Promise<void> {
        GroupUserService.getInstance().deleteByUid(uid);
    }

    @Delete('{gid}')
    public async deleteByGid(
        @Path('gid') gid: number,
    ): Promise<void> {
        GroupUserService.getInstance().deleteByGid(gid);
    }
}