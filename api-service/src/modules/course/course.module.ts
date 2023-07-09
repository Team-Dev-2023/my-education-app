import { Module } from '@nestjs/common';
import { TopicModule } from '../topic/topic.module';
import { CourseController } from './course.controller';
import { courseProviders } from './course.provider';
import { CourseService } from './course.service';

@Module({
  imports: [TopicModule],
  controllers: [CourseController],
  providers: [...courseProviders, CourseService],
  exports: [CourseService],
})
export class CourseModule {}
