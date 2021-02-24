// src/controller/token.ts
import {
  Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags,
} from 'tsoa';

import { Token } from '@/entry';
import {
  AddResultDTO, DeleteResultDTO, UpdateResultDTO,
  UpdateTokenDTO,
} from '@/entry/dto';
import { TokenService } from '@/service';

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
  ): Promise<DeleteResultDTO> {
    return TokenService.getInstance().deleteByUid(uid);
  }

  @Post()
  public async add(
    @Body() form: Token,
  ): Promise<AddResultDTO> {
    const { uid, token, timestamp } = form;
    return TokenService.getInstance().add(uid, token, timestamp);
  }

  @Patch('{uid}')
  public async updateByUid(
    @Path('uid') uid: number,
      @Body() form: UpdateTokenDTO,
  ): Promise<UpdateResultDTO> {
    const { token, timestamp } = form;
    return TokenService.getInstance().updateByUid(uid, token, timestamp);
  }
}
