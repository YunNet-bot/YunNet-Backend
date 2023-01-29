import { TenantEntity } from '@yunology/ts-multi-tenancy';
import { Column, Entity } from 'typeorm';

// CREATE TABLE `iptable` (
//   `ip` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
//   `ip_type_id` int(11) UNSIGNED DEFAULT NULL,
//   `is_unlimited` tinyint(1) NOT NULL DEFAULT 0,
//   `switch_id` int(11) DEFAULT NULL,
//   `port` int(11) NOT NULL,
//   `port_type` int(11) NOT NULL,
//   `mac` varchar(18) COLLATE utf8_unicode_ci DEFAULT NULL,
//   `is_updated` tinyint(1) NOT NULL DEFAULT 0,
//   `uid` int(11) UNSIGNED NOT NULL,
//   `gid` int(11) UNSIGNED NOT NULL,
//   `description` text COLLATE utf8_unicode_ci NOT NULL,
//   `lock_id` int(10) UNSIGNED DEFAULT NULL
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

@Entity()
export class Ip extends TenantEntity {
  @Column({ type: 'varchar', length: 32 })
  ip!: string;

  // ip type

  @Column({
    name: 'is_unlimited',
    type: 'boolean',
    default: false,
  })
  isUnlimited!: boolean;

  @Column({ type: 'varchar', length: 18 })
  mac!: string;

  @Column({
    name: 'is_updated',
    type: 'boolean',
    default: false,
  })
  isUpdated!: boolean;
}
