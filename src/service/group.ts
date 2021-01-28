// src/service/group.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Group } from '@/entry';
import { filterObjectUndefined } from '@/utils';

export class GroupService {
  private static INSTANCE: GroupService;
  private groupRepo: Repository<Group>;

  public static init(): GroupService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new GroupService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): GroupService {
    return this.INSTANCE;
  }

  constructor() {
    this.groupRepo = getRepository(Group);
  }

  public async getByGid(gid: number): Promise<Group> {
    const group: Group | undefined = await this.groupRepo.findOne({
      gid,
    });

    if (group === undefined) {
      throw new Error(`No such Group with Gid: ${gid}.`);
    }
    return group;
  }

  public async deleteByGid(gid: number): Promise<boolean> {
    const result: DeleteResult = await this.groupRepo.delete({
      gid,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(name: string, description: string): Promise<number> {
    const result: InsertResult = await this.groupRepo.insert({
      name, description,
    });

    return result.raw.insertId;
  }

  public async updateByGid(gid: number, name?: string, description?: string): Promise<any> {
    const result: UpdateResult = await this.groupRepo
      .createQueryBuilder()
      .update(Group)
      .set(filterObjectUndefined({
        gid, name, description,
      }))
      .where('gid = :gid', { gid })
      .execute();

    return result.raw;
  }
}
