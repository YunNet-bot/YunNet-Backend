// src/controller/group_user.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { GroupUser } from '@/entry';
import {
  AddResultDTO, DeleteResultDTO, UpdateGroupUserGidDTO,
  UpdateGroupUserUidDTO, UpdateResultDTO,
} from '@/entry/dto';
import { GroupUserService } from '@/service';

@Tags('Group User')
@Route('group_user')
export class GroupUserController extends Controller {
  @Get('uid/{uid}')
  public async getByUid(
    @Path('uid') uid: number,
  ): Promise<GroupUser> {
    return GroupUserService.getInstance().getByUid(uid);
  }

  @Get('gid/{gid}')
  public async getByGid(
    @Path('gid') gid: number,
  ): Promise<GroupUser> {
    return GroupUserService.getInstance().getByGid(gid);
  }

  @Delete('uid/{uid}')
  public async deleteByUid(
    @Path('uid') uid: number,
  ): Promise<DeleteResultDTO> {
    return GroupUserService.getInstance().deleteByUid(uid);
  }

  @Delete('gid/{gid}')
  public async deleteByGid(
    @Path('gid') gid: number,
  ): Promise<DeleteResultDTO> {
    return GroupUserService.getInstance().deleteByGid(gid);
  }

  @Post()
  public async add(
    @Body() form: GroupUser,
  ): Promise<AddResultDTO> {
    const { gid, uid } = form;
    return GroupUserService.getInstance().add(uid, gid);
  }

  @Patch('uid/{uid}')
  public async updateByUid(
    @Path('uid') uid: number,
      @Body() form: UpdateGroupUserUidDTO,
  ): Promise<UpdateResultDTO> {
    const { gid } = form;
    return GroupUserService.getInstance().updateByUid(uid, gid);
  }

  @Patch('gid/{gid}')
  public async updateByGid(
    @Path('gid') gid: number,
      @Body() form: UpdateGroupUserGidDTO,
  ): Promise<UpdateResultDTO> {
    const { uid } = form;
    return GroupUserService.getInstance().updateByGid(uid, gid);
  }
}
