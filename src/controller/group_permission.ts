// src/controller/group_permission.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { GroupPermission } from '@/entry';
import {
  AddResultDTO, UpdateGroupPermissionGidDTO,
  UpdateGroupPermissionPidDTO,
} from '@/entry/dto';
import { GroupPermissionService } from '@/service';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

@Tags('Group Permission')
@Route('group_permission')
export class GroupPermissionController extends Controller {
  @Get('gid/{gid}')
  public async getByGid(
    @Path('gid') gid: number,
  ): Promise<GroupPermission> {
    return GroupPermissionService.getInstance().getByGid(gid);
  }

  @Get('pid/{pid}')
  public async getByPid(
    @Path('pid') pid: number,
  ): Promise<GroupPermission> {
    return GroupPermissionService.getInstance().getByPid(pid);
  }

  @Delete('gid/{gid}')
  public async deleteByGid(
    @Path('gid') gid: number,
  ): Promise<DeleteResultDTO> {
    return GroupPermissionService.getInstance().deleteByGid(gid);
  }

  @Delete('pid/{pid}')
  public async deleteByPid(
    @Path('pid') pid: number,
  ): Promise<DeleteResultDTO> {
    return GroupPermissionService.getInstance().deleteByPid(pid);
  }

  @Post()
  public async add(
    @Body() form: GroupPermission,
  ): Promise<AddResultDTO> {
    const { gid, pid } = form;
    return GroupPermissionService.getInstance().add(gid, pid);
  }

  @Patch('gid/{gid}')
  public async updateByGid(
    @Path('gid') gid: number,
      @Body() form: UpdateGroupPermissionGidDTO,
  ): Promise<UpdateResultDTO> {
    const { pid } = form;
    return GroupPermissionService.getInstance().updateByGid(gid, pid);
  }

  @Patch('pid/{pid}')
  public async updateByPid(
    @Path('pid') pid: number,
      @Body() form: UpdateGroupPermissionPidDTO,
  ): Promise<UpdateResultDTO> {
    const { gid } = form;
    return GroupPermissionService.getInstance().updateByPid(gid, pid);
  }
}
