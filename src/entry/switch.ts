// src/entry/switch.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Switch {
  @PrimaryColumn('int', { width: 11 })
  id: number;
  @Column({
    name: 'upper_switch',
    type: 'int',
    width: 11,
    nullable: true,
    default: 'NULL',
  })
  upperSwitch: number | null;
  @Column({
    name: 'upper_port',
    type: 'int',
    width: 11,
    nullable: true,
    default: 'NULL',
  })
  upperPort: number | null;
  @Column('int', { name: 'upper_port_type', width: 11 })
  upperPortType: number;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    default: 'NULL',
    collation: 'utf8_unicode_ci',
  })
  location: string | null;
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
  @Column('int', { name: 'machine_type', width: 11 })
  machineType: number;
  @Column({
    name: 'port_description',
    type: 'longtext',
    nullable: true,
    default: 'NULL',
    collation: 'utf8_unicode_ci',
  })
  portDescription: string | null;
  @Column({
    name: 'port_type',
    type: 'longtext',
    collation: 'utf8mb4_bin',
  })
  portType: string;
  @Column({
    type: 'varchar',
    length: 32,
    collation: 'utf8_unicode_ci',
  })
  ip: string;

  constructor(param: Switch = {} as Switch) {
    const {
      id,
      upperSwitch = null,
      upperPort = null,
      upperPortType,
      location = null,
      account,
      password,
      vlan,
      machineType,
      portDescription = null,
      portType,
      ip,
    } = param;

    this.id = id;
    this.upperSwitch = upperSwitch;
    this.upperPort = upperPort;
    this.upperPortType = upperPortType;
    this.location = location;
    this.account = account;
    this.password = password;
    this.vlan = vlan;
    this.machineType = machineType;
    this.portDescription = portDescription;
    this.portType = portType;
    this.ip = ip;
  }
}
