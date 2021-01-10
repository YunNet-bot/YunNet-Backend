// src/entry/dto/user_permission.ts

export interface UpdateUserPermissionUidDTO {
    pid: number;
    is_excluded?: number;
}

export interface UpdateUserPermissionPidDTO {
    uid: number;
    is_excluded?: number;
}