// src/entry/iptable.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'iptable' })
export class IpTable {
    @PrimaryColumn({
        type: 'varchar',
        length: 32,
        collation: 'utf8_unicode_ci',
    })
    ip: string;
    @Column({
        type: 'int',
        width: 11,
        unsigned: true,
        nullable: true,
        default: 'NULL',
    })
    ip_type_id: number;
    @Column({
        type: 'tinyint',
        width: 1,
        default: 0,
    })
    is_unlimited: number;
    @Column({
        type: 'int',
        width: 11,
        nullable: true,
        default: 'NULL',
    })
    switch_id: number;
    @Column('int', { width: 11 })
    port: number;
    @Column('int', { width: 11 })
    port_type: number;
    @Column({
        type: 'varchar',
        length: 18,
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    mac: string;
    @Column({
        type: 'tinyint',
        width: 1,
        default: 0,
    })
    is_updated: number;
    @Column('int', {
        width: 11,
        unsigned: true,
    })
    uid: number;
    @Column('int', {
        width: 11,
        unsigned: true,
    })
    gid: number;
    @Column({
        type: 'text',
        collation: 'utf8_unicode_ci',
    })
    description: string;
    @Column({
        type: 'int',
        width: 10,
        unsigned: true,
        nullable: true,
        default: 'NULL',
    })
    lock_id: number;

    constructor(ip: string, ip_type_id: number, is_unlimited: number, switch_id: number, port: number, port_type: number, mac: string, is_updated: number, uid: number, gid: number, description: string, lock_id: number) {
        this.ip = ip;
        this.ip_type_id = ip_type_id;
        this.is_unlimited = is_unlimited;
        this.switch_id = switch_id;
        this.port = port;
        this.port_type = port_type;
        this.mac = mac;
        this.is_updated = is_updated;
        this.uid = uid;
        this.gid = gid;
        this.description = description;
        this.lock_id = lock_id;
    }
}