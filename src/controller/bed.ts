// src/controller/bed.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Bed } from '@/entry';
import { BedService } from '@/service';
import {
  AddResultDTO, DeleteResultDTO, UpdateBedDTO,
  UpdateResultDTO,
} from '@/entry/dto';

@Tags('Bed')
@Route('bed')
export class BedController extends Controller {
  @Get('{bed}')
  public async getByBed(
    @Path('bed') bed: string,
  ): Promise<Bed> {
    return BedService.getInstance().getByBed(bed);
  }

  @Delete('{bed}')
  public async deleteByBed(
    @Path('bed') bed: string,
  ): Promise<DeleteResultDTO> {
    return BedService.getInstance().deleteByBed(bed);
  }

  @Post()
  public async add(
    @Body() form: Bed,
  ): Promise<AddResultDTO> {
    const {
      bed, ip, portal, type,
    } = form;
    return BedService.getInstance().add(bed, type, portal, ip);
  }

  @Patch('{bed}')
  public async updateByBed(
    @Path('bed') bed: string,
      @Body() form: UpdateBedDTO,
  ): Promise<UpdateResultDTO> {
    const { ip, portal, type } = form;
    return BedService.getInstance().updateByBed(bed, type, portal, ip);
  }
}