// src/controller/switch.ts

import { Switch } from "@/entry";
import { SwitchService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('Switch')
@Route('switch')
export class SwitchController extends Controller {
    @Get('{id}')
    public async getById(
        @Path('id') id: number,
    ): Promise<Switch> {
        return SwitchService.getInstance().getById(id);
    }

    @Delete('{id}')
    public async deleteById(
        @Path('id') id: number,
    ): Promise<void> {
        SwitchService.getInstance().deleteById(id);
    }
}