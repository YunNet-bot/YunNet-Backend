// src/controller/announcement.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Announcement } from '@/entry';
import { AnnouncementService } from '@/service';
import { AnnouncementDTO, UpdateAnnouncementDTO } from '@/entry/dto';

@Tags('Announcement')
@Route('announcements')
export class AnnouncementController extends Controller {
  @Get('{announcement_id}')
  public async getById(
    @Path('announcement_id') announcementId: number,
  ): Promise<Announcement> {
    return AnnouncementService.getInstance().getById(announcementId);
  }

  @Delete('{announcement_id}')
  public async deleteById(
    @Path('announcement_id') announcementId: number,
  ): Promise<void> {
    AnnouncementService.getInstance().deleteById(announcementId);
  }

  @Post()
  public async add(
    @Body() form: AnnouncementDTO,
  ): Promise<any> {
    const { title, content, uid } = form;
    return AnnouncementService.getInstance().add(title, content, uid);
  }

  @Patch('{announcement_id}')
  public async updateById(
    @Path('announcement_id') aid: number,
      @Body() form: UpdateAnnouncementDTO,
  ): Promise<any> {
    const { title, content, uid } = form;
    return AnnouncementService.getInstance().updateById(aid, title, content, uid);
  }
}
