// src/controller/permission.ts

import { Permission } from "@/entry";
import { PermissionService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('Permission')
@Route('permission')
export class PermissionController extends Controller {
    @Get('{pid}')
    public async getByPid(
        @Path('pid') pid: number,
    ): Promise<Permission> {
        return PermissionService.getInstance().getByPid(pid);
    }

    @Delete('{pid}')
    public async deleteByPid(
        @Path('pid') pid: number,
    ): Promise<void> {
        PermissionService.getInstance().deleteByPid(pid);
    }
}