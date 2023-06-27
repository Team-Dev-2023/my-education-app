import { Module } from '@nestjs/common';
import { SubCategoryModule } from '../sub-category/sub-category.module';
import { TopicController } from './topic.controller';
import { topicProvider } from './topic.provider';
import { TopicService } from './topic.service';

@Module({
  imports: [SubCategoryModule],
  providers: [...topicProvider, TopicService],
  controllers: [TopicController],
  exports: [TopicService],
})
export class TopicModule {}
