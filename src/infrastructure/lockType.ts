import { LockType } from '@/entry';
import { getRepository, Repository, DeleteResult } from 'typeorm';
import { DeleteResultDTO, filterDeleteResult } from '@/entry/dto';

export class LockTypeInfra {
  private static INSTANCE: LockTypeInfra;
  private lockTypeRepo: Repository<LockType>;

  public static init(): LockTypeInfra {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new LockTypeInfra();
    }
    return this.INSTANCE;
  }

  public static getInstance():LockTypeInfra {
    return this.INSTANCE;
  }

  private constructor() {
    this.lockTypeRepo = getRepository(LockType);
  }

  public async getByLid(lid:number): Promise<LockType> {
    const result: LockType | undefined = await this.lockTypeRepo.findOne(lid);
    if (result === undefined) {
      throw new Error(`No such LockType with lid: ${lid}.`);
    }
    return result;
  }

  public async deleteByLid(lid:number): Promise<DeleteResultDTO> {
    const result:DeleteResult = await this.lockTypeRepo.delete(lid);
    return filterDeleteResult(result);
  }

  public async add(str:string): Promise<LockType> {
    const entity = this.lockTypeRepo.create({ str });
    const result = await this.lockTypeRepo.save(entity);
    return result;
  }

  public async updateByLid(lockTypeId:number, str:string): Promise<LockType> {
    const entity = this.lockTypeRepo.create({
      lockTypeId,
      str,
    });
    const result = await this.lockTypeRepo.save(entity);
    return result;
  }
}
