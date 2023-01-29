// src/service/permission.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Permission } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

export class PermissionService {
  private static INSTANCE: PermissionService;
  private permissionRepo: Repository<Permission>;

  public static init(): PermissionService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new PermissionService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): PermissionService {
    return this.INSTANCE;
  }

  constructor() {
    this.permissionRepo = getRepository(Permission);
  }

  public async getByPid(pid: number): Promise<Permission> {
    const permission: Permission | null = await this.permissionRepo.findOneBy({
      pid,
    });

    if (permission === null) {
      throw new Error(`No such Permission with Pid: ${pid}.`);
    }

    return permission;
  }

  public async deleteByPid(pid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.permissionRepo.delete({
      pid,
    });

    return filterDeleteResult(result);
  }

  public async add(str: string): Promise<AddResultDTO> {
    const result: InsertResult = await this.permissionRepo.insert({
      str,
    });

    return filterAddResult(result);
  }

  public async updateByPid(pid: number, str: string): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.permissionRepo
      .createQueryBuilder()
      .update(Permission)
      .set(filterObjectUndefined({
        str,
      }))
      .where('pid = :pid', { pid })
      .execute();

    return filterUpdateResult(result);
  }
}
