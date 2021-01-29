// src/controller/lock.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Lock } from '@/entry';
import { LockDTO, UpdateLockDTO } from '@/entry/dto';
import { LockService } from '@/service';

@Tags('Lock')
@Route('lock')
export class LockController extends Controller {
  @Get('{id}')
  public async getById(
    @Path('id') id: number,
  ): Promise<Lock> {
    return LockService.getInstance().getById(id);
  }

  @Delete('{id}')
  public async deleteById(
    @Path('id') id: number,
  ): Promise<void> {
    LockService.getInstance().deleteById(id);
  }

  @Post()
  public async add(
    @Body() form: LockDTO,
  ): Promise<number> {
    const {
      description, gid, ip, lockByUserId, lockDate, lockTypeId, title, uid, unlockDate,
    } = form;
    return LockService.getInstance().add(
      lockTypeId, ip, uid, gid, lockDate,
      unlockDate, title, description, lockByUserId,
    );
  }

  @Patch('{id}')
  public async updateById(
    @Path('id') lockId: number,
      @Body() form: UpdateLockDTO,
  ): Promise<any> {
    const {
      description, gid, ip, lockByUserId, lockDate, lockTypeId, title, uid, unlockDate,
    } = form;
    return LockService.getInstance().updateById(
      lockId, lockTypeId, ip, uid, gid, lockDate,
      unlockDate, title, description, lockByUserId,
    );
  }
}
