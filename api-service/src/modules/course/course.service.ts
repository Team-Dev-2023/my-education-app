import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Course, CourseKnowledge, Lecture, Section, User } from 'src/entities';
import { IPagination, JwtPayload } from 'src/shared/constants/common.contants';
import { Errors } from 'src/shared/constants/errors.constant';
import { aliases, repoTokens } from 'src/shared/constants/repo-tokens.constant';
import {
  getCreatedByUser,
  IPaginatedReponse,
  paginate,
} from 'src/shared/helpers/paginate.helper';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TopicService } from '../topic/topic.service';
import { CreateCourseInputDto } from './dtos/input/create-course-input.dto';
import { GetAllCourseInputDto } from './dtos/input/query-course-input.dto';
import { UpdateCourseInputDto } from './dtos/input/update-course-input.dto';
import {
  CourseMinimizeResponseDto,
  CourseReponseDto,
} from './dtos/response/course-response.dto';

export type CourseAdditionInfo = { createdByUser?: User };
@Injectable()
export class CourseService {
  constructor(
    @Inject(repoTokens.course) private courseRepo: Repository<Course>,
    @Inject(repoTokens.section) private sectionRepo: Repository<Section>,
    @Inject(repoTokens.lecture) private lectureRepo: Repository<Lecture>,
    @Inject(repoTokens.courseKnowledge)
    private courseKnowledgeRepo: Repository<CourseKnowledge>,
    private topicService: TopicService,
  ) {}
  private getFields() {
    return [
      `${aliases.course}.uuid`,
      `${aliases.course}.title`,
      `${aliases.course}.price`,
      `${aliases.course}.subTitle`,
      `${aliases.course}.description`,
      `${aliases.course}.imageUrl`,
      `${aliases.course}.createdAt`,
      `${aliases.course}.createdBy`,
      `${aliases.course}.lastUpdatedAt`,
      `${aliases.course}.lastUpdatedBy`,
      `${aliases.topic}.uuid`,
      `${aliases.topic}.name`,
      `${aliases.subCategory}.uuid`,
      `${aliases.subCategory}.name`,
      `${aliases.category}.uuid`,
      `${aliases.category}.name`,
      `${aliases.courseKnowledge}.uuid`,
      `${aliases.courseKnowledge}.description`,
      `${aliases.section}.uuid`,
      `${aliases.section}.name`,
      `${aliases.section}.position`,
      `${aliases.lecture}.uuid`,
      `${aliases.lecture}.name`,
      `${aliases.lecture}.position`,
      `${aliases.lecture}.url`,
      `${aliases.lecture}.description`,
      `${aliases.lecture}.preview`,
      `${aliases.lecture}.type`,
      `${aliases.lecture}.videoDuration`,
      `${aliases.coursePrerequisite}.uuid`,
      `${aliases.coursePrerequisite}.description`,
      `${aliases.courseTargetLearners}.uuid`,
      `${aliases.courseTargetLearners}.description`,
    ];
  }
  private getQuery(): SelectQueryBuilder<Course & CourseAdditionInfo> {
    const query = this.courseRepo
      .createQueryBuilder(aliases.course)
      .select(this.getFields())
      .leftJoin(`${aliases.course}.topic`, aliases.topic)
      .leftJoin(`${aliases.topic}.subCategory`, aliases.subCategory)
      .leftJoin(`${aliases.subCategory}.category`, aliases.category)
      .leftJoin(
        `${aliases.course}.courseKnowledgeList`,
        aliases.courseKnowledge,
      )
      .leftJoin(
        `${aliases.course}.coursePrerequisiteList`,
        aliases.coursePrerequisite,
      )
      .leftJoin(
        `${aliases.course}.targetLearners`,
        aliases.courseTargetLearners,
      )
      .leftJoin(`${aliases.course}.sections`, aliases.section)
      .leftJoin(`${aliases.section}.lectures`, aliases.lecture);
    return query;
  }

