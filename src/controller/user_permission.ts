// src/controller/user_permission.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { UserPermission } from '@/entry';
import {
  AddResultDTO, DeleteResultDTO, UpdateResultDTO,
  UpdateUserPermissionPidDTO, UpdateUserPermissionUidDTO,
} from '@/entry/dto';
import { UserPermissionService } from '@/service';

@Tags('UserPermission')
@Route('user_permission')
export class UserPermissionController extends Controller {
  @Get('uid/{uid}')
  public async getByUid(
    @Path('uid') uid: number,
  ): Promise<UserPermission> {
    return UserPermissionService.getInstance().getByUid(uid);
  }

  @Get('pid/{pid}')
  public async getByPid(
    @Path('pid') pid: number,
  ): Promise<UserPermission> {
    return UserPermissionService.getInstance().getByPid(pid);
  }

  @Delete('uid/{uid}')
  public async deleteByUid(
    @Path('uid') uid: number,
  ): Promise<DeleteResultDTO> {
    return UserPermissionService.getInstance().deleteByUid(uid);
  }

  @Delete('pid/{pid}')
  public async deleteByPid(
    @Path('pid') pid: number,
  ): Promise<DeleteResultDTO> {
    return UserPermissionService.getInstance().deleteByPid(pid);
  }

  @Post()
  public async add(
    @Body() form: UserPermission,
  ): Promise<AddResultDTO> {
    const { uid, pid, is_excluded } = form;
    return UserPermissionService.getInstance().add(uid, pid, is_excluded);
  }

  @Patch('uid/{uid}')
  public async updateByUid(
    @Path('uid') uid: number,
      @Body() form: UpdateUserPermissionUidDTO,
  ): Promise<UpdateResultDTO> {
    const { pid, is_excluded } = form;
    return UserPermissionService.getInstance().updateByUid(uid, pid, is_excluded);
  }

  @Patch('pid/{pid}')
  public async updateByPid(
    @Path('pid') pid: number,
      @Body() form: UpdateUserPermissionPidDTO,
  ): Promise<UpdateResultDTO> {
    const { uid, is_excluded } = form;
    return UserPermissionService.getInstance().updateByPid(pid, uid, is_excluded);
  }
}
