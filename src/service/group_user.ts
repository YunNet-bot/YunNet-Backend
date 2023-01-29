// src/service/group_user.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { GroupUser } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

export class GroupUserService {
  private static INSTANCE: GroupUserService;
  private groupuserRepo: Repository<GroupUser>;

  public static init(): GroupUserService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new GroupUserService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): GroupUserService {
    return this.INSTANCE;
  }

  constructor() {
    this.groupuserRepo = getRepository(GroupUser);
  }

  public async getByUid(uid: number): Promise<GroupUser> {
    const groupuser: GroupUser | null = await this.groupuserRepo.findOneBy({
      uid,
    });

    if (groupuser === null) {
      throw new Error(`No such GroupUser with Uid: ${uid}.`);
    }

    return groupuser;
  }

  public async getByGid(gid: number): Promise<GroupUser> {
    const groupuser: GroupUser | null = await this.groupuserRepo.findOneBy({
      gid,
    });

    if (groupuser === null) {
      throw new Error(`No such GroupUser with Gid: ${gid}.`);
    }

    return groupuser;
  }

  public async deleteByUid(uid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.groupuserRepo.delete({
      uid,
    });
    return filterDeleteResult(result);
  }

  public async deleteByGid(gid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.groupuserRepo.delete({
      gid,
    });

    return filterDeleteResult(result);
  }

  public async add(uid: number, gid: number): Promise<AddResultDTO> {
    const result: InsertResult = await this.groupuserRepo.insert({
      uid, gid,
    });

    return filterAddResult(result);
  }

  public async updateByUid(uid: number, gid: number): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.groupuserRepo
      .createQueryBuilder()
      .update(GroupUser)
      .set(filterObjectUndefined({
        gid,
      }))
      .where('uid = :uid', { uid })
      .execute();

    return filterUpdateResult(result);
  }

  public async updateByGid(uid: number, gid: number): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.groupuserRepo
      .createQueryBuilder()
      .update(GroupUser)
      .set(filterObjectUndefined({
        uid,
      }))
      .where('gid = :gid', { gid })
      .execute();

    return filterUpdateResult(result);
  }
}
