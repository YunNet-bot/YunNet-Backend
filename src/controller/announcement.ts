// src/controller/announcement.ts
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

import { Announcement } from '@/entry';
import { AnnouncementService } from "@/service";

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
}