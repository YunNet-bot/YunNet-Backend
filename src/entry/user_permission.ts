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
        type: 'tinyint',
        width: 1,
        nullable: true,
        default: 'NULL',
    })
    is_excluded: number;

    constructor(uid: number, pid: number, is_excluded: number) {
        this.uid = uid;
        this.pid = pid;
        this.is_excluded = is_excluded;
    }
}