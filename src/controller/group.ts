// src/controller/group.ts

import { Group } from '@/entry';
import { GroupService } from '@/service';
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('Group')
@Route('group')
export class GroupController extends Controller {
    @Get('{gid}')
    public async getByGid(
        @Path('gid') gid: number,
    ): Promise<Group> {
        return GroupService.getInstance().getByGid(gid);
    }

    @Delete('{gid}')
    public async deleteByGid(
        @Path('gid') gid: number,
    ): Promise<void> {
        GroupService.getInstance().deleteByGid(gid);
    }
}