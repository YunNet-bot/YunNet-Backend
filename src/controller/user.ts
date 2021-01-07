// src/controller/user.ts
import {
  Controller, Get, Path, Route, Tags,
} from 'tsoa';

import { UserInfoDTO } from '@/entry/dto';
import { UserService } from '@/service';

@Tags('User')
@Route('users')
export class UserController extends Controller {
  @Get('{username}')
  public async getUserInfoByUsername(
    @Path() username: string,
  ): Promise<UserInfoDTO> {
    return UserService.getInstance().getInfo(username);
  }
}
