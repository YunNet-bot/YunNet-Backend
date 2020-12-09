// src/controller/variable.ts

import { Variable } from "@/entry";
import { VariableService } from "@/service/variable";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

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
    ): Promise<void> {
        VariableService.getInstace().deleteByName(name);
    }
}