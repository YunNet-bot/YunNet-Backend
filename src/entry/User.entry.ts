// src/entry/User.ts
/* eslint-disable import/no-cycle */
import {
  Column, Entity, Index, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Iptable } from './Iptable.entry';
import { Lock } from './Lock.entry';

@Index('uid_UNIQUE', ['uid'], { unique: true })
@Index('account_UNIQUE', ['account'], { unique: true })
@Entity('user', { schema: 'YunNet' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'uid',
    unsigned: true,
  })
  uid!: number;

  @Column('varchar', {
    name: 'account',
    unique: true,
    length: 20,
  })
  account!: string;

  @Column('mediumtext', {
    name: 'password',
    nullable: true,
  })
  password!: string | null;

  @Column('mediumtext', {
    name: 'name',
    nullable: true,
  })
  name!: string | null;

  @Column('mediumtext', {
    name: 'department',
    nullable: true,
  })
  department!: string | null;

  @Column('mediumtext', {
    name: 'mail',
    nullable: true,
  })
  mail!: string | null;

  @Column('tinyint', {
    name: 'isAdmin',
    width: 1,
    default: () => "'0'",
  })
  isAdmin!: boolean;

  @OneToMany(() => Iptable, (iptable) => iptable.u)
  iptables!: Iptable[];

  @OneToMany(() => Lock, (lock) => lock.lockByU)
  locks!: Lock[];
}
