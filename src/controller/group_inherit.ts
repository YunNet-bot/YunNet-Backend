// src/controller/group_inherit.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { GroupInherit } from '@/entry';
import { GroupInheritService } from '@/service';
import { UpdateGroupInheritGidDTO, UpdateGroupInheritParentGidDTO } from '@/entry/dto';

@Tags('Group Inherit')
@Route('group_inherit')
export class GroupInheritController extends Controller {
  @Get('{gid}')
  public async getByGid(
    @Path('gid') gid: number,
  ): Promise<GroupInherit> {
    return GroupInheritService.getInstance().getByGid(gid);
  }

  @Get('{parent_gid}')
  public async getByParentGid(
    @Path('parent_gid') parent_gid: number,
  ): Promise<GroupInherit> {
    return GroupInheritService.getInstance().getByParentGid(parent_gid);
  }

  @Delete('{gid}')
  public async deleteByGid(
    @Path('gid') gid: number,
  ): Promise<void> {
    GroupInheritService.getInstance().deleteByGid(gid);
  }

  @Delete('{parent_gid}')
  public async deleteByParentGid(
    @Path('parent_gid') parent_gid: number,
  ): Promise<void> {
    GroupInheritService.getInstance().deleteByParentGid(parent_gid);
  }

  @Post()
  public async add(
    @Body() form: GroupInherit,
  ): Promise<any> {
    const { gid, parent_gid } = form;
    return GroupInheritService.getInstance().add(gid, parent_gid);
  }

  @Patch('{gid}')
  public async updateByGid(
    @Path('gid') gid: number,
      @Body() form: UpdateGroupInheritGidDTO,
  ): Promise<any> {
    const { parent_gid } = form;
    return GroupInheritService.getInstance().updateByGid(gid, parent_gid);
  }

  @Patch('{parent_gid}')
  public async updateByParentGid(
    @Path('parent_gid') parent_gid: number,
      @Body() form: UpdateGroupInheritParentGidDTO,
  ): Promise<any> {
    const { gid } = form;
    return GroupInheritService.getInstance().updateByParentGid(gid, parent_gid);
  }
}
