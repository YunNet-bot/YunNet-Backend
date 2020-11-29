// src/entry/variable.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Variable {
    @PrimaryColumn({
        type: 'varchar',
        length: 32,
        collation: 'utf8_unicode_ci',
    })
    name: string;
    @Column({
        type: 'varchar',
        length: 16,
        collation: 'utf8_unicode_ci',
    })
    type: string;
    @Column({
        type: 'text',
        nullable: true,
        default: 'NULL',
        collation: 'utf8_unicode_ci',
    })
    value: string;

    constructor(name: string, type: string, value: string) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}