  private formatResponse(
    course: Course & CourseAdditionInfo,
  ): CourseReponseDto {
    return {
      uuid: course.uuid,
      title: course.title,
      subTitle: course.subTitle,
      description: course?.description,
      imageUrl: course?.imageUrl,
      price: course?.price,
      priceAfterDiscount: course?.price,
      topic: {
        uuid: course?.topic?.uuid,
        name: course?.topic?.name,
        imageUrl: course?.topic?.imageUrl,
      },
      category: {
        uuid: course?.topic?.subCategory?.category?.uuid,
        name: course?.topic?.subCategory?.category?.name,
      },
      subCategory: {
        uuid: course?.topic?.subCategory?.uuid,
        name: course?.topic?.subCategory?.name,
      },
      courseKnowledgeList: course?.courseKnowledgeList?.map((knowledge) => ({
        uuid: knowledge.uuid,
        description: knowledge.description,
      })),
      sections: course?.sections?.map((section) => ({
        uuid: section.uuid,
        name: section.name,
        position: section.position,
        lectures: section?.lectures?.map((lecture) => ({
          uuid: lecture.uuid,
          name: lecture.name,
          url: lecture.url,
          description: lecture.description,
          preview: lecture.preview,
          type: lecture.type,
          videoDuration: lecture.videoDuration,
          position: lecture.position,
        })),
      })),
      createdAt: course.createdAt,
      lastUpdatedAt: course.lastUpdatedAt,
      createdBy: course.createdBy,
      lastUpdatedBy: course.lastUpdatedBy,
      coursePrerequisiteList: course?.coursePrerequisiteList?.map(
        (knowledge) => ({
          uuid: knowledge.uuid,
          description: knowledge.description,
        }),
      ),
      targetLearners: course?.targetLearners?.map((knowledge) => ({
        uuid: knowledge.uuid,
        description: knowledge.description,
      })),
      ...(course?.createdByUser && {
        lecturer: {
          uuid: course.createdByUser?.uuid,
          firstName: course.createdByUser?.firstName,
          lastName: course.createdByUser?.lastName,
        },
      }),
    };
  }

  private formatMinimizeResponse(
    course: Course & CourseAdditionInfo,
  ): CourseMinimizeResponseDto {
    return {
      uuid: course.uuid,
      title: course.title,
      subTitle: course.subTitle,
      imageUrl: course?.imageUrl,
      price: course?.price,
      priceAfterDiscount: course?.price,
      topic: {
        uuid: course?.topic?.uuid,
        name: course?.topic?.name,
        imageUrl: course?.topic?.imageUrl,
      },
      courseKnowledgeList: course?.courseKnowledgeList?.map((knowledge) => ({
        uuid: knowledge.uuid,
        description: knowledge.description,
      })),
      createdAt: course.createdAt,
      lastUpdatedAt: course.lastUpdatedAt,
      createdBy: course.createdBy,
      lastUpdatedBy: course.lastUpdatedBy,
      ...(course?.createdByUser && {
        lecturer: {
          uuid: course.createdByUser?.uuid,
          firstName: course.createdByUser?.firstName,
          lastName: course.createdByUser?.lastName,
        },
      }),
    };
  }

  async createOne(
    user: JwtPayload,
    data: CreateCourseInputDto,
  ): Promise<CourseReponseDto> {
    const topic = await this.topicService.getOne(data.topicUuid);

    const insertedData = this.courseRepo.create({
      ...data,
      ...(data.sections && {
        sections: data.sections.map(
          (section, sectionIndex) =>
            ({
              ...section,
              ...(section.lectures && {
                lectures: section.lectures.map(
                  (lecture, lectureIndex) =>
                    ({
                      ...lecture,
                      createdBy: user.username,
                      position: lectureIndex,
                    } as Lecture),
                ),
              }),
              createdBy: user.username,
              position: sectionIndex,
            } as Section),
        ),
        ...(data.courseKnowledgeList && {
          courseKnowledgeList: data.courseKnowledgeList.map(
            (knowledge) => knowledge,
          ),
        }),
        ...(data.coursePrerequisiteList && {
          coursePrerequisiteList: data.coursePrerequisiteList.map(
            (knowledge) => knowledge,
          ),
        }),
        ...(data.targetLearners && {
          targetLearners: data.targetLearners.map((knowledge) => knowledge),
        }),
      }),
      createdBy: user.username,
      topic,
    });
    await this.courseRepo.save(insertedData);
    return this.formatResponse(insertedData);
  }

  async getOne(courseUuid: string): Promise<CourseReponseDto> {
    const course = await this.getQuery()
      .where(`${aliases.course}.uuid = :courseUuid`, { courseUuid })
      .getOne();

    if (!course) {
      throw new BadRequestException(Errors.INVALID_COURSE_UUID);
    }

    const [createdByUser] = await getCreatedByUser(this.getQuery(), [
      course.createdBy,
    ]);
    course.createdByUser = createdByUser;

    return this.formatResponse(course);
  }

  async deleteOne(courseUuid: string): Promise<CourseReponseDto> {
    const course = await this.courseRepo.findOne({
      where: { uuid: courseUuid },
    });
    if (!course) {
      throw new BadRequestException(Errors.INVALID_COURSE_UUID);
    }
    await this.courseRepo.delete({ uuid: courseUuid });
    return this.formatResponse(course);
  }

