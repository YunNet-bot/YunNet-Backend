// src/entry/dto/group.ts

export interface GroupDTO {
  name: string;
  description: string;
}

export interface UpdateGroupDTO {
  name?: string;
  description?: string;
}
