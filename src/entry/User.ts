// src/entry/User.ts
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Iptable } from "./Iptable";
import { Lock } from "./Lock";
import { Announcement } from "./Announcement";
import { Token } from "./Token";
import { UserPermission } from "./UserPermission";
import { Group } from "./Group";

@Index("uid_UNIQUE", ["uid"], { unique: true })
@Index("account_UNIQUE", ["account"], { unique: true })
@Entity("user", { schema: "YunNet" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "uid", unsigned: true })
  uid?: number;

  @Column("varchar", { name: "account", unique: true, length: 20 })
  account?: string;

  @Column("mediumtext", { name: "password", nullable: true })
  password?: string | null;

  @Column("mediumtext", { name: "name", nullable: true })
  name?: string | null;

  @Column("mediumtext", { name: "department", nullable: true })
  department?: string | null;

  @Column("mediumtext", { name: "mail", nullable: true })
  mail?: string | null;

  @Column("tinyint", { name: "isAdmin", width: 1, default: () => "'0'" })
  isAdmin?: boolean;

  @OneToMany(() => Iptable, (iptable) => iptable.u)
  iptables?: Iptable[];

  @OneToMany(() => Lock, (lock) => lock.lockByU)
  locks?: Lock[];

  @OneToMany(() => Announcement, (announcement) => announcement.u)
  announcements?: Announcement[];

  @OneToOne(() => Token, (token) => token.u)
  token?: Token;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.u)
  userPermissions?: UserPermission[];

  @ManyToMany(() => Group, (group) => group.users)
  groups?: Group[];
}
