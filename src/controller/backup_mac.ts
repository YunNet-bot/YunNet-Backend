// src/controller/backup_mac.ts
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

import { BackupMac } from '@/entry';
import { BackupMacService } from '@/service';

@Tags('Backup_Mac')
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
}