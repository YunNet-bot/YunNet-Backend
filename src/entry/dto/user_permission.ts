// src/entry/dto/user_permission.ts

export interface UpdateUserPermissionUidDTO {
  pid: number;
  isExcluded?: number;
}

export interface UpdateUserPermissionPidDTO {
  uid: number;
  isExcluded?: number;
}
