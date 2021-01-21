// src/service/announcement.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Announcement } from '@/entry';
import { filterObjectUndefined } from '@/utils';

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
    const announcement: Announcement | undefined = await this.announcementRepo.findOne({
      announcement_id: announcementId,
    });

    if (announcement === undefined) {
      throw new Error(`No such announcement with announcement_id: ${announcementId}.`);
    }
    return announcement;
  }

  public async deleteById(announcementId: number): Promise<boolean> {
    const result: DeleteResult = await this.announcementRepo.delete({
      announcement_id: announcementId,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(title: string, content: string, uid: number): Promise<number> {
    const result: InsertResult = await this.announcementRepo.insert({
      title, content, uid,
    });

    return result.raw["insertId"];
  }

  public async updateById(
    aid: number, title?: string, content?: string, uid?: number,
  ): Promise<any> {
    const result: UpdateResult = await this.announcementRepo
      .createQueryBuilder()
      .update(Announcement)
      .set(filterObjectUndefined({
        title, content, uid,
      }))
      .where('announcement_id = :aid', { aid })
      .execute();

    return result.raw;
  }
}
