// src/controller/group_managed_by.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { GroupManagedBy } from '@/entry';
import {
  AddResultDTO, UpdateGroupManagedByDTO,
} from '@/entry/dto';
import { GroupManagedByService } from '@/service';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

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
  ): Promise<DeleteResultDTO> {
    return GroupManagedByService.getInstance().deleteByGid(gid);
  }

  @Post()
  public async add(
    @Body() form: GroupManagedBy,
  ): Promise<AddResultDTO> {
    const { gid, parent_gid } = form;
    return GroupManagedByService.getInstance().add(gid, parent_gid);
  }

  @Patch('{gid}')
  public async updateByGid(
    @Path('gid') gid: number,
      @Body() form: UpdateGroupManagedByDTO,
  ): Promise<UpdateResultDTO> {
    const { parent_gid } = form;
    return GroupManagedByService.getInstance().updateByGid(gid, parent_gid);
  }
}
