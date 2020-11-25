// src/entry/group.ts
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Group {
    @PrimaryColumn('int', {
        width: 10,
        unsigned: true,
    })
    gid: number;
    @Column('text')
    name: string;
    @Column('text')
    description: string;

    constructor(gid: number, name: string, desciption: string) {
        this.gid = gid;
        this.name = name;
        this.description = desciption;
    }
}