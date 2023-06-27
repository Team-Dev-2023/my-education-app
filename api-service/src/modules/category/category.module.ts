import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { categoryProvider } from './category.provider';
import { CategoryService } from './category.service';

@Module({
  imports: [],
  providers: [...categoryProvider, CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
