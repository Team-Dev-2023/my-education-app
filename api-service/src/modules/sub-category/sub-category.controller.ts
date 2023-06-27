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
import { IPaginatedReponse } from 'src/shared/helpers/paginate.helper';
import {
  CreateSubCategoryInputDto,
  GetAllSubcategoryQueryDto,
} from './dtos/sub-category-input.dto';
import { SubCategoryResponseDto } from './dtos/sub-category-response.dto';
import { SubCategoryService } from './sub-category.service';

@ApiTags('Sub Category')
@Controller({ path: 'sub-categories' })
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Post('')
  @ApiBearerAuth('Authorization')
  @Roles([EUserRole.superadmin, EUserRole.admin])
  @UseGuards(AuthGuard)
  async create(
    @UserParamDecorator() user: JwtPayload,
    @Query('categoryUuid') categoryUuid: string,
    @Body() data: CreateSubCategoryInputDto,
  ): Promise<SubCategoryResponseDto> {
    return this.subCategoryService.create(user, categoryUuid, data);
  }

  @Get('/:subCategoryUuid')
  async getOne(
    @Param('subCategoryUuid') subCategoryUuid: string,
  ): Promise<SubCategoryResponseDto> {
    return this.subCategoryService.getOne(subCategoryUuid);
  }

  @Delete('/:subCategoryUuid')
  @ApiBearerAuth('Authorization')
  @Roles([EUserRole.superadmin, EUserRole.admin])
  @UseGuards(AuthGuard)
  async deleteOne(
    @Param('subCategoryUuid') subCategoryUuid: string,
  ): Promise<SubCategoryResponseDto> {
    return this.subCategoryService.deleteOne(subCategoryUuid);
  }

  @Get('/')
  async getAll(
    @Query() query: GetAllSubcategoryQueryDto,
    @PaginationParamDecorator() pagination: IPagination,
  ): Promise<IPaginatedReponse<SubCategoryResponseDto>> {
    return this.subCategoryService.getAll(query, pagination);
  }
}
