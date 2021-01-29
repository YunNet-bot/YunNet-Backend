// src/entry/dto/netflow.ts

export interface UpdateNetflowDTO {
  wanUpload?: number;
  wanDownload?: number;
  lanUpload?: number;
  lanDownload?: number;
}
