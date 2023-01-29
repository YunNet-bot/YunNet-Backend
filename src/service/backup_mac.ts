// src/service/announcement.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { BackupMac } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, filterAddResult, filterDeleteResult, filterUpdateResult,
} from '@/entry/dto';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

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
    const backupmac: BackupMac | null = await this.backupmacRepo.findOneBy({
      ip: backupmacIp,
    });

    if (backupmac === null) {
      throw new Error(`No such Backup_Mac with backupmac_ip: ${backupmacIp}.`);
    }
    return backupmac;
  }

  public async deleteByIp(backupmacIp: string): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.backupmacRepo.delete({
      ip: backupmacIp,
    });

    return filterDeleteResult(result);
  }

  public async add(ip: string, mac: string | null): Promise<AddResultDTO> {
    const result: InsertResult = await this.backupmacRepo.insert({
      ip, mac,
    });

    return filterAddResult(result);
  }

  public async updateByIp(ip: string, mac?: string): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.backupmacRepo
      .createQueryBuilder()
      .update(BackupMac)
      .set(filterObjectUndefined({
        mac,
      }))
      .where('ip = :ip', { ip })
      .execute();

    return filterUpdateResult(result);
  }
}
