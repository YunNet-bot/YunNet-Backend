// src/entry/group_inherit.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'group_inherit' })
export class GroupInherit {
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    gid: number;
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    parent_gid: number;
    
    constructor(param: GroupInherit = {} as GroupInherit) {
        let { gid, parent_gid } = param;

        this.gid = gid;
        this.parent_gid = parent_gid;
    }
}