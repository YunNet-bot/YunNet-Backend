// src/entry/Switch.ts
/* eslint-disable import/no-cycle */
import {
  Column, Entity, Index,
  JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { Iptable } from './Iptable.entry';

@Index('switch_fk_self_upper_switch_idx', ['upperSwitch'], {})
@Entity('switch', { schema: 'YunNet' })
export class Switch {
  @Column('int', {
    primary: true,
    name: 'id',
    width: 11,
  })
  id!: number;

  @Column('int', {
    name: 'upper_switch',
    nullable: true,
    width: 11,
  })
  upperSwitch!: number | null;

  @Column('int', {
    name: 'upper_port',
    nullable: true,
    width: 11,
  })
  upperPort!: number | null;

  @Column('int', {
    name: 'upper_port_type',
    width: 11,
  })
  upperPortType!: number;

  @Column('varchar', {
    name: 'location',
    nullable: true,
    length: 10,
  })
  location!: string | null;

  @Column('varchar', {
    name: 'account',
    length: 30,
  })
  account!: string;

  @Column('varchar', {
    name: 'password',
    length: 30,
  })
  password!: string;

  @Column('text', {
    name: 'vlan',
  })
  vlan!: string;

  @Column('int', {
    name: 'machine_type',
    width: 11,
  })
  machineType!: number;

  @Column('longtext', {
    name: 'port_description',
    nullable: true,
  })
  portDescription!: string | null;

  @Column('longtext', {
    name: 'port_type',
  })
  portType!: string;

  @Column('varchar', {
    name: 'ip',
    length: 32,
  })
  ip!: string;

  @OneToMany(() => Iptable, (iptable) => iptable.s)
  iptables!: Iptable[];

  @ManyToOne(() => Switch, (sw) => sw.switches, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn([{ name: 'upper_switch', referencedColumnName: 'id' },
  ])
  upperSwitch2!: Switch;

  @OneToMany(() => Switch, (sw) => sw.upperSwitch2)
  switches!: Switch[];
}
