// src/entry/ip_type.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'ip_type' })
export class IpType {
    @PrimaryColumn('int', {
        width: 11,
        unsigned: true,
    })
    ip_type_id: number;
    @Column({
        type: 'text',
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    type: string;

    constructor(ip_type_id: number, type: string) {
        this.ip_type_id = ip_type_id;
        this.type = type;
    }
}
