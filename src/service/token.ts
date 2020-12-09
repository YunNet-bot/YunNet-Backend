// src/service/token.ts

import { Token } from "@/entry";
import { DeleteResult, getRepository, Repository } from "typeorm";

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
            uid: uid,
        });

        if(token === undefined) {
            throw new Error(`No such Token with uid: ${uid}.`);
        }

        return token;
    }

    public async deleteByUid(uid: number): Promise<boolean> {
        const result: DeleteResult = await this.tokenRepo.delete({
            uid: uid,
        });

        return result.affected !== undefined && result.affected !== null && result.affected > 0
    }
}