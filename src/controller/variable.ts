// src/controller/variable.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Variable } from '@/entry';
import {
  AddResultDTO, DeleteResultDTO, UpdateResultDTO,
  UpdateVariableDTO,
} from '@/entry/dto';
import { VariableService } from '@/service/variable';

@Tags('Variable')
@Route('variable')
export class VariableController extends Controller {
  @Get('{name}')
  public async getByName(
    @Path('name') name: string,
  ): Promise<Variable> {
    return VariableService.getInstace().getByName(name);
  }

  @Delete('{name}')
  public async deleteByName(
    @Path('name') name: string,
  ): Promise<DeleteResultDTO> {
    return VariableService.getInstace().deleteByName(name);
  }

  @Post()
  public async add(
    @Body() form: Variable,
  ): Promise<AddResultDTO> {
    const { name, type, value } = form;
    return VariableService.getInstace().add(name, type, value);
  }

  @Patch('{name}')
  public async updateByName(
    @Path('name') name: string,
      @Body() form: UpdateVariableDTO,
  ): Promise<UpdateResultDTO> {
    const { type, value } = form;
    return VariableService.getInstace().updateByName(name, type, value);
  }
}
