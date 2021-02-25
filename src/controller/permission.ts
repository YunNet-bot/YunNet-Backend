// src/controller/permission.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Permission } from '@/entry';
import {
  AddResultDTO, DeleteResultDTO, PermissionDTO,
  UpdatePermissionDTO, UpdateResultDTO,
} from '@/entry/dto';
import { PermissionService } from '@/service';

@Tags('Permission')
@Route('permission')
export class PermissionController extends Controller {
  @Get('{pid}')
  public async getByPid(
    @Path('pid') pid: number,
  ): Promise<Permission> {
    return PermissionService.getInstance().getByPid(pid);
  }

  @Delete('{pid}')
  public async deleteByPid(
    @Path('pid') pid: number,
  ): Promise<DeleteResultDTO> {
    return PermissionService.getInstance().deleteByPid(pid);
  }

  @Post()
  public async add(
    @Body() form: PermissionDTO,
  ): Promise<AddResultDTO> {
    const { str } = form;
    return PermissionService.getInstance().add(str);
  }

  @Patch('{pid}')
  public async updateByPid(
    @Path('pid') pid: number,
      @Body() form: UpdatePermissionDTO,
  ): Promise<UpdateResultDTO> {
    const { str } = form;
    return PermissionService.getInstance().updateByPid(pid, str);
  }
}
