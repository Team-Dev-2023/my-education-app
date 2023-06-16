import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller({ path: 'category' })
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post('/')
  async createOne() {
    return this.categoryService.create();
  }
}
