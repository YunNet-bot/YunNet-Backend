// src/service/switch.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Switch } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult,
} from '@/entry/dto';
import { UpdateResultDTO, DeleteResultDTO } from '@yunology/ts-multi-tenancy';

export class SwitchService {
  private static INSTANCE: SwitchService;
  private switchRepo: Repository<Switch>;

  public static init(): SwitchService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new SwitchService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): SwitchService {
    return this.INSTANCE;
  }

  constructor() {
    this.switchRepo = getRepository(Switch);
  }

  public async getById(id: number): Promise<Switch> {
    const switchid: Switch | null = await this.switchRepo.findOneBy({
      id,
    });

    if (switchid === null) {
      throw new Error(`No such Switch with id: ${id}.`);
    }
    return switchid;
  }

  public async deleteById(id: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.switchRepo.delete({
      id,
    });

    return filterDeleteResult(result);
  }

  public async add(
    id: number, upper_switch: number | null, upper_port: number | null,
    upper_port_type: number, location: string | null, account: string,
    password: string, vlan: string, machine_type: number,
    port_description: string | null, port_type: string, ip: string,
  ): Promise<AddResultDTO> {
    const result: InsertResult = await this.switchRepo.insert({
      id,
      upper_switch,
      upper_port,
      upper_port_type,
      location,
      account,
      password,
      vlan,
      machine_type,
      port_description,
      port_type,
      ip,
    });

    return filterAddResult(result);
  }

  public async updateById(
    id: number, upper_switch?: number, upper_port?: number,
    upper_port_type?: number, location?: string, account?: string,
    password?: string, vlan?: string, machine_type?: number,
    port_description?: string, port_type?: string, ip?: string,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.switchRepo
      .createQueryBuilder()
      .update(Switch)
      .set(filterObjectUndefined({
        upper_switch,
        upper_port,
        upper_port_type,
        location,
        account,
        password,
        vlan,
        machine_type,
        port_description,
        port_type,
        ip,
      }))
      .where('id = :id', { id })
      .execute();

    return filterUpdateResult(result);
  }
}
