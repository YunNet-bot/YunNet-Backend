// src/service/group_inherit.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { GroupInherit } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

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
    const groupinherit: GroupInherit | null = await this.groupinheritRepo.findOneBy({
      gid,
    });

    if (groupinherit === null) {
      throw new Error(`No such GroupInherit with Gid: ${gid}.`);
    }
    return groupinherit;
  }

  public async getByParentGid(parent_gid: number): Promise<GroupInherit> {
    const groupinherit: GroupInherit | null = await this.groupinheritRepo.findOneBy({
      parent_gid,
    });

    if (groupinherit === null) {
      throw new Error(`No such GroupInherit with Gid: ${parent_gid}.`);
    }
    return groupinherit;
  }

  public async deleteByGid(gid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.groupinheritRepo.delete({
      gid,
    });

    return filterDeleteResult(result);
  }

  public async deleteByParentGid(parent_gid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.groupinheritRepo.delete({
      parent_gid,
    });

    return filterDeleteResult(result);
  }

  public async add(gid: number, parent_gid: number): Promise<AddResultDTO> {
    const result: InsertResult = await this.groupinheritRepo.insert({
      gid, parent_gid,
    });

    return filterAddResult(result);
  }

  public async updateByGid(gid: number, parent_gid: number): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.groupinheritRepo
      .createQueryBuilder()
      .update(GroupInherit)
      .set(filterObjectUndefined({
        parent_gid,
      }))
      .where('gid = :gid', { gid })
      .execute();

    return filterUpdateResult(result);
  }

  public async updateByParentGid(gid: number, parent_gid: number): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.groupinheritRepo
      .createQueryBuilder()
      .update(GroupInherit)
      .set(filterObjectUndefined({
        gid,
      }))
      .where('parent_gid = :parent_gid', { parent_gid })
      .execute();

    return filterUpdateResult(result);
  }
}
