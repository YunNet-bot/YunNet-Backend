// src/entry/dto/netflow.ts

export interface UpdateNetflowDTO {
    wan_upload?: number;
    wan_download?: number;
    lan_upload?: number;
    lan_download?: number;
}