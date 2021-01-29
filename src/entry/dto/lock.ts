// src/entry/dto/lock.ts

export interface LockDTO {
  lockTypeId: number;
  ip: string;
  uid: number;
  gid: number;
  lockDate: Date;
  unlockDate: Date;
  title: string;
  description: string;
  lockByUserId: number;
}

export interface UpdateLockDTO {
  lockTypeId?: number;
  ip?: string;
  uid?: number;
  gid?: number;
  lockDate?: Date;
  unlockDate?: Date;
  title?: string;
  description?: string;
  lockByUserId: number;
}
