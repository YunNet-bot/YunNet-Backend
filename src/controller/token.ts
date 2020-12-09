// src/controller/token.ts

import { Token } from "@/entry";
import { TokenService } from "@/service";
import { Controller, Delete, Get, Path, Route, Tags } from "tsoa";

@Tags('Token')
@Route('token')
export class TokenController extends Controller {
    @Get('{uid}')
    public async getByUid(
        @Path('uid') uid: number,
    ): Promise<Token> {
        return TokenService.getInstance().getByUid(uid);
    }

    @Delete('{uid}')
    public async deleteByUid(
        @Path('uid') uid: number,
    ): Promise<void> {
        TokenService.getInstance().deleteByUid(uid);
    }
}