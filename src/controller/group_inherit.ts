// src/controller/group_inherit.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { GroupInherit } from '@/entry';
import { GroupInheritService } from '@/service';
import {
  AddResultDTO, UpdateGroupInheritGidDTO,
  UpdateGroupInheritParentGidDTO,
} from '@/entry/dto';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

@Tags('Group Inherit')
@Route('group_inherit')
export class GroupInheritController extends Controller {
  @Get('gid/{gid}')
  public async getByGid(
    @Path('gid') gid: number,
  ): Promise<GroupInherit> {
    return GroupInheritService.getInstance().getByGid(gid);
  }

  @Get('parent_gid/{parent_gid}')
  public async getByParentGid(
    @Path('parent_gid') parent_gid: number,
  ): Promise<GroupInherit> {
    return GroupInheritService.getInstance().getByParentGid(parent_gid);
  }

  @Delete('gid/{gid}')
  public async deleteByGid(
    @Path('gid') gid: number,
  ): Promise<DeleteResultDTO> {
    return GroupInheritService.getInstance().deleteByGid(gid);
  }

  @Delete('parent_gid/{parent_gid}')
  public async deleteByParentGid(
    @Path('parent_gid') parent_gid: number,
  ): Promise<DeleteResultDTO> {
    return GroupInheritService.getInstance().deleteByParentGid(parent_gid);
  }

  @Post()
  public async add(
    @Body() form: GroupInherit,
  ): Promise<AddResultDTO> {
    const { gid, parent_gid } = form;
    return GroupInheritService.getInstance().add(gid, parent_gid);
  }

  @Patch('gid/{gid}')
  public async updateByGid(
    @Path('gid') gid: number,
      @Body() form: UpdateGroupInheritGidDTO,
  ): Promise<UpdateResultDTO> {
    const { parent_gid } = form;
    return GroupInheritService.getInstance().updateByGid(gid, parent_gid);
  }

  @Patch('parent_gid/{parent_gid}')
  public async updateByParentGid(
    @Path('parent_gid') parent_gid: number,
      @Body() form: UpdateGroupInheritParentGidDTO,
  ): Promise<UpdateResultDTO> {
    const { gid } = form;
    return GroupInheritService.getInstance().updateByParentGid(gid, parent_gid);
  }
}
