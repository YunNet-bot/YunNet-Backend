// src/entry/group_user.ts
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('group_user')
export class GroupUser {
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    uid: number;
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    gid: number;

    constructor(uid: number, gid: number) {
        this.uid = uid;
        this.gid = gid;
    }
}