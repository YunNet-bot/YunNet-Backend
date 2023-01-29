import { EntityManager } from 'typeorm';
import { InfrastructureManyModifiable, RuntimeTenant } from '@yunology/ts-multi-tenancy';

import { User } from '../entity/user.entity';

export class UserInfrastructure extends InfrastructureManyModifiable<User> {
  private static INSTANCE: UserInfrastructure;

  public static init(): UserInfrastructure {
    if (this.INSTANCE === undefined) {
      this.INSTANCE = new UserInfrastructure();
    }

    return this.INSTANCE;
  }

  public static getInstance(): UserInfrastructure {
    return this.INSTANCE;
  }

  constructor() {
    super(User);
  }

  public getById(
    manager: EntityManager, { tenantId }: RuntimeTenant, id: string,
  ) {
    return this.get(manager, { tenantId, id });
  }

  public getByUserName(
    manager: EntityManager, { tenantId }: RuntimeTenant, username: string,
  ): Promise<User> {
    return this.get(manager, { tenantId, username });
  }

  public insert(
    manager: EntityManager,
    { tenantId }: RuntimeTenant,
    username: string,
    nick: string,
    department: string,
    backMail: string | null = null,
    note: string | null = null,
  ) {
    const user = new User();
    user.tenantId = tenantId;
    user.username = username;
    user.nick = nick;
    user.department = department;
    user.backMail = backMail;
    user.note = note;

    return this.add(manager, user, { tenantId, username });
  }

  public setPasswordByUserName(
    manager: EntityManager,
    { tenantId }: RuntimeTenant,
    username: string,
    password: string,
  ): Promise<User> {
    return this.update(
      manager,
      { tenantId, username },
      { passwordHash: password },
    );
  }
}
