// src/entry/user.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    unsigned: true,
  })
  uid: number;
  @Column({
    type: 'varchar',
    length: 20,
    collation: 'utf8mb4_unicode_ci',
  })
  username: string;
  @Column({
    type: 'mediumtext',
    nullable: true,
    default: 'NULL',
    collation: 'utf8mb4_unicode_ci',
  })
  passwordHash: string | null;
  @Column({
    type: 'mediumtext',
    nullable: true,
    default: 'NULL',
    collation: 'utf8mb4_unicode_ci',
  })
  nick: string | null;
  @Column({
    type: 'mediumtext',
    nullable: true,
    default: 'NULL',
    collation: 'utf8mb4_unicode_ci',
  })
  department: string | null;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: 'NULL',
    collation: 'utf8mb4_unicode_ci',
  })
  backMail: string | null;
  @Column({
    type: 'mediumtext',
    nullable: true,
    default: 'NULL',
    collation: 'utf8mb4_unicode_ci',
  })
  note: string | null;

  constructor(param: User = {} as User) {
    const {
      uid,
      username,
      passwordHash = null,
      nick = null,
      department = null,
      backMail = null,
      note = null,
    } = param;

    this.uid = uid;
    this.username = username;
    this.passwordHash = passwordHash;
    this.nick = nick;
    this.department = department;
    this.backMail = backMail;
    this.note = note;
  }
}
