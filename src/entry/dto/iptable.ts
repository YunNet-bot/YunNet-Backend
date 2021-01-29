// src/entry/dto/iptable.ts

export interface UpdateIptableDTO {
  ipTypeId?: number;
  isUnlimited?: number;
  switchId?: number;
  port?: number;
  portType?: number;
  mac?: string;
  isUpdated?: number;
  uid?: number;
  gid?: number;
  description?: string;
  lockId?: number;
}
