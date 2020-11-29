// src/entry/permission.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('increment', {
        type: 'int',
        unsigned: true,
    })
    pid: number;
    @Column({
        type: 'varchar',
        length: 255,
        collation: 'utf8_unicode_ci',
    })
    str: string;

    constructor(pid: number, str: string) {
        this.pid = pid;
        this.str = str;
    }
}