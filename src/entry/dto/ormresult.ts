// src/entry/dto/ormresult.ts
import { APIResult } from "./api";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";

export type AddResultDTO = APIResult & ({
  success: true,
  id: Array<string|number>,
} | {
  success: false,
  message: string,
});

export type DeleteResultDTO = APIResult & ({
  success: true,
} | {
  success: false,
  message: string,
});

export type UpdateResultDTO = DeleteResultDTO;

export function filterAddResult(result: InsertResult): AddResultDTO {
  let success = result.raw["affectedRows"] >= 1;
  let id: Array<number|string>;

  id = [result.raw["insertId"] > 0 ? result.raw["insertId"] : undefined];

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
