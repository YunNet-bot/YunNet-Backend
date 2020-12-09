// src/controller/group_permission.ts
import { GroupPermission } from "@/entry";
import { GroupPermissionService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";


@Tags('Group_Permission')
@Route('group_permission')
export class GroupPermissionController extends Controller {
    @Get('{gid}')
    public async getByGid(
        @Path('gid') gid: number,
    ): Promise<GroupPermission> {
        return GroupPermissionService.getInstance().getByGid(gid);
    }

    @Get('{pid}')
    public async getByPid(
        @Path('pid') pid: number,
    ): Promise<GroupPermission> {
        return GroupPermissionService.getInstance().getByPid(pid);
    }

    @Delete('{gid}')
    public async deleteByGid(
        @Path('gid') gid: number,
    ): Promise<void> {
        GroupPermissionService.getInstance().deleteByGid(gid);
    }

    @Delete('{pid}')
    public async deleteByPid(
        @Path('pid') pid: number,
    ): Promise<void> {
        GroupPermissionService.getInstance().deleteByPid(pid);
    }
}