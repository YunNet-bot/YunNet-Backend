// src/entry/bed.ts
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Bed {
  @PrimaryColumn({
    type: 'varchar',
    length: 9,
    collation: 'utf8_unicode_ci',
  })
  bed: string;
  @Column('int', { width: 11 })
  type: number;
  @Column({
    type: 'varchar',
    length: 9,
    collation: 'utf8_unicode_ci',
    nullable: true,
    default: 'NULL',
  })
  portal: string | null;
  @Column({
    type: 'varchar',
    length: 32,
    collation: 'utf8_unicode_ci',
  })
  ip: string;

  constructor(param: Bed = {} as Bed) {
    const {
      bed,
      type,
      portal = null,
      ip,
    } = param;

    this.bed = bed;
    this.type = type;
    this.portal = portal;
    this.ip = ip;
  }
}
