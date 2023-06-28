import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Course, CourseKnowledge, Lecture, Section } from 'src/entities';
import { IPagination, JwtPayload } from 'src/shared/constants/common.contants';
import { Errors } from 'src/shared/constants/errors.constant';
import { aliases, repoTokens } from 'src/shared/constants/repo-tokens.constant';
import {
  IPaginatedReponse,
  paginate,
} from 'src/shared/helpers/paginate.helper';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TopicService } from '../topic/topic.service';
import { CreateCourseInputDto } from './dtos/input/create-course-input.dto';
import { UpdateCourseInputDto } from './dtos/input/update-course-input.dto';
import { CourseReponseDto } from './dtos/response/course-response.dto';

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
      `${aliases.courseRecommendation}.uuid`,
      `${aliases.courseRecommendation}.description`,
    ];
  }
  private getQuery(): SelectQueryBuilder<Course> {
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
        `${aliases.course}.courseRecommendationList`,
        aliases.courseRecommendation,
      )
      .leftJoin(`${aliases.course}.sections`, aliases.section)
      .leftJoin(`${aliases.section}.lectures`, aliases.lecture);
    return query;
  }

  private formatResponse(course: Course): CourseReponseDto {
    return {
      uuid: course.uuid,
      title: course.title,
      subTitle: course.subTitle,
      description: course?.description,
      imageUrl: course?.imageUrl,
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
      courseRecommendationList: course?.courseRecommendationList?.map(
        (knowledge) => ({
          uuid: knowledge.uuid,
          description: knowledge.description,
        }),
      ),
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
        ...(data.courseRecommendationList && {
          courseRecommendationList: data.courseRecommendationList.map(
            (knowledge) => knowledge,
          ),
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
      where: { uuid: courseUuid },
    });
    if (!course) {
      throw new BadRequestException(Errors.INVALID_COURSE_UUID);
    }
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
        ...(data.courseRecommendationList && {
          courseRecommendationList: data.courseRecommendationList.map(
            (recommendation) => recommendation,
          ),
        }),
      }),
      lastUpdatedBy: user.username,
      lastUpdatedAt: new Date(),
    };
    await this.courseRepo.save(updatedData);
    return this.formatResponse(updatedData as any);
  }

  async getAll(
    pagination: IPagination,
  ): Promise<IPaginatedReponse<CourseReponseDto>> {
    const query = this.getQuery();
    const paginatedData = await paginate(
      query,
      { pagination },
      this.formatResponse,
    );
    return paginatedData as IPaginatedReponse<CourseReponseDto>;
  }
}
