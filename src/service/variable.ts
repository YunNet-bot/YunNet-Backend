// src/service/variable.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Variable } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult,
} from '@/entry/dto';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

export class VariableService {
  private static INSTANCE: VariableService;
  private variableRepo: Repository<Variable>;

  public static init(): VariableService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new VariableService();
    }
    return this.INSTANCE;
  }

  public static getInstace(): VariableService {
    return this.INSTANCE;
  }

  constructor() {
    this.variableRepo = getRepository(Variable);
  }

  public async getByName(name: string): Promise<Variable> {
    const variable: Variable | null = await this.variableRepo.findOneBy({
      name,
    });

    if (variable === null) {
      throw new Error(`No such Variable with name: ${name}.`);
    }

    return variable;
  }

  public async deleteByName(name: string): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.variableRepo.delete({
      name,
    });

    return filterDeleteResult(result);
  }

  public async add(name: string, type: string, value: string | null): Promise<AddResultDTO> {
    const result: InsertResult = await this.variableRepo.insert({
      name, type, value,
    });

    return filterAddResult(result);
  }

  public async updateByName(name: string, type?: string, value?: string): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.variableRepo
      .createQueryBuilder()
      .update(Variable)
      .set(filterObjectUndefined({
        type, value,
      }))
      .where('name = :name', { name })
      .execute();

    return filterUpdateResult(result);
  }
}
