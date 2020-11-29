// src/entry/group_permission.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'group_permission' })
export class GroupPermission {
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    gid: number;
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    pid: number;

    constructor(gid: number, pid: number) {
        this.gid = gid;
        this.pid = pid;
    }
}