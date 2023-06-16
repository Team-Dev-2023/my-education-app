import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [LoggerModule.forRoot(), DatabaseModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
