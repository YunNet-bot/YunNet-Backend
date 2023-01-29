import { EntityManager } from 'typeorm';
import { DataService, RuntimeTenant } from '@yunology/ts-multi-tenancy';

import { UserInsertDTO } from '../dto';
import { User } from '../entity/user.entity';
import { UserInfrastructure } from '../infrastructure/user';

export class UserService extends DataService {
  // @staticmethod
  // async def delete_user(username):
  //   """Add user. Actually is Disable user
  //   Args:
  //     username: username.
  //   Returns:
  //     int. return affected row count.
  //   """
  //   async with SQLPool.acquire() as conn:
  //     async with conn.cursor(DictCursor) as cur:
  //       sql = (
  //         "DELETE gu "
  //         "FROM `group_user` AS gu "
  //         "INNER JOIN `user` AS u ON u.uid = gu.uid "
  //         "WHERE u.username = %s"
  //       )
  //       para_input = username
  //       affected = await cur.execute(sql, para_input)
  //       # release user's used ip
  //       sql = (
  //         "UPDATE `iptable` AS i "
  //         "INNER JOIN `user` AS u "
  //         "ON i.`uid` = u.`uid` "
  //         "SET i.`uid` = 0 "
  //         "WHERE u.`username` = %s "
  //       )
  //       affected = await cur.execute(sql, para_input)
  //       await conn.commit()
  //   return affected
  public async deleteUserByUserName(): Promise<string> {
    return 'TBD';
  }

  public async new(
    operator: User,
    tenant: RuntimeTenant,
    dto: UserInsertDTO,
    manager?: EntityManager,
  ): Promise<User> {
    const cb = async (manager: EntityManager): Promise<User> => {
      const { username, nick, department, backMail, note } = dto;
      return UserInfrastructure.getInstance().insert(
        manager, tenant, username, nick, department, backMail, note,
      );
    };
    return manager ? cb(manager) : this.serialTran(tenant, cb);
  }

  public async getIdByUserName(
    operator: User,
    tenant: RuntimeTenant,
    username: string,
    manager?: EntityManager,
  ): Promise<string | null> {
    const cb = async (manager: EntityManager): Promise<string | null> => {
      try {
        const user = await UserInfrastructure.getInstance().getByUserName(
          manager, tenant, username,
        );
        return user.id;
      } catch {
        return null;
      }
    };
    return manager ? cb(manager) : this.serialTran(tenant, cb);
  }

  public async getUserNameById(
    operator: User,
    tenant: RuntimeTenant,
    id: string,
    manager?: EntityManager,
  ): Promise<string | null> {
    const cb = async (manager: EntityManager): Promise<string | null> => {
      try {
        const user = await UserInfrastructure.getInstance().getById(
          manager, tenant, id,
        );
        return user.username;
      } catch {
        return null;
      }
    };
    return manager ? cb(manager) : this.serialTran(tenant, cb);
  }

  public async getPasswordByUserName(
    operator: User,
    tenant: RuntimeTenant,
    username: string,
    manager?: EntityManager,
  ): Promise<string> {
    const cb = async (manager: EntityManager): Promise<string> => {
      try {
        const user = await UserInfrastructure.getInstance().getByUserName(
          manager, tenant, username,
        );
        return user.username;
      } catch {
        return '';
      }
    };
    return manager ? cb(manager) : this.serialTran(tenant, cb);
  }

  public async setPasswordByUserName(
    operator: User,
    tenant: RuntimeTenant,
    username: string,
    password: string,
    manager?: EntityManager,
  ): Promise<boolean> {
    const cb = async (manager: EntityManager): Promise<boolean> => {
      try {
        await UserInfrastructure.getInstance().setPasswordByUserName(
          manager, tenant, username, password,
        );
        return true;
      } catch {
        return false;
      }
    };
    return manager ? cb(manager) : this.serialTran(tenant, cb);
  }
}
