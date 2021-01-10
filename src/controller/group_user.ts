// src/controller/group_user.ts

import { GroupUser } from "@/entry";
import { UpdateGroupUserGidDTO, UpdateGroupUserUidDTO } from "@/entry/dto";
import { GroupUserService } from "@/service";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";

@Tags('Group User')
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

    @Post()
    public async add(
        @Body() form: GroupUser,
    ): Promise<any> {
        const { gid, uid } = form;
        return GroupUserService.getInstance().add(uid, gid);
    }

    @Patch('{uid}')
    public async updateByUid(
        @Path('uid') uid: number,
        @Body() form: UpdateGroupUserUidDTO,
    ): Promise<any> {
        const { gid } = form;
        return GroupUserService.getInstance().updateByUid(uid, gid);
    }

    @Patch('{gid}')
    public async updateByGid(
        @Path('gid') gid: number,
        @Body() form: UpdateGroupUserGidDTO,
    ): Promise<any> {
        const { uid } = form;
        return GroupUserService.getInstance().updateByGid(uid, gid);
    }
}