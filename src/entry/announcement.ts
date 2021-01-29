// src/entry/announcement.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn('increment', {
    name: 'announcement_id',
    type: 'int',
    unsigned: true,
  })
  announcementId: number;
  @Column({
    type: 'text',
    collation: 'utf8_unicode_ci',
    nullable: true,
    default: 'NULL',
  })
  title: string | null;
  @Column({
    type: 'longtext',
    collation: 'utf8_unicode_ci',
    nullable: true,
    default: 'NULL',
  })
  content: string | null;
  @Column('int', {
    width: 10,
    unsigned: true,
  })
  uid: number;

  constructor(param: Announcement = {} as Announcement) {
    const {
      announcementId,
      title = null,
      content = null,
      uid,
    } = param;

    this.announcementId = announcementId;
    this.title = title;
    this.content = content;
    this.uid = uid;
  }
}
