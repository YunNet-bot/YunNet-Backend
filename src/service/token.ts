// src/service/token.ts

import { Token } from "@/entry";
import { filterObjectUndefined } from "@/utils";
import { DeleteResult, getRepository, InsertResult, Repository, UpdateResult } from "typeorm";

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
        const token: Token | undefined = await this.tokenRepo.findOne({
            uid,
        });

        if(token === undefined) {
            throw new Error(`No such Token with uid: ${uid}.`);
        }

        return token;
    }

    public async deleteByUid(uid: number): Promise<boolean> {
        const result: DeleteResult = await this.tokenRepo.delete({
            uid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }

    public async add(uid: number, token: string, timestamp: Date): Promise<any> {
        const result: InsertResult = await this.tokenRepo.insert({
            uid, token, timestamp,
        });

        return result.raw;
    }

    public async updateByUid(uid: number, token?: string, timestamp?: Date): Promise<any> {
        const result: UpdateResult = await this.tokenRepo
            .createQueryBuilder()
            .update(Token)
            .set(filterObjectUndefined({
                token, timestamp,
            }))
            .where("uid = :uid", { uid })
            .execute();

        return result.raw;
    }
}