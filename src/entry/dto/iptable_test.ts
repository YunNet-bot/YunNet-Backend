// src/entry/dto/iptable_test.ts

export interface UpdateIptableTestDTO {
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
