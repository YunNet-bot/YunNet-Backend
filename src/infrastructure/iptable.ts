import {
  getRepository, Repository, DeleteResult,
} from 'typeorm';
import { Iptable } from '@/entry';

export class IptableInfra {
  private static INSTANCE: IptableInfra;
  private IptableRepo: Repository<Iptable>;

  public static init(): IptableInfra {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new IptableInfra();
    }
    return this.INSTANCE;
  }

  public static getInstance(): IptableInfra {
    return this.INSTANCE;
  }

  private constructor() {
    this.IptableRepo = getRepository(Iptable);
  }

  public async getByIp(ip: string): Promise<Iptable> {
    const iptable: Iptable | undefined = await this.IptableRepo.findOne({
      ip,
    });
    if (iptable === undefined) {
      throw new Error(`No such IpTable with ip: ${ip}.`);
    }
    return iptable;
  }

  public async deleteByIp(ip: string): Promise<DeleteResult> {
    const result: DeleteResult = await this.IptableRepo.delete({
      ip,
    });
    return result;
  }

  public async add(
    ip: string, ipTid: number, sid:number, port: number, portType: number, mac: string, uid: number,
    description: string, lid: number, isUnlimited?: boolean, isUpdated?: boolean,
  ): Promise<Iptable> {
    const entity = this.IptableRepo.create({
      ip,
      ipTid,
      sid,
      port,
      portType,
      mac,
      uid,
      description,
      lid,
      isUnlimited,
      isUpdated,
    });
    const result: Iptable = await this.IptableRepo.save(entity);
    return result;
  }
  public async update(
    ip: string, ipTid?: number, isUnlimited?: boolean, sid?: number, port?: number,
    portType?: number, mac?: string, isUpdated?: boolean, uid?: number, description?: string,
    lid?: number,
  ):Promise<Iptable> {
    const entity:Iptable = this.IptableRepo.create({
      ip,
      ipTid,
      isUnlimited,
      sid,
      port,
      portType,
      mac,
      isUpdated,
      uid,
      description,
      lid,
    });
    const result:Iptable = await this.IptableRepo.save(entity);
    return result;
  }
}
