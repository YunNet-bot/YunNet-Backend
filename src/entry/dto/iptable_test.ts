// src/entry/dto/iptable_test.ts

export interface UpdateIptableTestDTO {
  ip_type_id?: number;
  is_unlimited?: number;
  switch_id?: number;
  port?: number;
  port_type?: number;
  mac?: string;
  is_updated?: number;
  uid?: number;
  gid?: number;
  description?: string;
  lock_id?: number;
}
