// src/entry/UserPermission.ts
// import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
// import { Permission } from "./Permission";
// import { User } from "./User";

// @Index("user_permission_fk_permission_idx", ["pid"], {})
// @Entity("user_permission", { schema: "YunNet" })
// export class UserPermission {
//   @Column("int", { primary: true, name: "uid", unsigned: true })
//   uid: number;

//   @Column("int", { primary: true, name: "pid", unsigned: true })
//   pid: number;

//   @Column("tinyint", { name: "is_excluded", nullable: true, width: 1 })
//   isExcluded: boolean | null;

//   @ManyToOne(() => Permission, (permission) => permission.userPermissions, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn([{ name: "pid", referencedColumnName: "pid" }])
//   p: Permission;

//   @ManyToOne(() => User, (user) => user.userPermissions, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
//   u: User;
// }
