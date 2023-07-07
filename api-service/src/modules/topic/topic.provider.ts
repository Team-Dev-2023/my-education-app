import { Topic } from 'src/entities';
import { repoTokens } from 'src/shared/constants/repo-tokens.constant';
import { DataSource } from 'typeorm';
import { DBConnectionToken } from '../database/database.provider';

export const topicProvider = [
  {
    provide: repoTokens.topic,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Topic),
    inject: [DBConnectionToken],
  },
];
