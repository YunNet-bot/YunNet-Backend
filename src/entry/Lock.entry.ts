// src/entry/Lock.ts
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LockType } from "./LockType.entry";
import { User } from "./User.entry";

@Index("lock_fk_ip_idx", ["ip"], {})
@Index("lock_fk_lock_type_idx", ["lockTid"], {})
@Index("lock_fk_user_idx", ["lockByUid"], {})
@Entity("lock", { schema: "YunNet" })
export class Lock {
  @PrimaryGeneratedColumn({ type: "int", name: "lid", unsigned: true })
  lid!: number;

  @Column("int", { name: "lock_tid", unsigned: true, width: 10, default: () => "'0'" })
  lockTid!: number;

  @Column("varchar", { name: "ip", nullable: true, length: 32 })
  ip!: string | null;

  @Column("int", { name: "uid", nullable: true, unsigned: true, width: 10 })
  uid!: number | null;

  @Column("datetime", { name: "lock_date", nullable: true })
  lockDate!: Date | null;

  @Column("datetime", { name: "unlock_date", nullable: true })
  unlockDate!: Date | null;

  @Column("text", { name: "title" })
  title!: string;

  @Column("longtext", { name: "description", nullable: true })
  description!: string | null;

  @Column("int", { name: "lock_by_uid", nullable: true, unsigned: true, width: 10 })
  lockByUid!: number | null;

  @ManyToOne(() => LockType, (lockType) => lockType.locks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "lock_tid", referencedColumnName: "lockTypeId" }])
  lockT!: LockType;

  @ManyToOne(() => User, (user) => user.locks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "lock_by_uid", referencedColumnName: "uid" }])
  lockByU!: User;
}
