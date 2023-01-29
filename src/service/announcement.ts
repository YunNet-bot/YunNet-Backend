// src/service/announcement.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Announcement } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, filterAddResult, filterDeleteResult, filterUpdateResult,
} from '@/entry/dto';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

export class AnnouncementService {
  private static INSTANCE: AnnouncementService;
  private announcementRepo: Repository<Announcement>;

  public static init(): AnnouncementService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new AnnouncementService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): AnnouncementService {
    return this.INSTANCE;
  }

  constructor() {
    this.announcementRepo = getRepository(Announcement);
  }

  public async getById(announcementId: number): Promise<Announcement> {
    const announcement: Announcement | null = await this.announcementRepo.findOneBy({
      announcement_id: announcementId,
    });

    if (announcement === null) {
      throw new Error(`No such announcement with announcement_id: ${announcementId}.`);
    }
    return announcement;
  }

  public async deleteById(announcementId: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.announcementRepo.delete({
      announcement_id: announcementId,
    });

    return filterDeleteResult(result);
  }

  public async add(title: string, content: string, uid: number): Promise<AddResultDTO> {
    const result: InsertResult = await this.announcementRepo.insert({
      title, content, uid,
    });

    return filterAddResult(result);
  }

  public async updateById(
    aid: number, title?: string, content?: string, uid?: number,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.announcementRepo
      .createQueryBuilder()
      .update(Announcement)
      .set(filterObjectUndefined({
        title, content, uid,
      }))
      .where('announcement_id = :aid', { aid })
      .execute();

    return filterUpdateResult(result);
  }
}
