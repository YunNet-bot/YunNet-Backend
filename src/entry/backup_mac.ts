// src/entry/backup_mac.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'backup_mac' })
export class BackupMac {
    @PrimaryColumn({
        type: 'varchar',
        length: 32,
        collation: 'utf8_unicode_ci',
    })
    ip: string;
    @Column({
        type: 'varchar',
        length: 18,
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    mac: string;

    constructor(ip: string, mac: string) {
        this.ip = ip;
        this.mac = mac;
    }
}