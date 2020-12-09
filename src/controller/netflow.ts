//src/controller/netflow.ts

import { Netflow } from "@/entry";
import { NetflowService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('Netflow')
@Route('netflow')
export class NetflowController extends Controller {
    @Get('{ip}')
    public async getByIp(
        @Path('ip') ip: number,
    ): Promise<Netflow> {
        return NetflowService.getInstance().getByIp(ip);
    }

    @Delete('{ip}')
    public async deleteByIp(
        @Path('ip') ip: number,
    ): Promise<void> {
        NetflowService.getInstance().deleteByIp(ip);
    }
}