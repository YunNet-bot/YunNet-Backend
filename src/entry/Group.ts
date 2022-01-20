// src/entry/Group.ts
// import {
//   Column,
//   Entity,
//   JoinTable,
//   ManyToMany,
//   OneToMany,
//   OneToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { GroupManagedBy } from "./GroupManagedBy";
// import { Permission } from "./Permission";
// import { User } from "./User";
// import { GroupInherit } from "./GroupInherit";

// @Entity("group", { schema: "YunNet" })
// export class Group {
//   @PrimaryGeneratedColumn({ type: "int", name: "gid", unsigned: true })
//   gid: number;

//   @Column("text", { name: "name", nullable: true })
//   name: string | null;

//   @Column("text", { name: "description", nullable: true })
//   description: string | null;

//   @OneToOne(() => GroupManagedBy, (groupManagedBy) => groupManagedBy.g)
//   groupManagedBy: GroupManagedBy;

//   @OneToMany(() => GroupManagedBy, (groupManagedBy) => groupManagedBy.parentG)
//   groupManagedBies: GroupManagedBy[];

//   @ManyToMany(() => Permission, (permission) => permission.groups)
//   @JoinTable({
//     name: "group_permission",
//     joinColumns: [{ name: "gid", referencedColumnName: "gid" }],
//     inverseJoinColumns: [{ name: "pid", referencedColumnName: "pid" }],
//     schema: "YunNet",
//   })
//   permissions: Permission[];

//   @ManyToMany(() => User, (user) => user.groups)
//   @JoinTable({
//     name: "group_user",
//     joinColumns: [{ name: "gid", referencedColumnName: "gid" }],
//     inverseJoinColumns: [{ name: "uid", referencedColumnName: "uid" }],
//     schema: "YunNet",
//   })
//   users: User[];

//   @OneToMany(() => GroupInherit, (groupInherit) => groupInherit.g)
//   groupInherits: GroupInherit[];

//   @OneToMany(() => GroupInherit, (groupInherit) => groupInherit.parentG)
//   groupInherits2: GroupInherit[];
// }
