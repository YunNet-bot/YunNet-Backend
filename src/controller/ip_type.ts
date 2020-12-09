// src/controller/ip_type.ts

import { IpType } from "@/entry";
import { IpTypeService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('Ip_Type')
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
    ): Promise<void> {
        IpTypeService.getInstance().deleteById(iptypeId);
    }
}