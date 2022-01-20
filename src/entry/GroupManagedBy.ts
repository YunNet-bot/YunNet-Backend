// src/entry/GroupManagedBy.ts
// import {
//   Column,
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   OneToOne,
// } from "typeorm";
// import { Group } from "./Group";

// @Index("fk_gid_managed_by_gid", ["gid"], {})
// @Index("fk_gid_managed_by_parent_gid", ["parentGid"], {})
// @Entity("group_managed_by", { schema: "YunNet" })
// export class GroupManagedBy {
//   @Column("int", { primary: true, name: "gid", unsigned: true })
//   gid: number;

//   @Column("int", { name: "parent_gid", unsigned: true })
//   parentGid: number;

//   @OneToOne(() => Group, (group) => group.groupManagedBy, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn([{ name: "gid", referencedColumnName: "gid" }])
//   g: Group;

//   @ManyToOne(() => Group, (group) => group.groupManagedBies, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn([{ name: "parent_gid", referencedColumnName: "gid" }])
//   parentG: Group;
// }
