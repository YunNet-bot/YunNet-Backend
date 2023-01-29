// src/dto/user.ts

export interface UserInsertDTO {
  username: string;
  nick: string;
  department: string;
  backMail: string | null;
  note: string | null;
};
