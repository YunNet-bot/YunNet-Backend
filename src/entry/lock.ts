// src/entry/lock.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lock {
  @PrimaryGeneratedColumn('increment', {
    name: 'lock_id',
    type: 'int',
    unsigned: true,
  })
  lockId: number;
  @Column({
    name: 'lock_type_id',
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  lockTypeId: number;
  @Column({
    type: 'varchar',
    length: 32,
    collation: 'utf8_unicode_ci',
    nullable: true,
    default: 'NULL',
  })
  ip: string | null;
  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
    default: 'NULL',
  })
  uid: number | null;
  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
    default: 'NULL',
  })
  gid: number | null;
  @Column({
    name: 'lock_date',
    type: 'datetime',
    nullable: true,
    default: 'NULL',
  })
  lockDate: Date | null;
  @Column({
    name: 'unlock_date',
    type: 'datetime',
    nullable: true,
    default: 'NULL',
  })
  unlockDate: Date | null;
  @Column({
    type: 'text',
    collation: 'utf8_unicode_ci',
  })
  title: string;
  @Column({
    type: 'longtext',
    nullable: true,
    default: 'NULL',
    collation: 'utf8_unicode_ci',
  })
  description: string | null;
  @Column({
    name: 'lock_by_user_id',
    type: 'int',
    unsigned: true,
    nullable: true,
    default: 'NULL',
  })
  lockByUserId: number | null;

  constructor(param: Lock = {} as Lock) {
    const {
      lockId,
      lockTypeId,
      ip = null,
      uid = null,
      gid = null,
      lockDate = null,
      unlockDate = null,
      title,
      description = null,
      lockByUserId = null,
    } = param;

    this.lockId = lockId;
    this.lockTypeId = lockTypeId;
    this.ip = ip;
    this.uid = uid;
    this.gid = gid;
    this.lockDate = lockDate;
    this.unlockDate = unlockDate;
    this.title = title;
    this.description = description;
    this.lockByUserId = lockByUserId;
  }
}
