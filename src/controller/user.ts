import { UserInfoDTO } from '@/entry/dto';
import { UserService } from '@/service';
import { Controller, Get, Path, Route, Tags } from 'tsoa';

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
