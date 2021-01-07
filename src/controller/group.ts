// src/controller/group.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Group } from '@/entry';
import { GroupDTO, UpdateGroupDTO } from '@/entry/dto';
import { GroupService } from '@/service';

@Tags('Group')
@Route('group')
export class GroupController extends Controller {
  @Get('{gid}')
  public async getByGid(
    @Path('gid') gid: number,
  ): Promise<Group> {
    return GroupService.getInstance().getByGid(gid);
  }

  @Delete('{gid}')
  public async deleteByGid(
    @Path('gid') gid: number,
  ): Promise<void> {
    GroupService.getInstance().deleteByGid(gid);
  }

  @Post()
  public async add(
    @Body() form: GroupDTO,
  ): Promise<any> {
    const { name, description } = form;
    return GroupService.getInstance().add(name, description);
  }

  @Patch('{gid}')
  public async updateByGid(
    @Path('gid') gid: number,
      @Body() form: UpdateGroupDTO,
  ): Promise<any> {
    const { name, description } = form;
    return GroupService.getInstance().updateByGid(gid, name, description);
  }
}
