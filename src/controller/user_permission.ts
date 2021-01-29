// src/controller/user_permission.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { UserPermission } from '@/entry';
import { UpdateUserPermissionPidDTO, UpdateUserPermissionUidDTO } from '@/entry/dto';
import { UserPermissionService } from '@/service';

@Tags('UserPermission')
@Route('user_permission')
export class UserPermissionController extends Controller {
  @Get('{uid}')
  public async getByUid(
    @Path('uid') uid: number,
  ): Promise<UserPermission> {
    return UserPermissionService.getInstance().getByUid(uid);
  }

  @Get('{pid}')
  public async getByPid(
    @Path('pid') pid: number,
  ): Promise<UserPermission> {
    return UserPermissionService.getInstance().getByPid(pid);
  }

  @Delete('{uid}')
  public async deleteByUid(
    @Path('uid') uid: number,
  ): Promise<void> {
    UserPermissionService.getInstance().deleteByUid(uid);
  }

  @Delete('{pid}')
  public async deleteByPid(
    @Path('pid') pid: number,
  ): Promise<void> {
    UserPermissionService.getInstance().deleteByPid(pid);
  }

  @Post()
  public async add(
    @Body() form: UserPermission,
  ): Promise<any> {
    const { uid, pid, isExcluded } = form;
    return UserPermissionService.getInstance().add(uid, pid, isExcluded);
  }

  @Patch('{uid}')
  public async updateByUid(
    @Path('uid') uid: number,
      @Body() form: UpdateUserPermissionUidDTO,
  ): Promise<any> {
    const { pid, isExcluded } = form;
    return UserPermissionService.getInstance().updateByUid(uid, pid, isExcluded);
  }

  @Patch('{pid}')
  public async updateByPid(
    @Path('pid') pid: number,
      @Body() form: UpdateUserPermissionPidDTO,
  ): Promise<any> {
    const { uid, isExcluded } = form;
    return UserPermissionService.getInstance().updateByPid(pid, uid, isExcluded);
  }
}
