// src/entry/Announcement.ts
// import {
//   Column,
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { User } from "./User";

// @Index("announcement_fk_user_idx", ["uid"], {})
// @Entity("announcement", { schema: "YunNet" })
// export class Announcement {
//   @PrimaryGeneratedColumn({
//     type: "int",
//     name: "announcement_id",
//     unsigned: true,
//   })
//   announcementId: number;

//   @Column("text", { name: "title", nullable: true })
//   title: string | null;

//   @Column("longtext", { name: "content", nullable: true })
//   content: string | null;

//   @Column("int", { name: "uid", unsigned: true })
//   uid: number;

//   @ManyToOne(() => User, (user) => user.announcements, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
//   u: User;
// }
