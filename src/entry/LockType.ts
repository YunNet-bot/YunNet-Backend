// src/entry/LockType.ts
// import { Column, Entity, OneToMany } from "typeorm";
// import { Lock } from "./Lock";

// @Entity("lock_type", { schema: "YunNet" })
// export class LockType {
//   @Column("int", { primary: true, name: "lock_type_id", unsigned: true })
//   lockTypeId: number;

//   @Column("text", { name: "str", nullable: true })
//   str: string | null;

//   @OneToMany(() => Lock, (lock) => lock.lockT)
//   locks: Lock[];
// }