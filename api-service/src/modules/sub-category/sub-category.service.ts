import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SubCategory } from 'src/entities';
import { IPagination, JwtPayload } from 'src/shared/constants/common.contants';
import { Errors } from 'src/shared/constants/errors.constant';
import { aliases, repoTokens } from 'src/shared/constants/repo-tokens.constant';
import {
  IPaginatedReponse,
  paginate,
} from 'src/shared/helpers/paginate.helper';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CategoryService } from '../category/category.service';
import {
  CreateSubCategoryInputDto,
  GetAllSubcategoryQueryDto,
} from './dtos/sub-category-input.dto';
import { SubCategoryResponseDto } from './dtos/sub-category-response.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @Inject(repoTokens.subCategory)
    private subCateRepo: Repository<SubCategory>,
    private cateService: CategoryService,
  ) {}
  private getFields() {
    return [
      `${aliases.subCategory}.uuid`,
      `${aliases.subCategory}.name`,
      `${aliases.subCategory}.imageUrl`,
      `${aliases.subCategory}.createdAt`,
      `${aliases.subCategory}.createdBy`,
      `${aliases.subCategory}.lastUpdatedAt`,
      `${aliases.subCategory}.lastUpdatedBy`,
    ];
  }
  private getQuery(): SelectQueryBuilder<SubCategory> {
    const query = this.subCateRepo
      .createQueryBuilder(aliases.subCategory)
      .select(this.getFields())
      .leftJoin(`${aliases.subCategory}.category`, aliases.category);
    return query;
  }
  private formatCategoryReponse(category: SubCategory): SubCategoryResponseDto {
    return {
      uuid: category.uuid,
      name: category.name,
      imageUrl: category.imageUrl,
      createdAt: category.createdAt,
      createdBy: category.createdBy,
    } as SubCategoryResponseDto;
  }

  async create(
    user: JwtPayload,
    categoryUuid: string,
    data: CreateSubCategoryInputDto,
  ): Promise<SubCategoryResponseDto> {
    const category = await this.cateService.getOne(categoryUuid);
    const createdSubCategory = await this.subCateRepo.save(
      this.subCateRepo.create({
        ...data,
        createdBy: user.username,
        category: {
          uuid: category.uuid,
        },
      }),
    );
    return this.formatCategoryReponse(createdSubCategory);
  }

  async getOne(categoryUuid: string): Promise<SubCategoryResponseDto> {
    const category = await this.subCateRepo.findOne({
      where: { uuid: categoryUuid },
    });
    if (!category) {
      throw new BadRequestException(Errors.INVALID_SUB_CATEGORY_UUID);
    }

    return this.formatCategoryReponse(category);
  }

  async deleteOne(categoryUuid: string): Promise<SubCategoryResponseDto> {
    const category = await this.subCateRepo.findOne({
      where: { uuid: categoryUuid },
    });
    if (!category) {
      throw new BadRequestException(Errors.INVALID_SUB_CATEGORY_UUID);
    }
    await this.subCateRepo.delete({ uuid: categoryUuid });
    return this.formatCategoryReponse(category);
  }

  async getAll(
    filter: GetAllSubcategoryQueryDto,
    pagination: IPagination,
  ): Promise<IPaginatedReponse<SubCategoryResponseDto>> {
    const query = this.getQuery();
    if (filter.categoryUuid) {
      query.where(`${aliases.category}.uuid = :categoryUuid`, {
        categoryUuid: filter.categoryUuid,
      });
    }
    const paginatedData = await paginate(
      query,
      { pagination },
      this.formatCategoryReponse,
    );
    return paginatedData;
  }
}
