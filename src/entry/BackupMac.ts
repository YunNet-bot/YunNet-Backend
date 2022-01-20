// src/entry/BackupMac.ts
// import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
// import { Iptable } from "./Iptable";

// @Index("ip", ["ip"], {})
// @Entity("backup_mac", { schema: "YunNet" })
// export class BackupMac {
//   @Column("varchar", { primary: true, name: "ip", length: 32 })
//   ip: string;

//   @Column("varchar", { name: "mac", nullable: true, length: 18 })
//   mac: string | null;

//   @OneToOne(() => Iptable, (iptable) => iptable.backupMac, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn([{ name: "ip", referencedColumnName: "ip" }])
//   ip2: Iptable;
// }
