import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Category, SubCategory, Topic } from 'src/entities';
import { IPagination, JwtPayload } from 'src/shared/constants/common.contants';
import { aliases, repoTokens } from 'src/shared/constants/repo-tokens.constant';
import {
  IPaginatedReponse,
  paginate,
} from 'src/shared/helpers/paginate.helper';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  CreateCategoryInputDto,
  CreateSubCategoryInputDto,
} from './dtos/category-input.dto';
import { CategoryResponseDto } from './dtos/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(repoTokens.category) private cateRepo: Repository<Category>,
    @Inject(repoTokens.subCategory)
    private subCateRepo: Repository<SubCategory>,
    @Inject(repoTokens.topic) private topicRepo: Repository<Topic>,
  ) {}
  private getFields() {
    return [
      `${aliases.category}.uuid`,
      `${aliases.category}.name`,
      `${aliases.category}.imageUrl`,
      `${aliases.category}.createdAt`,
      `${aliases.category}.createdBy`,
      `${aliases.category}.lastUpdatedAt`,
      `${aliases.category}.lastUpdatedBy`,
    ];
  }
  private getQuery(): SelectQueryBuilder<Category> {
    const query = this.cateRepo
      .createQueryBuilder(aliases.category)
      .select(this.getFields());
    return query;
  }
  private formatCategoryReponse(category: Category): CategoryResponseDto {
    return {
      uuid: category.uuid,
      name: category.name,
      imageUrl: category.imageUrl,
      createdAt: category.createdAt,
      createdBy: category.createdBy,
    } as CategoryResponseDto;
  }
  async create(
    user: JwtPayload,
    data: CreateCategoryInputDto,
  ): Promise<CategoryResponseDto> {
    const createdCategory = await this.cateRepo.save(
      this.cateRepo.create({
        ...data,
        createdBy: user.username,
      }),
    );
    return createdCategory;
  }

  async createSubCategory(
    user: JwtPayload,
    categoryUuid: string,
    data: CreateSubCategoryInputDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.cateRepo.findOne({
      where: { uuid: categoryUuid },
    });
    if (!category) {
      throw new BadRequestException(`Invalid category UUID`);
    }
    const createdSubCategory = await this.subCateRepo.save(
      this.subCateRepo.create({
        ...data,
        createdBy: user.username,
        category: {
          uuid: categoryUuid,
        },
      }),
    );
    return createdSubCategory;
  }
  async getAll(
    pagination: IPagination,
  ): Promise<IPaginatedReponse<CategoryResponseDto>> {
    const query = this.getQuery();
    const paginatedData = await paginate(
      query,
      { pagination },
      this.formatCategoryReponse,
    );
    return paginatedData;
  }
}
