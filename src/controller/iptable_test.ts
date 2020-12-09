// src/controller/iptable_test.ts

import { IpTableTest } from "@/entry";
import { IpTableTestService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('Iptable_Test')
@Route('iptable_test')
export class IptableTestController extends Controller {
    @Get('{ip}')
    public async getByIp(
        @Path('ip') ip: string,
    ): Promise<IpTableTest> {
        return IpTableTestService.getInstance().getByIp(ip);
    }

    @Delete('{ip}')
    public async deleteByIp(
        @Path('ip') ip: string,
    ): Promise<void> {
        IpTableTestService.getInstance().deleteByIp(ip);
    }
}