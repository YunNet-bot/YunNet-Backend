// src/entry/lock_type.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'lock_type' })
export class LockType {
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    lock_type_id: number;
    @Column({
        type: 'text',
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    str: string;

    constructor(lock_type_id: number, str: string) {
        this.lock_type_id = lock_type_id;
        this.str = str;
    }
}