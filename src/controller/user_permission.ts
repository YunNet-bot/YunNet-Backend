// src/controller/user_permission.ts

import { UserPermission } from "@/entry";
import { UserPermissionService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('UserPermission')
@Route('user_permission')
export class UserPermissionController extends Controller {
    @Get('{uid}')
    public async getByUid(
        @Path('uid') uid: number,
    ): Promise<UserPermission> {
        return UserPermissionService.getInstance().getByUid(uid);
    }

    @Get('{pid}')
    public async getByPid(
        @Path('pid') pid: number,
    ): Promise<UserPermission> {
        return UserPermissionService.getInstance().getByPid(pid);
    }

    @Delete('{uid}')
    public async deleteByUid(
        @Path('uid') uid: number,
    ): Promise<void> {
        UserPermissionService.getInstance().deleteByUid(uid);
    }

    @Delete('{pid}')
    public async deleteByPid(
        @Path('pid') pid: number,
    ): Promise<void> {
        UserPermissionService.getInstance().deleteByPid(pid);
    }
}