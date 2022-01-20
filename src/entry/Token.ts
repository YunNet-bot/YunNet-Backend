// src/entry/Token.ts
// import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
// import { User } from "./User";

// @Entity("token", { schema: "YunNet" })
// export class Token {
//   @Column("int", { primary: true, name: "uid", unsigned: true })
//   uid: number;

//   @Column("text", { name: "token", nullable: true })
//   token: string | null;

//   @Column("datetime", { name: "timestamp", default: () => "CURRENT_TIMESTAMP" })
//   timestamp: Date;

//   @OneToOne(() => User, (user) => user.token, {
//     onDelete: "RESTRICT",
//     onUpdate: "RESTRICT",
//   })
//   @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
//   u: User;
// }
