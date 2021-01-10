// src/controller/variable.ts

import { Variable } from "@/entry";
import { UpdateVariableDTO } from "@/entry/dto";
import { VariableService } from "@/service/variable";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";

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

    @Post()
    public async add(
        @Body() form: Variable,
    ): Promise<any> {
        const { name, type, value } = form;
        return VariableService.getInstace().add(name, type, value);
    }

    @Patch('{name}')
    public async updateByName(
        @Path('name') name: string,
        @Body() form: UpdateVariableDTO,
    ): Promise<any> {
        const { type, value } = form;
        return VariableService.getInstace().updateByName(name, type, value);
    }
}