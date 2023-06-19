import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { DataSource } from 'typeorm';
import { DBConnectionToken } from '../database/database.provider';

@Controller()
@ApiTags('Health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly typeormCheck: TypeOrmHealthIndicator,
    @Inject(DBConnectionToken) private dataSource: DataSource,
  ) {}

  @Get('health')
  @HealthCheck()
  async check() {
    return this.healthCheckService.check([
      async () =>
        this.typeormCheck.pingCheck('db', {
          connection: this.dataSource.manager.connection,
        }),
    ]);
  }
}
