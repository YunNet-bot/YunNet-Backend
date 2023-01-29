// src/service/group.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Group } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

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
    const group: Group | null = await this.groupRepo.findOneBy({
      gid,
    });

    if (group === null) {
      throw new Error(`No such Group with Gid: ${gid}.`);
    }
    return group;
  }

  public async deleteByGid(gid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.groupRepo.delete({
      gid,
    });

    return filterDeleteResult(result);
  }

  public async add(name: string, description: string): Promise<AddResultDTO> {
    const result: InsertResult = await this.groupRepo.insert({
      name, description,
    });

    return filterAddResult(result);
  }

  public async updateByGid(
    gid: number, name?: string, description?: string,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.groupRepo
      .createQueryBuilder()
      .update(Group)
      .set(filterObjectUndefined({
        gid, name, description,
      }))
      .where('gid = :gid', { gid })
      .execute();

    return filterUpdateResult(result);
  }
}
