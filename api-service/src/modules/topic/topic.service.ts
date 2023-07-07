import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Topic } from 'src/entities';
import { IPagination, JwtPayload } from 'src/shared/constants/common.contants';
import { Errors } from 'src/shared/constants/errors.constant';
import { aliases, repoTokens } from 'src/shared/constants/repo-tokens.constant';
import {
  IPaginatedReponse,
  paginate,
} from 'src/shared/helpers/paginate.helper';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { SubCategoryService } from '../sub-category/sub-category.service';
import {
  CreateTopicInputDto,
  GetAllTopicQueryDto,
} from './dtos/topic-input.dto';
import { TopicResponseDto } from './dtos/topic-response.dto';

@Injectable()
export class TopicService {
  constructor(
    @Inject(repoTokens.topic)
    private topicRepo: Repository<Topic>,
    private subCateService: SubCategoryService,
  ) {}
  private getFields() {
    return [
      `${aliases.topic}.uuid`,
      `${aliases.topic}.name`,
      `${aliases.topic}.imageUrl`,
      `${aliases.topic}.createdAt`,
      `${aliases.topic}.createdBy`,
      `${aliases.topic}.lastUpdatedAt`,
      `${aliases.topic}.lastUpdatedBy`,
    ];
  }
  private getQuery(): SelectQueryBuilder<Topic> {
    const query = this.topicRepo
      .createQueryBuilder(aliases.topic)
      .select(this.getFields())
      .leftJoin(`${aliases.topic}.subCategory`, aliases.subCategory);
    return query;
  }
  private formatCategoryReponse(topic: Topic): TopicResponseDto {
    return {
      uuid: topic.uuid,
      name: topic.name,
      imageUrl: topic.imageUrl,
      createdAt: topic.createdAt,
      createdBy: topic.createdBy,
    } as TopicResponseDto;
  }

  async create(
    user: JwtPayload,
    subCategoryUuid: string,
    data: CreateTopicInputDto,
  ): Promise<TopicResponseDto> {
    const subCategory = await this.subCateService.getOne(subCategoryUuid);
    const createdSubCategory = await this.topicRepo.save(
      this.topicRepo.create({
        ...data,
        createdBy: user.username,
        subCategory: {
          uuid: subCategory.uuid,
        },
      }),
    );
    return this.formatCategoryReponse(createdSubCategory);
  }

  async getOne(topicUuid: string): Promise<TopicResponseDto> {
    const topic = await this.topicRepo.findOne({
      where: { uuid: topicUuid },
    });
    if (!topic) {
      throw new BadRequestException(Errors.INVALID_TOPIC_UUID);
    }

    return this.formatCategoryReponse(topic);
  }

  async deleteOne(topicUuid: string): Promise<TopicResponseDto> {
    const category = await this.topicRepo.findOne({
      where: { uuid: topicUuid },
    });
    if (!category) {
      throw new BadRequestException(Errors.INVALID_TOPIC_UUID);
    }
    await this.topicRepo.delete({ uuid: topicUuid });
    return this.formatCategoryReponse(category);
  }

  async getAll(
    filter: GetAllTopicQueryDto,
    pagination: IPagination,
  ): Promise<IPaginatedReponse<TopicResponseDto>> {
    const query = this.getQuery();
    if (filter.subCategoryUuid) {
      query.where(`${aliases.subCategory}.uuid = :subCategoryUuid`, {
        subCategoryUuid: filter.subCategoryUuid,
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
