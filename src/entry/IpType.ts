// src/entry/IpType.ts
// import { Column, Entity, OneToMany } from "typeorm";
// import { Iptable } from "./Iptable";

// @Entity("ip_type", { schema: "YunNet" })
// export class IpType {
//   @Column("int", { primary: true, name: "ip_tid", unsigned: true })
//   ipTid: number;

//   @Column("text", { name: "type", nullable: true })
//   type: string | null;

//   @OneToMany(() => Iptable, (iptable) => iptable.ipT)
//   iptables: Iptable[];
// }
