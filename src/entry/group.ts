// src/entry/group.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
    @PrimaryGeneratedColumn('increment', {
        type: 'int',
        unsigned: true,
    })
    gid: number;
    @Column({
        type: 'text',
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    name: string | null;
    @Column({
        type: 'text',
        collation: 'utf8_unicode_ci',
        nullable: true,
        default: 'NULL',
    })
    description: string | null;

    constructor(param: Group = {} as Group) {
        let {
            gid,
            name = null,
            description = null,
        } = param;

        this.gid = gid;
        this.name = name;
        this.description = description;
    }
}