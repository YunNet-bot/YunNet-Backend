// src/entry/netflow.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Netflow {
    @PrimaryColumn('int', { width: 11 })
    ip: number;
    @Column('int', { width: 11 })
    wan_upload: number;
    @Column('int', { width: 11 })
    wan_download: number;
    @Column('int', { width: 11 })
    lan_upload: number;
    @Column('int', { width: 11 })
    lan_download: number;

    constructor(ip: number, wan_upload: number, wan_download: number, lan_upload: number, lan_download: number) {
        this.ip = ip;
        this.wan_upload = wan_upload;
        this.wan_download = wan_download;
        this.lan_upload = lan_upload;
        this.lan_download = lan_download;
    }
}