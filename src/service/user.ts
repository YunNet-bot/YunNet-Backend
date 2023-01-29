// src/service/user.ts
import { getRepository, Repository } from 'typeorm';

import { Group, User, GroupUser } from '@/entry';
import { UserInfoDTO } from '@/entry/dto';

export class UserService {
  private static INSTANCE: UserService;
  private userRepo: Repository<User>;
  private groupRepo: Repository<Group>;

  public static init(): UserService {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new UserService();
    }
    return this.INSTANCE;
  }

  public static getInstance(): UserService {
    return this.INSTANCE;
  }

  constructor() {
    this.userRepo = getRepository(User);
    this.groupRepo = getRepository(Group);
  }

  public async getByUsername(username: string): Promise<User> {
    const user: User | null = await this.userRepo.findOneBy({
      username,
    });

    if (user === null) {
      throw new Error(`No such user with username: ${username}.`);
    }
    return user;
  }

  public async getInfo(username: string): Promise<UserInfoDTO> {
    const user: User = await this.getByUsername(username);
    const groupDescriptions: Array<{ [g_description: string]: string }> = await this.groupRepo
      .createQueryBuilder('g')
      .select('g.description')
      .innerJoin(GroupUser, 'gu', 'g.gid = gu.gid')
      .innerJoin(User, 'u', 'u.uid = gu.uid')
      .where('u.username = :username', { username })
      .getRawMany();
    return {
      username: user.username,
      department: user.department,
      name: user.nick,
      group: groupDescriptions
        .map((g: { [g_description: string]: string }) => g.g_description),
    };
  }
}
