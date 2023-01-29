// src/controller/lock.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Lock } from '@/entry';
import {
  AddResultDTO, LockDTO,
  UpdateLockDTO,
} from '@/entry/dto';
import { LockService } from '@/service';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

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
  ): Promise<DeleteResultDTO> {
    return LockService.getInstance().deleteById(id);
  }

  @Post()
  public async add(
    @Body() form: LockDTO,
  ): Promise<AddResultDTO> {
    const {
      description, gid, ip, lock_by_user_id, lock_date, lock_type_id, title, uid, unlock_date,
    } = form;
    return LockService.getInstance().add(
      lock_type_id, ip, uid, gid, lock_date,
      unlock_date, title, description, lock_by_user_id,
    );
  }

  @Patch('{id}')
  public async updateById(
    @Path('id') lock_id: number,
      @Body() form: UpdateLockDTO,
  ): Promise<UpdateResultDTO> {
    const {
      description, gid, ip, lock_by_user_id, lock_date, lock_type_id, title, uid, unlock_date,
    } = form;
    return LockService.getInstance().updateById(
      lock_id, lock_type_id, ip, uid, gid, lock_date,
      unlock_date, title, description, lock_by_user_id,
    );
  }
}
