import { Lock } from '@/entry';
import { getRepository, Repository, DeleteResult } from 'typeorm';
import { DeleteResultDTO, filterDeleteResult } from '@/entry/dto';

export class LockInfra {
  private static INSTANCE: LockInfra;
  private lockTypeRepo: Repository<Lock>;

  public static init():LockInfra {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new LockInfra();
    }
    return this.INSTANCE;
  }

  public static getInstanace():LockInfra {
    return this.INSTANCE;
  }

  private constructor() {
    this.lockTypeRepo = getRepository(Lock);
  }

  public async getByLid(lid:number):Promise<Lock> {
    const result : Lock | undefined = await this.lockTypeRepo.findOne(lid);
    if (result === undefined) {
      throw new Error(`No such Lock with lid: ${lid}.`);
    }
    return result;
  }

  public async deleteByLid(lid:number):Promise<DeleteResultDTO> {
    const result : DeleteResult = await this.lockTypeRepo.delete(lid);
    return filterDeleteResult(result);
  }

  public async add(
    lid:number, lockTid:number, ip:string, uid:number, lockDate:Date, unlockDate:Date,
    title:string, description:string, lockByUid:number,
  ):Promise<Lock> {
    const entity: Lock = this.lockTypeRepo.create({
      lid,
      lockTid,
      ip,
      uid,
      lockDate,
      unlockDate,
      title,
      description,
      lockByUid,
    });
    const result : Lock = await this.lockTypeRepo.save(entity);
    return result;
  }

  public async updateByLid(
    lid:number, lockTid?:number, ip?:string, uid?:number, lockDate?:Date, unlockDate?:Date,
    title?:string, description?:string, lockByUid?:number,
  ):Promise<Lock> {
    const entity: Lock = this.lockTypeRepo.create({
      lid,
      lockTid,
      ip,
      uid,
      lockDate,
      unlockDate,
      title,
      description,
      lockByUid,
    });
    const result : Lock = await this.lockTypeRepo.save(entity);
    return result;
  }
}
