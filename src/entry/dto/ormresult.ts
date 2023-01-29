// src/entry/dto/ormresult.ts
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { APIResult, UpdateResultDTO, DeleteResultDTO } from "@yunology/ts-multi-tenancy";

export type AddResultDTO = APIResult & ({
  success: true,
  id: Array<string|number>,
} | {
  success: false,
  message: string,
});

export function filterAddResult(result: InsertResult): AddResultDTO {
  let success = result.raw["affectedRows"] >= 1;
  let idstr = Object.values(result.identifiers[0])[0];
  let id: Array<number|string>;

  id = [result.raw["insertId"] > 0 ? result.raw["insertId"] : idstr ];

  return success ? {
    success,
    id,
  } : {
    success,
    message: '',
  };
}

export function filterUpdateResult(result: UpdateResult): UpdateResultDTO {
  let success = result.raw["affectedRows"] >= 1;

  return success ? {
    success,
  } : {
    success,
    message: '',
  };
}

export function filterDeleteResult(result: DeleteResult): DeleteResultDTO {
  let success = result.raw["affectedRows"] >= 1;

  return success ? {
    success,
  } : {
    success,
    message: '',
  };
}