  async update(
    user: JwtPayload,
    courseUuid: string,
    data: UpdateCourseInputDto,
  ): Promise<CourseReponseDto> {
    const course = await this.courseRepo.findOne({
      relations: {
        courseKnowledgeList: true,
        coursePrerequisiteList: true,
        targetLearners: true,
      },
      where: { uuid: courseUuid, createdBy: user.username },
    });
    if (!course) {
      throw new BadRequestException(Errors.INVALID_COURSE_UUID);
    }
    const topic = await this.topicService.getOne(data.topicUuid);
    const queryRunner =
      await this.courseRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(Lecture)
        .createQueryBuilder(aliases.lecture)
        .leftJoin(`${aliases.lecture}.section`, aliases.section)
        .delete()
        .where((qb) => {
          const subQuery = qb
            .createQueryBuilder()
            .select(`s.uuid`)
            .from(Section, 's')
            .leftJoin(Course, 'c', 's.courseUuid = c.uuid')
            .where(`c.uuid = :courseUuid`)
            .getQuery();
          return `${aliases.section}.uuid IN (${subQuery})`;
        })
        .setParameters({ courseUuid })
        .execute();
      const updatedData = {
        ...course,
        ...data,
        ...(data.sections && {
          sections: data.sections.map(
            (section, sectionIndex) =>
              ({
                ...section,
                ...(section.lectures && {
                  lectures: section.lectures.map(
                    (lecture, lectureIndex) =>
                      ({
                        ...lecture,
                        ...(!lecture?.createdAt && { createdAt: new Date() }),
                        ...(!lecture?.lastUpdatedAt && {
                          lastUpdatedAt: new Date(),
                        }),
                        ...(!lecture?.createdBy && {
                          createdBy: user.username,
                        }),
                        lastUpdatedBy: user.username,
                        position: lectureIndex,
                      } as Lecture),
                  ),
                }),
                ...(!section?.createdAt && { createdAt: new Date() }),
                ...(!section?.lastUpdatedAt && { lastUpdatedAt: new Date() }),
                ...(!section?.createdBy && {
                  createdBy: user.username,
                }),
                lastUpdatedBy: user.username,
                position: sectionIndex,
              } as Section),
          ),
          ...(data.courseKnowledgeList && {
            courseKnowledgeList: data.courseKnowledgeList.map(
              (knowledge) => knowledge,
            ),
          }),
          ...(data.coursePrerequisiteList && {
            coursePrerequisiteList: data.coursePrerequisiteList.map(
              (prerequisite) => prerequisite,
            ),
          }),
          ...(data.targetLearners && {
            targetLearners: data.targetLearners.map(
              (recommendation) => recommendation,
            ),
          }),
        }),
        lastUpdatedBy: user.username,
        lastUpdatedAt: new Date(),
        ...(topic && { topic }),
      };
      await queryRunner.manager.getRepository(Course).save(updatedData);
      await queryRunner.commitTransaction();
      return this.formatResponse(updatedData as any);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getAll(
    filters: GetAllCourseInputDto,
    pagination: IPagination,
  ): Promise<IPaginatedReponse<CourseMinimizeResponseDto>> {
    const query = this.getQuery();
    if (filters?.categoryUuid) {
      query.andWhere(`${aliases.category}.uuid = :categoryUuid`, {
        categoryUuid: filters.categoryUuid,
      });
    }
    if (filters?.subCategoryUuid) {
      query.andWhere(`${aliases.subCategory}.uuid = :subCategoryUuid`, {
        subCategoryUuid: filters.subCategoryUuid,
      });
    }
    if (filters?.topicUuid) {
      query.andWhere(`${aliases.topic}.uuid = :topicUuid`, {
        topicUuid: filters.topicUuid,
      });
    }
    if (filters?.categoryName) {
      query.andWhere(`LOWER(${aliases.category}.name) = :categoryName`, {
        categoryName: filters.categoryName.toLowerCase(),
      });
    }
    if (filters?.subCategoryName) {
      query.andWhere(`LOWER(${aliases.subCategory}.name) = :subCategoryName`, {
        subCategoryName: filters.subCategoryName.toLowerCase(),
      });
    }
    if (filters?.topicName) {
      query.andWhere(`LOWER(${aliases.topic}.name) = :topicName`, {
        topicName: filters.topicName.toLowerCase(),
      });
    }
    const paginatedData = await paginate(
      query,
      { pagination, selectCreatedBy: true },
      this.formatMinimizeResponse,
    );
    return paginatedData as IPaginatedReponse<CourseMinimizeResponseDto>;
  }
}
