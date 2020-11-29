// src/entry/switch.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Switch {
    @PrimaryColumn('int', { width: 11 })
    id: number;
    @Column({
        type: 'int',
        width: 11,
        nullable: true,
        default: 'NULL',
    })
    upper_switch: number;
    @Column({
        type: 'int',
        width: 11,
        nullable: true,
        default: 'NULL',
    })
    upper_port: number;
    @Column('int', { width: 11 })
    upper_port_type: number;
    @Column({
        type: 'varchar',
        length: 10,
        nullable: true,
        default: 'NULL',
        collation: 'utf8_unicode_ci',
    })
    location: string;
    @Column({
        type: 'varchar',
        length: 30,
        collation: 'utf8_unicode_ci',
    })
    account: string;
    @Column({
        type: 'varchar',
        length: 30,
        collation: 'utf8_unicode_ci',
    })
    password: string;
    @Column({
        type: 'text',
        collation: 'utf8_unicode_ci',
    })
    vlan: string;
    @Column('int', { width: 11 })
    machine_type: number;
    @Column({
        type: 'longtext',
        nullable: true,
        default: 'NULL',
        collation: 'utf8_unicode_ci',
    })
    port_description: string;
    @Column({
        type: 'longtext',
        collation: 'utf8mb4_bin',
    })
    port_type: string;
    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8_unicode_ci',
    })
    ip: string;

    constructor(id: number, upper_switch: number, upper_port: number, upper_port_type: number, location: string, account: string, password: string, vlan: string, machine_type: number, port_description: string, port_type: string, ip: string) {
        this.id = id;
        this.upper_switch = upper_switch;
        this.upper_port = upper_port;
        this.upper_port_type = upper_port_type;
        this.location = location;
        this.account = account;
        this.password = password;
        this.vlan = vlan;
        this.machine_type = machine_type;
        this.port_description = port_description;
        this.port_type = port_type;
        this.ip = ip;
    }
}