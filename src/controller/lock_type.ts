// src/controller/lock_type.ts

import { LockType } from "@/entry";
import { UpdateLockTypeDTO } from "@/entry/dto";
import { LockTypeService } from "@/service";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";

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
        const { lock_type_id, str } = form;
        return LockTypeService.getInstance().add(lock_type_id, str);
    }

    @Patch('{id}')
    public async updateById(
        @Path('id') lock_type_id: number,
        @Body() form: UpdateLockTypeDTO,
    ): Promise<any> {
        const { str } = form;
        return LockTypeService.getInstance().updateById(lock_type_id, str);
    }
}