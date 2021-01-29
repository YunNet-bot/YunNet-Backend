// src/service/switch.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Switch } from '@/entry';
import { filterObjectUndefined } from '@/utils';

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
    const switchid: Switch | undefined = await this.switchRepo.findOne({
      id,
    });

    if (switchid === undefined) {
      throw new Error(`No such Switch with id: ${id}.`);
    }
    return switchid;
  }

  public async deleteById(id: number): Promise<boolean> {
    const result: DeleteResult = await this.switchRepo.delete({
      id,
    });

    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  public async add(
    id: number, upperSwitch: number | null, upperPort: number | null,
    upperPortType: number, location: string | null, account: string,
    password: string, vlan: string, machineType: number,
    portDescription: string | null, portType: string, ip: string,
  ): Promise<any> {
    const result: InsertResult = await this.switchRepo.insert({
      id,
      upperSwitch,
      upperPort,
      upperPortType,
      location,
      account,
      password,
      vlan,
      machineType,
      portDescription,
      portType,
      ip,
    });

    return result.raw;
  }

  public async updateById(
    id: number, upperSwitch?: number, upperPort?: number,
    upperPortType?: number, location?: string, account?: string,
    password?: string, vlan?: string, machineType?: number,
    portDescription?: string, portType?: string, ip?: string,
  ): Promise<any> {
    const result: UpdateResult = await this.switchRepo
      .createQueryBuilder()
      .update(Switch)
      .set(filterObjectUndefined({
        upperSwitch,
        upperPort,
        upperPortType,
        location,
        account,
        password,
        vlan,
        machineType,
        portDescription,
        portType,
        ip,
      }))
      .where('id = :id', { id })
      .execute();

    return result.raw;
  }
}
