// src/entry/GroupInherit.ts
// import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
// import { Group } from "./Group";

// @Index("fk_gid_groups_gid", ["gid"], {})
// @Index("group_inherit_fk_group_p_idx", ["parentGid"], {})
// @Entity("group_inherit", { schema: "YunNet" })
// export class GroupInherit {
//   @Column("int", { primary: true, name: "gid", unsigned: true })
//   gid: number;

//   @Column("int", { primary: true, name: "parent_gid", unsigned: true })
//   parentGid: number;

//   @ManyToOne(() => Group, (group) => group.groupInherits, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn([{ name: "gid", referencedColumnName: "gid" }])
//   g: Group;

//   @ManyToOne(() => Group, (group) => group.groupInherits2, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn([{ name: "parent_gid", referencedColumnName: "gid" }])
//   parentG: Group;
// }
