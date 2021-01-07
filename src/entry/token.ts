// src/entry/token.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Token {
  @PrimaryColumn('int', {
    width: 10,
    unsigned: true,
  })
  uid: number;
  @Column({
    type: 'text',
    collation: 'utf8_unicode_ci',
    nullable: true,
    default: 'NULL',
  })
  token: string | null;
  @Column({
    type: 'datetime',
    default: 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;

  constructor(param: Token = {} as Token) {
    const {
      uid,
      token = null,
      timestamp,
    } = param;

    this.uid = uid;
    this.token = token;
    this.timestamp = timestamp;
  }
}
