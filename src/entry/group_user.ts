// src/entry/group_user.ts
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('group_user')
export class GroupUser {
    @PrimaryColumn('int', {
        width: 10,
        unsigned: false,
    })
    uid: string;
    @PrimaryColumn('int', {
        width: 10,
        unsigned: false,
    })
    gid: string;

    constructor(uid: string, gid: string) {
        this.uid = uid;
        this.gid = gid;
    }
}