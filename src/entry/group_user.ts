// src/entry/group_user.ts
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('group_user')
export class GroupUser {
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    uid: string;
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    gid: string;

    constructor(uid: string, gid: string) {
        this.uid = uid;
        this.gid = gid;
    }
}