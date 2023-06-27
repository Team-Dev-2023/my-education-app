import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/entities';
import { IPagination, JwtPayload } from 'src/shared/constants/common.contants';
import { Errors } from 'src/shared/constants/errors.constant';
import { aliases, repoTokens } from 'src/shared/constants/repo-tokens.constant';
import {
  IPaginatedReponse,
  paginate,
} from 'src/shared/helpers/paginate.helper';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateCategoryInputDto } from './dtos/category-input.dto';
import { CategoryResponseDto } from './dtos/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(repoTokens.category) private cateRepo: Repository<Category>,
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
    return this.formatCategoryReponse(createdCategory);
  }
  async getOne(categoryUuid: string): Promise<CategoryResponseDto> {
    const category = await this.cateRepo.findOne({
      where: { uuid: categoryUuid },
    });
    if (!category) {
      throw new BadRequestException(Errors.INVALID_CATEGORY_UUID);
    }

    return this.formatCategoryReponse(category);
  }

  async deleteOne(categoryUuid: string): Promise<CategoryResponseDto> {
    const category = await this.cateRepo.findOne({
      where: { uuid: categoryUuid },
    });
    if (!category) {
      throw new BadRequestException(Errors.INVALID_CATEGORY_UUID);
    }
    await this.cateRepo.delete({ uuid: categoryUuid });
    return this.formatCategoryReponse(category);
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
