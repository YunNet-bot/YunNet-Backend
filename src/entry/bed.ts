// src/entry/bed.ts
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Bed {
    @PrimaryColumn({
        type: 'varchar',
        length: 9,
        collation: 'utf8_unicode_ci',
    })
    bed: string;
    @Column('int', { width: 11 })
    type: number;
    @Column({
        type: 'varchar',
        length: 9,
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    portal: string;
    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8_unicode_ci'
    })
    ip: string;

    constructor(bed: string, type: number, portal: string, ip: string) {
        this.bed = bed;
        this.type = type;
        this.portal = portal;
        this.ip = ip;
    }
}