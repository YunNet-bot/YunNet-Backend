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
        width: 10,
        unsigned: true,
    })
    parent_gid: number;

    constructor(param: GroupManagedBy = {} as GroupManagedBy) {
        let { gid, parent_gid } = param;

        this.gid = gid;
        this.parent_gid = parent_gid;
    }
}
