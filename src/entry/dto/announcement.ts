// src/entry/dto/announcement.ts

export interface AnnouncementDTO {
  title: string;
  content: string;
  uid: number;
}

export interface UpdateAnnouncementDTO {
  title?: string;
  content?: string;
  uid?: number;
}
