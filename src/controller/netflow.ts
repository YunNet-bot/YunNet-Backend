//src/controller/netflow.ts

import { Netflow } from "@/entry";
import { UpdateNetflowDTO } from "@/entry/dto";
import { NetflowService } from "@/service";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";

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

    @Post()
    public async add(
        @Body() form: Netflow,
    ): Promise<any> {
        const { ip, lan_download, lan_upload, wan_download, wan_upload} = form;
        return NetflowService.getInstance().add(ip, wan_upload, wan_download, lan_upload, lan_download);
    }

    @Patch('{ip}')
    public async updateByIp(
        @Path('ip') ip: number,
        @Body() form: UpdateNetflowDTO,
    ): Promise<any> {
        const { lan_download, lan_upload, wan_download, wan_upload} = form;
        return NetflowService.getInstance().updateByIp(ip, wan_upload, wan_download, lan_upload, lan_download);
    }
}