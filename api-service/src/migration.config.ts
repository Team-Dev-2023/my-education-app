import { DataSource } from 'typeorm';
import { getDbConnection } from './shared/constants/config.constant';
export const dataSource = new DataSource(getDbConnection());
(async function () {
  await dataSource.initialize();
})();
