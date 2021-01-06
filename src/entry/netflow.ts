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

    constructor(param: Netflow = {} as Netflow) {
        let { ip, wan_upload, wan_download, lan_upload, lan_download } = param;

        this.ip = ip;
        this.wan_upload = wan_upload;
        this.wan_download = wan_download;
        this.lan_upload = lan_upload;
        this.lan_download = lan_download;
    }
}