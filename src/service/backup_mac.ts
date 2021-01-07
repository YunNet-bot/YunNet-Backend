// src/service/announcement.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { BackupMac } from '@/entry';
import { filterObjectUndefined } from '@/utils';

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

    if (backupmac === undefined) {
      throw new Error(`No such Backup_Mac with backupmac_ip: ${backupmacIp}.`);
    }
    return backupmac;
  }

  public async deleteByIp(backupmacIp: string): Promise<boolean> {
    const result: DeleteResult = await this.backupmacRepo.delete({
      ip: backupmacIp,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(ip: string, mac: string | null): Promise<any> {
    const result: InsertResult = await this.backupmacRepo.insert({
      ip, mac,
    });

    return result.raw;
  }

  public async updateByIp(ip: string, mac?: string): Promise<any> {
    const result: UpdateResult = await this.backupmacRepo
      .createQueryBuilder()
      .update(BackupMac)
      .set(filterObjectUndefined({
        mac,
      }))
      .where('ip = :ip', { ip })
      .execute();

    return result.raw;
  }
}
