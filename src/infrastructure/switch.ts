import { Switch } from '@/entry';
import { getRepository, Repository, DeleteResult } from 'typeorm';
import { DeleteResultDTO, filterDeleteResult } from '@/entry/dto';

export class SwitchInfra {
  private static INSTANCE: SwitchInfra;
  private switchRepo:Repository<Switch>;

  public static init():SwitchInfra {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new SwitchInfra();
    }
    return this.INSTANCE;
  }

  public static getInstance():SwitchInfra {
    return this.INSTANCE;
  }

  private constructor() {
    this.switchRepo = getRepository(Switch);
  }

  public async getById(id:number):Promise<Switch> {
    const result: Switch | undefined = await this.switchRepo.findOne(id);
    if (result === undefined) {
      throw new Error(`No such Switch with id: ${id}.`);
    }
    return result;
  }

  public async deleteById(id:number):Promise<DeleteResultDTO> {
    const result:DeleteResult = await this.switchRepo.delete(id);
    return filterDeleteResult(result);
  }

  public async add(
    id:number, upperSwitch:number, upperPort:number, upperPortType:number, location:string,
    account:string, password:string, vlan:string, machineType:number, portDescription:string,
    portType:string, ip:string,
  ):Promise<Switch> {
    const entity:Switch = this.switchRepo.create({
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
    const result:Switch = await this.switchRepo.save(entity);
    return result;
  }

  public async updateById(
    id:number, upperSwitch?:number, upperPort?:number, upperPortType?:number, location?:string,
    account?:string, password?:string, vlan?:string, machineType?:number, portDescription?:string,
    portType?:string, ip?:string,
  ):Promise<Switch> {
    const entity:Switch = this.switchRepo.create({
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
    const result:Switch = await this.switchRepo.save(entity);
    return result;
  }
}
