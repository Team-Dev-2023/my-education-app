import { LoginMethod } from 'src/entities/login-method.entity';
import { RolePermission } from 'src/entities/role-permission.entity';
import { User } from 'src/entities/user.entity';
import { repoTokens } from 'src/shared/constants/repo-tokens.constant';
import { DataSource } from 'typeorm';
import { DBConnectionToken } from '../database/database.provider';

export const userProvider = [
  {
    provide: repoTokens.user,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DBConnectionToken],
  },
  {
    provide: repoTokens.loginMethod,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LoginMethod),
    inject: [DBConnectionToken],
  },
  {
    provide: repoTokens.rolePermission,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RolePermission),
    inject: [DBConnectionToken],
  },
];
