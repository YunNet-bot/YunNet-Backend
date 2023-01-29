// src/service/token.ts
import {
  DeleteResult, getRepository, InsertResult, Repository, UpdateResult,
} from 'typeorm';

import { Token } from '@/entry';
import { filterObjectUndefined } from '@/utils';
import {
  AddResultDTO, DeleteResultDTO, filterAddResult,
  filterDeleteResult, filterUpdateResult, UpdateResultDTO,
} from '@/entry/dto';

export class TokenService {
  private static INSTANCE: TokenService;
  private tokenRepo: Repository<Token>;

  public static init(): TokenService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new TokenService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): TokenService {
    return this.INSTANCE;
  }

  constructor() {
    this.tokenRepo = getRepository(Token);
  }

  public async getByUid(uid: number): Promise<Token> {
    const token: Token | null = await this.tokenRepo.findOneBy({
      uid,
    });

    if (token === null) {
      throw new Error(`No such Token with uid: ${uid}.`);
    }
    return token;
  }

  public async deleteByUid(uid: number): Promise<DeleteResultDTO> {
    const result: DeleteResult = await this.tokenRepo.delete({
      uid,
    });

    return filterDeleteResult(result);
  }

  public async add(uid: number, token: string | null, timestamp: Date): Promise<AddResultDTO> {
    const result: InsertResult = await this.tokenRepo.insert({
      uid, token, timestamp,
    });

    return filterAddResult(result);
  }

  public async updateByUid(
    uid: number, token?: string, timestamp?: Date,
  ): Promise<UpdateResultDTO> {
    const result: UpdateResult = await this.tokenRepo
      .createQueryBuilder()
      .update(Token)
      .set(filterObjectUndefined({
        token, timestamp,
      }))
      .where('uid = :uid', { uid })
      .execute();

    return filterUpdateResult(result);
  }
}
