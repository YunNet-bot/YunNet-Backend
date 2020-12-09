// src/controller/bed.ts
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

import { Bed } from '@/entry';
import { BedService } from '@/service';

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

}