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
    @Path('parent_gid') parentGid: number,
  ): Promise<GroupInherit> {
    return GroupInheritService.getInstance().getByParentGid(parentGid);
  }

  @Delete('{gid}')
  public async deleteByGid(
    @Path('gid') gid: number,
  ): Promise<void> {
    GroupInheritService.getInstance().deleteByGid(gid);
  }

  @Delete('{parent_gid}')
  public async deleteByParentGid(
    @Path('parent_gid') parentGid: number,
  ): Promise<void> {
    GroupInheritService.getInstance().deleteByParentGid(parentGid);
  }

  @Post()
  public async add(
    @Body() form: GroupInherit,
  ): Promise<any> {
    const { gid, parentGid } = form;
    return GroupInheritService.getInstance().add(gid, parentGid);
  }

  @Patch('{gid}')
  public async updateByGid(
    @Path('gid') gid: number,
      @Body() form: UpdateGroupInheritGidDTO,
  ): Promise<any> {
    const { parentGid } = form;
    return GroupInheritService.getInstance().updateByGid(gid, parentGid);
  }

  @Patch('{parent_gid}')
  public async updateByParentGid(
    @Path('parent_gid') parentGid: number,
      @Body() form: UpdateGroupInheritParentGidDTO,
  ): Promise<any> {
    const { gid } = form;
    return GroupInheritService.getInstance().updateByParentGid(gid, parentGid);
  }
}
