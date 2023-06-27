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
      `${aliases.course}.prerequisites`,
      `${aliases.course}.recommendation`,
      `${aliases.course}.imageUrl`,
      `${aliases.course}.createdAt`,
      `${aliases.course}.createdBy`,
      `${aliases.course}.lastUpdatedAt`,
      `${aliases.course}.lastUpdatedBy`,
      `${aliases.topic}.uuid`,
      `${aliases.topic}.name`,
      `${aliases.topic}.imageUrl`,
      `${aliases.topic}.createdAt`,
      `${aliases.topic}.createdBy`,
      `${aliases.topic}.lastUpdatedAt`,
      `${aliases.topic}.lastUpdatedBy`,
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
    ];
  }
  private getQuery(): SelectQueryBuilder<Course> {
    const query = this.courseRepo
      .createQueryBuilder(aliases.course)
      .select(this.getFields())
      .leftJoin(`${aliases.course}.topic`, aliases.topic)
      .leftJoin(
        `${aliases.course}.courseKnowledgeList`,
        aliases.courseKnowledge,
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
      prerequisites: course?.prerequisites,
      recommendation: course?.recommendation,
      imageUrl: course?.imageUrl,
      topic: {
        uuid: course?.topic?.uuid,
        name: course?.topic?.name,
        imageUrl: course?.topic?.imageUrl,
        createdAt: course?.topic?.createdAt,
        lastUpdatedAt: course?.topic?.lastUpdatedAt,
        createdBy: course?.topic?.createdBy,
        lastUpdatedBy: course?.topic?.lastUpdatedBy,
      },
      courseKnowledge: course?.courseKnowledgeList?.map((knowledge) => ({
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
        ...(data.courseKnowledge && {
          courseKnowledgeList: data.courseKnowledge.map(
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
    const course = await this.courseRepo.findOne({
      relations: {
        sections: {
          lectures: true,
        },
        courseKnowledgeList: true,
        topic: true,
      },
      where: { uuid: courseUuid },
    });
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
        ...(data.courseKnowledge && {
          courseKnowledgeList: data.courseKnowledge.map(
            (knowledge) => knowledge,
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
