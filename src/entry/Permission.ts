// src/entry/Permission.ts
// import {
//   Column,
//   Entity,
//   Index,
//   ManyToMany,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { Group } from "./Group";
// import { UserPermission } from "./UserPermission";

// @Index("permission_key", ["str"], { unique: true })
// @Entity("permission", { schema: "YunNet" })
// export class Permission {
//   @PrimaryGeneratedColumn({ type: "int", name: "pid", unsigned: true })
//   pid: number;

//   @Column("varchar", { name: "str", unique: true, length: 255 })
//   str: string;

//   @ManyToMany(() => Group, (group) => group.permissions)
//   groups: Group[];

//   @OneToMany(() => UserPermission, (userPermission) => userPermission.p)
//   userPermissions: UserPermission[];
// }
