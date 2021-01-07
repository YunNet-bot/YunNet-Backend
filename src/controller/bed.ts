// src/controller/bed.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Bed } from '@/entry';
import { BedService } from '@/service';
import { UpdateBedDTO } from '@/entry/dto';

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
  ): Promise<void> {
    BedService.getInstance().deleteByBed(bed);
  }

  @Post()
  public async add(
    @Body() form: Bed,
  ): Promise<any> {
    const {
      bed, ip, portal, type,
    } = form;
    return BedService.getInstance().add(bed, type, portal, ip);
  }

  @Patch('{bed}')
  public async updateByBed(
    @Path('bed') bed: string,
      @Body() form: UpdateBedDTO,
  ): Promise<any> {
    const { ip, portal, type } = form;
    return BedService.getInstance().updateByBed(bed, type, portal, ip);
  }
}
