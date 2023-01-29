// src/service/group_managed_by.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { GroupManagedBy } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

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
    const groupmanagedby: GroupManagedBy | null = await this.groupmanagedbyRepo.findOneBy({
      gid,
    });

    if (groupmanagedby === null) {
      throw new Error(`No such GroupManageBy with Gid: ${gid}.`);
    }
    return groupmanagedby;
  }

  public async deleteByGid(gid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.groupmanagedbyRepo.delete({
      gid,
    });

    return filterDeleteResult(result);
  }

  public async add(gid: number, parent_gid: number): Promise<AddResultDTO> {
    const result: InsertResult = await this.groupmanagedbyRepo.insert({
      gid, parent_gid,
    });

    return filterAddResult(result);
  }

  public async updateByGid(gid: number, parent_gid: number): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.groupmanagedbyRepo
      .createQueryBuilder()
      .update(GroupManagedBy)
      .set(filterObjectUndefined({
        parent_gid,
      }))
      .where('gid = :gid', { gid })
      .execute();

    return filterUpdateResult(result);
  }
}
