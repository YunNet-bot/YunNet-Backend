// src/entry/lock_type.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'lock_type' })
export class LockType {
  @PrimaryColumn({
    name: 'lock_type_id',
    type: 'int',
    width: 10,
    unsigned: true,
  })
  lockTypeId: number;
  @Column({
    type: 'text',
    collation: 'utf8_unicode_ci',
    nullable: true,
    default: 'NULL',
  })
  str: string | null;

  constructor(param: LockType = {} as LockType) {
    const {
      lockTypeId,
      str = null,
    } = param;
    this.lockTypeId = lockTypeId;
    this.str = str;
  }
}
