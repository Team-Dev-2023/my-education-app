import { Category } from 'src/entities/category.entity';
import { repoTokens } from 'src/shared/repo-tokens.constant';
import { DataSource } from 'typeorm';
import { DBConnectionToken } from '../database/database.provider';

export const categoryProvider = [
  {
    provide: repoTokens.category,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: [DBConnectionToken],
  },
];
