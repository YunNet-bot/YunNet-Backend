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
    token: string;
    @Column({
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP',
    })
    timestamp: Date;

    constructor(uid: number, token: string, timestamp: Date) {
        this.uid = uid;
        this.token = token;
        this.timestamp = timestamp;
    }
}