// src/controller/group_inherit.ts
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

import { GroupInherit } from '@/entry';
import { GroupInheritService } from "@/service";

@Tags('Group_Inherit')
@Route('group_inherit')
export class GroupInheritController extends Controller {
    @Get('{gid}')
    public async getByGid(
        @Path('gid') gid: number,
    ): Promise<GroupInherit> {
        return GroupInheritService.getInstance().getByGid(gid);
    }

    @Delete('{gid}')
    public async deleteByGid(
        @Path('gid') gid: number,
    ): Promise<void> {
        GroupInheritService.getInstance().deleteByGid(gid);
    }
}