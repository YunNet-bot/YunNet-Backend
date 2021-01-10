// src/controller/group_managed_by.ts
import { GroupManagedBy } from '@/entry';
import { UpdateGroupManagedByDTO } from '@/entry/dto';
import { GroupManagedByService } from "@/service";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";


@Tags('Group Managed By')
@Route('group_managed_by')
export class GroupManagedByController extends Controller {
    @Get('{gid}')
    public async getByGid(
        @Path('gid') gid: number,
    ): Promise<GroupManagedBy> {
        return GroupManagedByService.getInstance().getByGid(gid);
    }

    @Delete('{gid}')
    public async deleteByGid(
        @Path('gid') gid: number,
    ): Promise<void> {
            GroupManagedByService.getInstance().deleteByGid(gid);
    }

    @Post()
    public async add(
        @Body() form: GroupManagedBy,
    ): Promise<any> {
        const { gid, parent_gid } = form;
        return GroupManagedByService.getInstance().add(gid, parent_gid);
    }

    @Patch('{gid}')
    public async updateByGid(
        @Path('gid') gid: number,
        @Body() form: UpdateGroupManagedByDTO,
    ): Promise<any> {
        const { parent_gid } = form;
        return GroupManagedByService.getInstance().updateByGid(gid, parent_gid);
    }
}