// src/controller/iptable.ts

import { IpTable } from "@/entry";
import { IpTableService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('IpTable')
@Route('iptable')
export class IpTableController extends Controller {
    @Get('{ip}')
    public async getByIp(
        @Path('ip') ip: string,
    ): Promise<IpTable> {
        return IpTableService.getInstance().getByIp(ip);
    }

    @Delete('{ip}')
    public async deleteByIp(
        @Path('ip') ip: string,
    ): Promise<void> {
        IpTableService.getInstance().deleteByIp(ip);
    }
}