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
    passwordHash: string;
    @Column({
        type: 'mediumtext',
        nullable: true,
        default: 'NULL',
        collation: 'utf8mb4_unicode_ci',
    })
    nick: string;
    @Column({
        type: 'mediumtext',
        nullable: true,
        default: 'NULL',
        collation: 'utf8mb4_unicode_ci',
    })
    department: string;
    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        default: 'NULL',
        collation: 'utf8mb4_unicode_ci',
    })
    backMail: string;
    @Column({
        type: 'mediumtext',
        nullable: true,
        default: 'NULL',
        collation: 'utf8mb4_unicode_ci',
    })
    note: string;

    constructor(uid: number, username:string, passwordHash: string, nick: string, department: string, backMail: string, note: string) {
        this.uid = uid;
        this.username = username;
        this.passwordHash = passwordHash;
        this.nick = nick;
        this.department = department;
        this.backMail = backMail;
        this.note = note;
    }
}