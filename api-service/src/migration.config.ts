import { DataSource } from 'typeorm';
import { getDbConnection } from './shared/helpers';
export const dataSource = new DataSource(getDbConnection());
(async function () {
  await dataSource.initialize();
})();
