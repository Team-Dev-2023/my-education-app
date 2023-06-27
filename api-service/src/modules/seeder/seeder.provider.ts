import { Category, SubCategory, Topic } from 'src/entities';
import { repoTokens } from 'src/shared/constants/repo-tokens.constant';
import { DataSource } from 'typeorm';
import { DBConnectionToken } from '../database/database.provider';

export const seederProviders = [
  {
    provide: repoTokens.topic,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Topic),
    inject: [DBConnectionToken],
  },
  {
    provide: repoTokens.subCategory,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubCategory),
    inject: [DBConnectionToken],
  },
  {
    provide: repoTokens.category,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: [DBConnectionToken],
  },
];
