// src/service/permission.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Permission } from '@/entry';
import { filterObjectUndefined } from '@/utils';

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
    const permission: Permission | undefined = await this.permissionRepo.findOne({
      pid,
    });

    if (permission === undefined) {
      throw new Error(`No such Permission with Pid: ${pid}.`);
    }

    return permission;
  }

  public async deleteByPid(pid: number): Promise<boolean> {
    const result: DeleteResult = await this.permissionRepo.delete({
      pid,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(str: string): Promise<any> {
    const result: InsertResult = await this.permissionRepo.insert({
      str,
    });

    return result.raw;
  }

  public async updateByPid(pid: number, str: string): Promise<any> {
    const result: UpdateResult = await this.permissionRepo
      .createQueryBuilder()
      .update(Permission)
      .set(filterObjectUndefined({
        str,
      }))
      .where('pid = :pid', { pid })
      .execute();

    return result.raw;
  }
}
