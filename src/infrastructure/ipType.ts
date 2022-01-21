import { IpType } from '@/entry';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { DeleteResultDTO, filterDeleteResult } from '@/entry/dto';

export class IpTypeInfra {
  private static INSTANCE: IpTypeInfra;
  private ipTypeRepo: Repository<IpType>;

  public static init():IpTypeInfra {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new IpTypeInfra();
    }
    return this.INSTANCE;
  }

  public static getInstance():IpTypeInfra {
    return this.INSTANCE;
  }

  constructor() {
    this.ipTypeRepo = getRepository(IpType);
  }

  public async getByIpTid(ipTid:number):Promise<IpType> {
    const result: IpType | undefined = await this.ipTypeRepo.findOne(ipTid);
    if (result === undefined) {
      throw new Error(`No such IpType with ipTid: ${ipTid}.`);
    }
    return result;
  }

  public async deleteByIpTid(ipTid:number):Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.ipTypeRepo.delete(ipTid);
    return filterDeleteResult(result);
  }

  public async add(type:string):Promise<IpType> {
    const entity = this.ipTypeRepo.create({
      type,
    });
    return this.ipTypeRepo.save(entity);
  }

  public async updateByIpTid(ipTid:number, type:string):Promise<IpType> {
    const entity:IpType = this.ipTypeRepo.create({
      ipTid,
      type,
    });
    const result:IpType = await this.ipTypeRepo.save(entity);
    return result;
  }
}
