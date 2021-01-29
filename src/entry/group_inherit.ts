// src/entry/group_inherit.ts
import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'group_inherit' })
export class GroupInherit {
  @PrimaryColumn('int', {
    width: 10,
    unsigned: true,
  })
  gid: number;
  @PrimaryColumn('int', {
    name: 'parent_gid',
    width: 10,
    unsigned: true,
  })
  parentGid: number;

  constructor(param: GroupInherit = {} as GroupInherit) {
    const {
      gid,
      parentGid,
    } = param;

    this.gid = gid;
    this.parentGid = parentGid;
  }
}
