import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationParamDecorator } from 'src/decorators/pagination.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserParamDecorator } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  EUserRole,
  IPagination,
  JwtPayload,
} from 'src/shared/constants/common.contants';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-input.dto';
import { IPaginatedReponse } from 'src/shared/helpers/paginate.helper';
import { CategoryService } from './category.service';
import { CreateCategoryInputDto } from './dtos/category-input.dto';
import { CategoryResponseDto } from './dtos/category-response.dto';

@ApiTags('Category')
@Controller({ path: 'category' })
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post('/')
  @ApiBearerAuth('Authorization')
  @Roles([EUserRole.superadmin, EUserRole.admin])
  @UseGuards(AuthGuard)
  async createOne(
    @UserParamDecorator() user: JwtPayload,
    @Body() data: CreateCategoryInputDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.create(user, data);
  }

  @Get('/:categoryUuid')
  async getOne(
    @Param('categoryUuid') categoryUuid: string,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.getOne(categoryUuid);
  }

  @Delete('/:categoryUuid')
  @ApiBearerAuth('Authorization')
  async deleteOne(
    @Param('categoryUuid') categoryUuid: string,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.deleteOne(categoryUuid);
  }

  @Get('/')
  async getAll(
    @Query() query: PaginationQueryDto,
    @PaginationParamDecorator() pagination: IPagination,
  ): Promise<IPaginatedReponse<CategoryResponseDto>> {
    return this.categoryService.getAll(pagination);
  }
}
