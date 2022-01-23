import { User } from '@/entry';
import { getRepository, Repository, DeleteResult } from 'typeorm';
import { DeleteResultDTO, filterDeleteResult } from '@/entry/dto';

export class UserInfra {
  private static INSTANCE: UserInfra;
  private userRepo:Repository<User>;

  public static init():UserInfra {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new UserInfra();
    }
    return this.INSTANCE;
  }

  public static getInstance():UserInfra {
    return this.INSTANCE;
  }

  private constructor() {
    this.userRepo = getRepository(User);
  }

  public async getByUid(uid:number):Promise<User> {
    const result:User | undefined = await this.userRepo.findOne(uid);
    if (result === undefined) {
      throw new Error(`No such user with uid: ${uid}.`);
    }
    return result;
  }

  public async deleteByUid(uid:number):Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.userRepo.delete(uid);
    return filterDeleteResult(result);
  }

  public async add(
    uid:number, account:string, password:string, name:string,
    department:string, mail:string, isAdmin:boolean,
  ):Promise<User> {
    const entity:User = this.userRepo.create({
      uid,
      account,
      password,
      name,
      department,
      mail,
      isAdmin,
    });
    const result:User = await this.userRepo.save(entity);
    return result;
  }

  public async updateByUid(
    uid:number, account?:string, password?:string, name?:string,
    department?:string, mail?:string, isAdmin?:boolean,
  ):Promise<User> {
    const entity:User = this.userRepo.create({
      uid,
      account,
      password,
      name,
      department,
      mail,
      isAdmin,
    });
    const result:User = await this.userRepo.save(entity);
    return result;
  }
}
