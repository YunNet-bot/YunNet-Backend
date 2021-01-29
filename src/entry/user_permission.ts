// src/entry/user_permission.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'user_permission' })
export class UserPermission {
  @PrimaryColumn('int', {
    width: 10,
    unsigned: true,
  })
  uid: number;
  @PrimaryColumn('int', {
    width: 10,
    unsigned: true,
  })
  pid: number;
  @Column({
    name: 'is_exluded',
    type: 'tinyint',
    width: 1,
    nullable: true,
    default: 'NULL',
  })
  isExcluded: number | null;

  constructor(param: UserPermission = {} as UserPermission) {
    const {
      uid,
      pid,
      isExcluded = null,
    } = param;

    this.uid = uid;
    this.pid = pid;
    this.isExcluded = isExcluded;
  }
}
