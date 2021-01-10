// src/controller/iptable.ts

import { IpTable } from "@/entry";
import { UpdateIptableDTO } from "@/entry/dto";
import { IpTableService } from "@/service";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";

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

    @Post()
    public async add(
        @Body() form: IpTable,
    ): Promise<any> {
        const { description, gid, ip, ip_type_id, is_unlimited, is_updated, lock_id, mac, port, port_type, switch_id, uid } = form;
        return IpTableService.getInstance().add(ip, ip_type_id, is_unlimited, switch_id, port, port_type, mac, is_updated, uid, gid, description, lock_id);
    }

    @Patch('{ip}')
    public async updateByIp(
        @Path('ip') ip: string,
        @Body() form: UpdateIptableDTO,
    ): Promise<any> {
        const { description, gid, ip_type_id, is_unlimited, is_updated, lock_id, mac, port, port_type, switch_id, uid } = form;
        return IpTableService.getInstance().updateByIp(ip, ip_type_id, is_unlimited, switch_id, port, port_type, mac, is_updated, uid, gid, description, lock_id);
    }
}