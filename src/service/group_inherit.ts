// src/service/group_inherit.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { GroupInherit } from '@/entry';
import { filterObjectUndefined } from '@/utils';

export class GroupInheritService {
  private static INSTANCE: GroupInheritService;
  private groupinheritRepo: Repository<GroupInherit>;

  public static init(): GroupInheritService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new GroupInheritService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): GroupInheritService {
    return this.INSTANCE;
  }

  constructor() {
    this.groupinheritRepo = getRepository(GroupInherit);
  }

  public async getByGid(gid: number): Promise<GroupInherit> {
    const groupinherit: GroupInherit | undefined = await this.groupinheritRepo.findOne({
      gid,
    });

    if (groupinherit === undefined) {
      throw new Error(`No such GroupInherit with Gid: ${gid}.`);
    }
    return groupinherit;
  }

  public async getByParentGid(parentGid: number): Promise<GroupInherit> {
    const groupinherit: GroupInherit | undefined = await this.groupinheritRepo.findOne({
      parentGid,
    });

    if (groupinherit === undefined) {
      throw new Error(`No such GroupInherit with Gid: ${parentGid}.`);
    }
    return groupinherit;
  }

  public async deleteByGid(gid: number): Promise<boolean> {
    const result: DeleteResult = await this.groupinheritRepo.delete({
      gid,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async deleteByParentGid(parentGid: number): Promise<boolean> {
    const result: DeleteResult = await this.groupinheritRepo.delete({
      parentGid,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(gid: number, parentGid: number): Promise<any> {
    const result: InsertResult = await this.groupinheritRepo.insert({
      gid, parentGid,
    });

    return result.raw;
  }

  public async updateByGid(gid: number, parentGid: number): Promise<any> {
    const result: UpdateResult = await this.groupinheritRepo
      .createQueryBuilder()
      .update(GroupInherit)
      .set(filterObjectUndefined({
        parentGid,
      }))
      .where('gid = :gid', { gid })
      .execute();

    return result.raw;
  }

  public async updateByParentGid(gid: number, parentGid: number): Promise<any> {
    const result: UpdateResult = await this.groupinheritRepo
      .createQueryBuilder()
      .update(GroupInherit)
      .set(filterObjectUndefined({
        gid,
      }))
      .where('parent_gid = :parentGid', { parentGid })
      .execute();

    return result.raw;
  }
}
