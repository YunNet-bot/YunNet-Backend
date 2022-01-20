// src/entry/Temptable.ts
import { Column, Entity } from "typeorm";

@Entity("temptable", { schema: "YunNet" })
export class Temptable {
  @Column("varchar", { name: "bed", length: 200 })
  bed: string;

  @Column("varchar", { name: "username", length: 200 })
  username: string;
}
