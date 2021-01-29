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
    name: 'ip_type_id',
    type: 'int',
    width: 11,
    unsigned: true,
    nullable: true,
    default: 'NULL',
  })
  ipTypeId: number | null;
  @Column({
    name: 'is_unlimited',
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  isUnlimited: number;
  @Column({
    name: 'switch_id',
    type: 'int',
    width: 11,
    nullable: true,
    default: 'NULL',
  })
  switchId: number | null;
  @Column('int', { width: 11 })
  port: number;
  @Column({
    name: 'port_type',
    type: 'int',
    width: 11,
  })
  portType: number;
  @Column({
    type: 'varchar',
    length: 18,
    collation: 'utf8_unicode_ci',
    nullable: true,
    default: 'NULL',
  })
  mac: string | null;
  @Column({
    name: 'is_updated',
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  isUpdated: number;
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
    name: 'lock_id',
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
    default: 'NULL',
  })
  lockId: number | null;

  constructor(param: IpTable = {} as IpTable) {
    const {
      ip,
      ipTypeId = null,
      isUnlimited,
      switchId = null,
      port,
      portType,
      mac = null,
      isUpdated,
      uid,
      gid,
      description,
      lockId = null,
    } = param;

    this.ip = ip;
    this.ipTypeId = ipTypeId;
    this.isUnlimited = isUnlimited;
    this.switchId = switchId;
    this.port = port;
    this.portType = portType;
    this.mac = mac;
    this.isUpdated = isUpdated;
    this.uid = uid;
    this.gid = gid;
    this.description = description;
    this.lockId = lockId;
  }
}
