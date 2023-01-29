// src/controller/ip_type.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { IpType } from '@/entry';
import {
  AddResultDTO, UpdateIpTypeDTO,
} from '@/entry/dto';
import { IpTypeService } from '@/service';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

@Tags('Ip Type')
@Route('ip_type')
export class IpTypeController extends Controller {
  @Get('{ip_type_id}')
  public async getById(
    @Path('ip_type_id') iptypeId: number,
  ): Promise<IpType> {
    return IpTypeService.getInstance().getById(iptypeId);
  }

  @Delete('{ip_type_id}')
  public async deleteById(
    @Path('ip_type_id') iptypeId: number,
  ): Promise<DeleteResultDTO> {
    return IpTypeService.getInstance().deleteById(iptypeId);
  }

  @Post()
  public async add(
    @Body() form: IpType,
  ): Promise<AddResultDTO> {
    const { ip_type_id, type } = form;
    return IpTypeService.getInstance().add(ip_type_id, type);
  }

  @Patch('{ip_type_id}')
  public async updateById(
    @Path('ip_type_id') ip_type_id: number,
      @Body() form: UpdateIpTypeDTO,
  ): Promise<UpdateResultDTO> {
    const { type } = form;
    return IpTypeService.getInstance().updateById(ip_type_id, type);
  }
}
