import { SubCategory } from 'src/entities';
import { repoTokens } from 'src/shared/constants/repo-tokens.constant';
import { DataSource } from 'typeorm';
import { DBConnectionToken } from '../database/database.provider';

export const subCategoryProvider = [
  {
    provide: repoTokens.subCategory,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubCategory),
    inject: [DBConnectionToken],
  },
];
