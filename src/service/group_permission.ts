// src/service/group_permission.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { GroupPermission } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

export class GroupPermissionService {
  private static INSTANCE: GroupPermissionService;
  private grouppermissionRepo: Repository<GroupPermission>;

  public static init(): GroupPermissionService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new GroupPermissionService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): GroupPermissionService {
    return this.INSTANCE;
  }

  constructor() {
    this.grouppermissionRepo = getRepository(GroupPermission);
  }

  public async getByGid(gid: number): Promise<GroupPermission> {
    const grouppermission: GroupPermission | null = await this.grouppermissionRepo.findOneBy({
      gid,
    });

    if (grouppermission === null) {
      throw new Error(`No such GroupPermission with Gid: ${gid}.`);
    }
    return grouppermission;
  }

  public async getByPid(pid: number): Promise<GroupPermission> {
    const grouppermission: GroupPermission | null = await this.grouppermissionRepo.findOneBy({
      pid,
    });

    if (grouppermission === null) {
      throw new Error(`No such GroupPermission with Pid: ${pid}.`);
    }
    return grouppermission;
  }

  public async deleteByGid(gid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.grouppermissionRepo.delete({
      gid,
    });

    return filterDeleteResult(result);
  }

  public async deleteByPid(pid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.grouppermissionRepo.delete({
      pid,
    });

    return filterDeleteResult(result);
  }

  public async add(gid: number, pid: number): Promise<AddResultDTO> {
    const result: InsertResult = await this.grouppermissionRepo.insert({
      gid, pid,
    });

    return filterAddResult(result);
  }

  public async updateByGid(gid: number, pid: number): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.grouppermissionRepo
      .createQueryBuilder()
      .update(GroupPermission)
      .set(filterObjectUndefined({
        pid,
      }))
      .where('gid = :gid', { gid })
      .execute();

    return filterUpdateResult(result);
  }

  public async updateByPid(gid: number, pid: number): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.grouppermissionRepo
      .createQueryBuilder()
      .update(GroupPermission)
      .set(filterObjectUndefined({
        gid,
      }))
      .where('pid = :pid', { pid })
      .execute();

    return filterUpdateResult(result);
  }
}
