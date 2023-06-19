import { Global, Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { databaseProviders, DBConnectionToken } from './database.provider';
@Global()
@Module({
  imports: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule implements OnApplicationShutdown {
  constructor(@Inject(DBConnectionToken) private dataSource: DataSource) {}
  async onApplicationShutdown() {
    await this.dataSource.destroy();
  }
}
