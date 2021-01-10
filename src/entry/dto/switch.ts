// src/entry/dto/switch.ts

export interface UpdateSwitchDTO {
    upper_switch?: number;
    upper_port?: number;
    upper_port_type?: number;
    location?: string;
    account?: string;
    password?: string;
    vlan?: string;
    machine_type?: number;
    port_description?: string;
    port_type?: string;
    ip?: string;
}