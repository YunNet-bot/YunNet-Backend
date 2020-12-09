// src/controller/lock.ts

import { Lock } from "@/entry";
import { LockService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

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
    ): Promise<void> {
        LockService.getInstance().deleteById(id);
    }
}