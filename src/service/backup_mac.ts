// src/service/announcement.ts
import { DeleteResult, getRepository, Repository } from 'typeorm';

import { BackupMac } from '@/entry';

export class BackupMacService {
    private static INSTANCE: BackupMacService;
    private backupmacRepo: Repository<BackupMac>;

    public static init(): BackupMacService {
        if (this.INSTANCE === undefined) {
            this.INSTANCE = new BackupMacService();
        }
        return this.INSTANCE;
    }

    public static getInstance(): BackupMacService {
        return this.INSTANCE;
    }
    
    constructor() {
        this.backupmacRepo = getRepository(BackupMac);
    }

    public async getByIp(backupmacIp: string): Promise<BackupMac> {
        const backupmac: BackupMac | undefined = await this.backupmacRepo.findOne({
            ip: backupmacIp,
        });

        if(backupmac === undefined) {
            throw new Error(`No such Backup_Mac with backupmac_ip: ${backupmacIp}.`);
        }
        return backupmac;
    }

    public async deleteByIp(backupmacIp: string): Promise<boolean> {
        const result: DeleteResult = await this.backupmacRepo.delete({
            ip: backupmacIp,
        })

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}