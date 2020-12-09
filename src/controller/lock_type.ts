// src/controller/lock_type.ts

import { LockType } from "@/entry";
import { LockTypeService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

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
}