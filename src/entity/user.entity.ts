import { Column, Entity } from 'typeorm';
import { TenantEntity } from '@yunology/ts-multi-tenancy';

// CREATE TABLE `user` (
//   `uid` int(10) UNSIGNED NOT NULL,
//   `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
//   `password_hash` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//   `nick` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//   `department` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//   `back_mail` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//   `note` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

@Entity()
export class User extends TenantEntity {
  @Column({ type: 'varchar', length: 20 })
  username!: string;

  @Column({
    name: 'password_hash',
    type: 'text',
    default: null,
  })
  passwordHash!: string | null;

  @Column({ type: 'text', default: null })
  nick!: string | null;

  @Column({ type: 'text', default: null})
  department!: string | null;

  @Column({
    name: 'back_mail',
    type: 'text',
    default: null,
  })
  backMail!: string | null;

  @Column({ type: 'text', default: null })
  note!: string | null;
}
