import { Cart } from 'src/entities';
import { repoTokens } from 'src/shared/constants/repo-tokens.constant';
import { DataSource } from 'typeorm';
import { DBConnectionToken } from '../database/database.provider';

export const cartProviders = [
  {
    provide: repoTokens.cart,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cart),
    inject: [DBConnectionToken],
  },
];
