// src/entry/lock.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lock {
    @PrimaryGeneratedColumn('increment', {
        type: 'int',
        unsigned: true,
    })
    lock_id: number;
    @Column({
        type: 'int',
        width: 10,
        unsigned: true,
        default: 0,
    })
    lock_type_id: number;
    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    ip: string;
    @Column({
        type: 'int',
        width: 10,
        unsigned: true,
        nullable: true,
        default: 'NULL',
    })
    uid: number;
    @Column({
        type: 'int',
        width: 10,
        unsigned: true,
        nullable: true,
        default: 'NULL',
    })
    gid: number;
    @Column({
        type: 'datetime',
        nullable: true,
        default: 'NULL',
    })
    lock_date: Date;
    @Column({
        type: 'datetime',
        nullable: true,
        default: 'NULL',
    })
    unlock_date: Date;
    @Column({
        type: 'text',
        collation: 'utf8_unicode_ci',
    })
    title: string;
    @Column({
        type: 'longtext',
        nullable: true,
        default: 'NULL',
        collation: 'utf8_unicode_ci',
    })
    description: string;
    @Column({
        type: 'int',
        unsigned: true,
        nullable: true,
        default: 'NULL',
    })
    lock_by_user_id: number;

    constructor(lock_id: number, lock_type_id: number, ip: string, uid: number, gid: number, lock_date: Date, unlock_date: Date, title: string, description: string, lock_by_user_id: number) {
        this.lock_id = lock_id;
        this.lock_type_id = lock_type_id;
        this.ip = ip;
        this.uid = uid;
        this.gid = gid;
        this.lock_date = lock_date;
        this.unlock_date = unlock_date;
        this.title = title;
        this.description = description;
        this.lock_by_user_id = lock_by_user_id;
    }
}