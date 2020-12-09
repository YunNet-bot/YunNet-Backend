// src/controller/group_managed_by.ts
import { GroupManagedBy } from '@/entry';
import { GroupManagedByService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";


@Tags('Group_Managed_By')
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
}