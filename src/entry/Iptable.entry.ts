// src/entry/Iptable.ts
/* eslint-disable import/no-cycle */
import {
  Column, Entity, Index, JoinColumn, ManyToOne,
} from 'typeorm';
import { IpType } from './IpType.entry';
import { Switch } from './Switch.entry';
import { User } from './User.entry';

@Index('mac', ['mac'], { unique: true })
@Index('iptable_fk_ip_type', ['ipTid'], {})
@Index('iptable_fk_switch', ['sid'], {})
@Index('iptable_fk_user', ['uid'], {})
@Entity('iptable', { schema: 'YunNet' })
export class Iptable {
  @Column('varchar', { primary: true, name: 'ip', length: 32 })
  ip!: string;

  @Column('int', {
    name: 'ip_tid',
    nullable: true,
    unsigned: true,
    width: 11,
  })
  ipTid!: number | null;

  @Column('tinyint', {
    name: 'is_unlimited',
    width: 1,
    default: () => "'0'",
  })
  isUnlimited!: boolean;

  @Column('int', {
    name: 'sid',
    nullable: true,
    width: 11,
  })
  sid!: number | null;

  @Column('int', {
    name: 'port',
    width: 11,
  })
  port!: number;

  @Column('int', {
    name: 'port_type',
    width: 11,
  })
  portType!: number;

  @Column('varchar', {
    name: 'mac',
    nullable: true,
    unique: true,
    length: 18,
  })
  mac!: string | null;

  @Column('tinyint', {
    name: 'is_updated',
    width: 1,
    default: () => "'0'",
  })
  isUpdated!: boolean;

  @Column('int', {
    name: 'uid',
    unsigned: true,
    width: 11,
  })
  uid!: number;

  @Column('text', {
    name: 'description',
  })
  description!: string;

  @Column('int', {
    name: 'lid',
    nullable: true,
    unsigned: true,
    width: 10,
  })
  lid!: number | null;

  @ManyToOne(() => IpType, (ipType) => ipType.iptables, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn([{ name: 'ip_tid', referencedColumnName: 'ipTid' },
  ])
  ipT!: IpType;

  @ManyToOne(() => Switch, (sw) => sw.iptables, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn([{ name: 'sid', referencedColumnName: 'id' },
  ])
  s!: Switch;

  @ManyToOne(() => User, (user) => user.iptables, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn([{ name: 'uid', referencedColumnName: 'uid' },
  ])
  u!: User;
}
