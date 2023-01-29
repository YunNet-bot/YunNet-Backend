// src/service/user_permission.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { UserPermission } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

export class UserPermissionService {
  private static INSTANCE: UserPermissionService;
  private userpermissionRepo: Repository<UserPermission>;

  public static init(): UserPermissionService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new UserPermissionService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): UserPermissionService {
    return this.INSTANCE;
  }

  constructor() {
    this.userpermissionRepo = getRepository(UserPermission);
  }

  public async getByUid(uid: number): Promise<UserPermission> {
    const userperm: UserPermission | null = await this.userpermissionRepo.findOneBy({
      uid,
    });

    if (userperm === null) {
      throw new Error(`No such UserPermission with Uid: ${uid}.`);
    }

    return userperm;
  }

  public async getByPid(pid: number): Promise<UserPermission> {
    const userperm: UserPermission | null = await this.userpermissionRepo.findOneBy({
      pid,
    });

    if (userperm === null) {
      throw new Error(`No such UserPermission with Pid: ${pid}.`);
    }

    return userperm;
  }

  public async deleteByUid(uid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.userpermissionRepo.delete({
      uid,
    });
    return filterDeleteResult(result);
  }

  public async deleteByPid(pid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.userpermissionRepo.delete({
      pid,
    });

    return filterDeleteResult(result);
  }

  public async add(uid: number, pid: number, is_excluded: number | null): Promise<AddResultDTO> {
    const result: InsertResult = await this.userpermissionRepo.insert({
      uid, pid, is_excluded,
    });

    return filterAddResult(result);
  }

  public async updateByUid(
    uid: number, pid?: number, is_excluded?: number,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.userpermissionRepo
      .createQueryBuilder()
      .update(UserPermission)
      .set(filterObjectUndefined({
        pid, is_excluded,
      }))
      .where('uid = :uid', { uid })
      .execute();

    return filterUpdateResult(result);
  }

  public async updateByPid(
    pid: number, uid?: number, is_excluded?: number,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.userpermissionRepo
      .createQueryBuilder()
      .update(UserPermission)
      .set(filterObjectUndefined({
        uid, is_excluded,
      }))
      .where('pid = :pid', { pid })
      .execute();

    return filterUpdateResult(result);
  }
}
