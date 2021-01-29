// src/entry/netflow.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Netflow {
  @PrimaryColumn('int', { width: 11 })
  ip: number;
  @Column('int', { name: 'wan_upload', width: 11 })
  wanUpload: number;
  @Column('int', { name: 'wan_download', width: 11 })
  wanDownload: number;
  @Column('int', { name: 'lan_upload', width: 11 })
  lanUpload: number;
  @Column('int', { name: 'lan_download', width: 11 })
  lanDownload: number;

  constructor(param: Netflow = {} as Netflow) {
    const {
      ip,
      wanUpload,
      wanDownload,
      lanUpload,
      lanDownload,
    } = param;

    this.ip = ip;
    this.wanUpload = wanUpload;
    this.wanDownload = wanDownload;
    this.lanUpload = lanUpload;
    this.lanDownload = lanDownload;
  }
}
