import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMiddleware } from './middlewares/user.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CourseModule } from './modules/course/course.module';
import { DatabaseModule } from './modules/database/database.module';
import { FileUploaderModule } from './modules/file-uploader/file-uploader.module';
import { HealthModule } from './modules/health/health.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { TopicModule } from './modules/topic/topic.module';
import { UserModule } from './modules/user/user.module';
import { SERVICE_CONFIG } from './shared/constants/common.contants';
import {
  getJwtConfig,
  getPinoLoggerOptions,
} from './shared/constants/config.constant';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', '/public/upload'),
      serveRoot: `/${SERVICE_CONFIG.baseUrl}/public/upload`,
    }),
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
    SubCategoryModule,
    TopicModule,
    FileUploaderModule,
    SeederModule,
    CourseModule,
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
