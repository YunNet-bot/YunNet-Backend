import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn('int', {
        unsigned: true,
        width: 10,
    })
    uid: number;
    @Column('varchar', { length: 20 })
    username: string;
    @Column('mediumtext', { name: 'password_hash' })
    passwordHash: string;
    @Column('mediumtext')
    nick: string;
    @Column('mediumtext')
    department: string;
    @Column('mediumtext', {
        name: 'back_mail',
    })
    backMail: string;
    @Column('mediumtext')
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