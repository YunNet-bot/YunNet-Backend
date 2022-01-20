// src/entry/IptableTest.ts
// import { Column, Entity, Index } from "typeorm";

// @Index("mac", ["mac"], { unique: true })
// @Index("iptable_fk_switch", ["switchId"], {})
// @Index("iptable_fk_ip_type", ["ipTypeId"], {})
// @Index("iptable_fk_user", ["uid"], {})
// @Index("iptable_fk_group", ["gid"], {})
// @Entity("iptable_test", { schema: "YunNet" })
// export class IptableTest {
//   @Column("varchar", { primary: true, name: "ip", length: 32 })
//   ip: string;

//   @Column("int", { name: "ip_type_id", nullable: true, unsigned: true })
//   ipTypeId: number | null;

//   @Column("tinyint", { name: "is_unlimited", width: 1, default: () => "'0'" })
//   isUnlimited: boolean;

//   @Column("int", { name: "switch_id", nullable: true })
//   switchId: number | null;

//   @Column("int", { name: "port" })
//   port: number;

//   @Column("int", { name: "port_type" })
//   portType: number;

//   @Column("varchar", { name: "mac", nullable: true, unique: true, length: 18 })
//   mac: string | null;

//   @Column("tinyint", { name: "is_updated", width: 1, default: () => "'0'" })
//   isUpdated: boolean;

//   @Column("int", { name: "uid", unsigned: true })
//   uid: number;

//   @Column("int", { name: "gid", unsigned: true })
//   gid: number;

//   @Column("text", { name: "description" })
//   description: string;

//   @Column("int", { name: "lock_id", nullable: true, unsigned: true })
//   lockId: number | null;
// }
