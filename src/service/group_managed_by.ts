// src/service/group_managed_by.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { GroupManagedBy } from '@/entry';
import { filterObjectUndefined } from '@/utils';

export class GroupManagedByService {
  private static INSTANCE: GroupManagedByService;
  private groupmanagedbyRepo: Repository<GroupManagedBy>;

  public static init(): GroupManagedByService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new GroupManagedByService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): GroupManagedByService {
    return this.INSTANCE;
  }

  constructor() {
    this.groupmanagedbyRepo = getRepository(GroupManagedBy);
  }

  public async getByGid(gid: number): Promise<GroupManagedBy> {
    const groupmanagedby: GroupManagedBy | undefined = await this.groupmanagedbyRepo.findOne({
      gid,
    });

    if (groupmanagedby === undefined) {
      throw new Error(`No such GroupManageBy with Gid: ${gid}.`);
    }
    return groupmanagedby;
  }

  public async deleteByGid(gid: number): Promise<boolean> {
    const result: DeleteResult = await this.groupmanagedbyRepo.delete({
      gid,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(gid: number, parentGid: number): Promise<any> {
    const result: InsertResult = await this.groupmanagedbyRepo.insert({
      gid, parentGid,
    });

    return result.raw;
  }

  public async updateByGid(gid: number, parentGid: number): Promise<any> {
    const result: UpdateResult = await this.groupmanagedbyRepo
      .createQueryBuilder()
      .update(GroupManagedBy)
      .set(filterObjectUndefined({
        parentGid,
      }))
      .where('gid = :gid', { gid })
      .execute();

    return result.raw;
  }
}
