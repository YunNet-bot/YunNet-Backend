// src/controller/lock_type.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { LockType } from '@/entry';
import {
  AddResultDTO, DeleteResultDTO, UpdateLockTypeDTO,
  UpdateResultDTO,
} from '@/entry/dto';
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
  ): Promise<DeleteResultDTO> {
    return LockTypeService.getInstance().deleteById(id);
  }

  @Post()
  public async add(
    @Body() form: LockType,
  ): Promise<AddResultDTO> {
    const { lock_type_id, str } = form;
    return LockTypeService.getInstance().add(lock_type_id, str);
  }

  @Patch('{id}')
  public async updateById(
    @Path('id') lock_type_id: number,
      @Body() form: UpdateLockTypeDTO,
  ): Promise<UpdateResultDTO> {
    const { str } = form;
    return LockTypeService.getInstance().updateById(lock_type_id, str);
  }
}
