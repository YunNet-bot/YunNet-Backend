import { TenantEntity } from '@yunology/ts-multi-tenancy';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Ip } from './ip.entity';

// CREATE TABLE `bed` (
//   `bed` varchar(9) COLLATE utf8_unicode_ci NOT NULL,
//   `type` int(11) NOT NULL,
//   `portal` varchar(9) COLLATE utf8_unicode_ci DEFAULT NULL,
//   `ip` varchar(32) COLLATE utf8_unicode_ci NOT NULL
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

@Entity()
export class Bed extends TenantEntity {
  @Column({
    type: 'varchar',
    length: 9,
    nullable: false,
  })
  bed!: string;

  @Column({
    type: 'int',
    width: 11,
    nullable: false,
  })
  type!: number;

  @Column({
    type: 'varchar',
    length: 9,
    default: null,
  })
  portal!: string;

  @OneToOne(() => Ip, (ip) => ip.id)
  @JoinColumn({ name: 'ip' })
  ip!: Ip;
}
