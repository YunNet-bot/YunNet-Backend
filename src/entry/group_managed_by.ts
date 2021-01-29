// src/entry/group_managed_by.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'group_managed_by' })
export class GroupManagedBy {
  @PrimaryColumn('int', {
    width: 10,
    unsigned: true,
  })
  gid: number;
  @Column('int', {
    name: 'parent_gid',
    width: 10,
    unsigned: true,
  })
  parentGid: number;

  constructor(param: GroupManagedBy = {} as GroupManagedBy) {
    const {
      gid,
      parentGid,
    } = param;

    this.gid = gid;
    this.parentGid = parentGid;
  }
}
