import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMiddleware } from './middlewares/user.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from './modules/database/database.module';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import {
  getJwtConfig,
  getPinoLoggerOptions,
} from './shared/constants/config.constant';
@Module({
  imports: [
    HealthModule,
    LoggerModule.forRoot(getPinoLoggerOptions()),
    JwtModule.register({
      global: true,
      secret: getJwtConfig().jwtSecret,
    }),
    DatabaseModule,
    CategoryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
