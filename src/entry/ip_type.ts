// src/entry/ip_type.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'ip_type' })
export class IpType {
  @PrimaryColumn('int', {
    name: 'ip_type_id',
    width: 11,
    unsigned: true,
  })
  ipTypeId: number;
  @Column({
    type: 'text',
    collation: 'utf8_unicode_ci',
    nullable: true,
    default: 'NULL',
  })
  type: string | null;

  constructor(param: IpType = {} as IpType) {
    const {
      ipTypeId,
      type = null,
    } = param;

    this.ipTypeId = ipTypeId;
    this.type = type;
  }
}
