// src/entry/dto/switch.ts

export interface UpdateSwitchDTO {
  upperSwitch?: number;
  upperPort?: number;
  upperPortType?: number;
  location?: string;
  account?: string;
  password?: string;
  vlan?: string;
  machineType?: number;
  portDescription?: string;
  portType?: string;
  ip?: string;
}
