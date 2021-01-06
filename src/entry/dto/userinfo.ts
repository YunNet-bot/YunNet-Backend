// src/entry/dto/userinfo.ts

export interface UserInfoDTO {
    username: string;
    department: string | null;
    name: string | null;
    group: Array<string>
}