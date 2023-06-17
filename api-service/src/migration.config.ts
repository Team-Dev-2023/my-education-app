import { DataSource } from 'typeorm';
import { getDbConnection } from './shared/config.constant';
export const dataSource = new DataSource(getDbConnection());
(async function () {
  await dataSource.initialize();
})();
