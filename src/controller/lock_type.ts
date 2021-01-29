// src/controller/lock_type.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { LockType } from '@/entry';
import { UpdateLockTypeDTO } from '@/entry/dto';
import { LockTypeService } from '@/service';

@Tags('LockType')
@Route('lock_type')
export class LockTypeController extends Controller {
  @Get('{id}')
  public async getById(
    @Path('id') id: number,
  ): Promise<LockType> {
    return LockTypeService.getInstance().getById(id);
  }

  @Delete('{id}')
  public async deleteById(
    @Path('id') id: number,
  ): Promise<void> {
    LockTypeService.getInstance().deleteById(id);
  }

  @Post()
  public async add(
    @Body() form: LockType,
  ): Promise<any> {
    const { lockTypeId, str } = form;
    return LockTypeService.getInstance().add(lockTypeId, str);
  }

  @Patch('{id}')
  public async updateById(
    @Path('id') lockTypeId: number,
      @Body() form: UpdateLockTypeDTO,
  ): Promise<any> {
    const { str } = form;
    return LockTypeService.getInstance().updateById(lockTypeId, str);
  }
}
