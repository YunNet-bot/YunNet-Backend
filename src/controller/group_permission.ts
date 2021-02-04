// src/controller/group_permission.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { GroupPermission } from '@/entry';
import { UpdateGroupPermissionGidDTO, UpdateGroupPermissionPidDTO } from '@/entry/dto';
import { GroupPermissionService } from '@/service';

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
  ): Promise<void> {
    GroupPermissionService.getInstance().deleteByGid(gid);
  }

  @Delete('pid/{pid}')
  public async deleteByPid(
    @Path('pid') pid: number,
  ): Promise<void> {
    GroupPermissionService.getInstance().deleteByPid(pid);
  }

  @Post()
  public async add(
    @Body() form: GroupPermission,
  ): Promise<any> {
    const { gid, pid } = form;
    return GroupPermissionService.getInstance().add(gid, pid);
  }

  @Patch('gid/{gid}')
  public async updateByGid(
    @Path('gid') gid: number,
      @Body() form: UpdateGroupPermissionGidDTO,
  ): Promise<any> {
    const { pid } = form;
    return GroupPermissionService.getInstance().updateByGid(gid, pid);
  }

  @Patch('pid/{pid}')
  public async updateByPid(
    @Path('pid') pid: number,
      @Body() form: UpdateGroupPermissionPidDTO,
  ): Promise<any> {
    const { gid } = form;
    return GroupPermissionService.getInstance().updateByPid(gid, pid);
  }
}
