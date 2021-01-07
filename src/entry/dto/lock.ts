// src/entry/dto/lock.ts

export interface LockDTO {
  lock_type_id: number;
  ip: string;
  uid: number;
  gid: number;
  lock_date: Date;
  unlock_date: Date;
  title: string;
  description: string;
  lock_by_user_id: number;
}

export interface UpdateLockDTO {
  lock_type_id?: number;
  ip?: string;
  uid?: number;
  gid?: number;
  lock_date?: Date;
  unlock_date?: Date;
  title?: string;
  description?: string;
  lock_by_user_id?: number;
}
