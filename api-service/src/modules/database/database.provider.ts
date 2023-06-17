import { getDbConnection } from 'src/shared/constants/config.constant';
import { DataSource, DataSourceOptions } from 'typeorm';
export const DBConnectionToken = 'DATA_SOURCE';
export const databaseProviders = [
  {
    provide: DBConnectionToken,
    useFactory: async () => {
      const dataSource = new DataSource(getDbConnection() as DataSourceOptions);
      return dataSource.initialize();
    },
  },
];
