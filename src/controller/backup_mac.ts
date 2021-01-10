// src/controller/backup_mac.ts
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";

import { BackupMac } from '@/entry';
import { BackupMacService } from '@/service';
import { UpdateBackupMacDTO } from "@/entry/dto";

@Tags('Backup Mac')
@Route('backup_mac')
export class BackupMacController extends Controller {
    @Get('{backupmac_ip}')
    public async getByIp(
        @Path('backupmac_ip') backupmacIp: string,
    ): Promise<BackupMac> {
        return BackupMacService.getInstance().getByIp(backupmacIp);
    }

    @Delete('{backupmac_ip}')
    public async deleteByIp(
        @Path('backupmac_ip') backupmacIp: string,
    ): Promise<void> {
        BackupMacService.getInstance().deleteByIp(backupmacIp);
    }

    @Post()
    public async add(
        @Body() form: BackupMac,
    ): Promise<any> {
        const { ip, mac } = form;
        return BackupMacService.getInstance().add(ip, mac);
    }

    @Patch('{backupmac_ip}')
    public async updateByIp(
        @Path('backupmac_ip') ip: string,
        @Body() form: UpdateBackupMacDTO,
    ): Promise<any> {
        const { mac } = form;
        return BackupMacService.getInstance().updateByIp(ip, mac);
    }
}