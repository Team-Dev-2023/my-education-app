import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { SubCategoryController } from './sub-category.controller';
import { subCategoryProvider } from './sub-category.provider';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [CategoryModule],
  providers: [...subCategoryProvider, SubCategoryService],
  controllers: [SubCategoryController],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}
