import { Category } from 'src/entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { DBConnectionToken } from '../database/database.provider';

export const categoryProvider = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: [DBConnectionToken],
  },
];
