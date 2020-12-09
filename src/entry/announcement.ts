// src/entry/announcement.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Announcement {
    @PrimaryGeneratedColumn('increment', {
        type: 'int',
        unsigned: true,
    })
    announcement_id: number;
    @Column({
        type: 'text',
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    title: string;
    @Column({
        type: 'longtext',
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    content: string;
    @Column('int', {
        width: 10,
        unsigned: true,
    })
    uid: number;

    constructor(announcement_id: number, title: string, content: string, uid: number) {
        this.announcement_id = announcement_id;
        this.title = title;
        this.content = content;
        this.uid = uid;
    }
}