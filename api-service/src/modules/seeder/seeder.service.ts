import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  Category,
  Course,
  Lecture,
  Section,
  SubCategory,
  Topic,
} from 'src/entities';
import { DataSource } from 'typeorm';
import * as Categories from '../../../public/seeder/categories.json';
import * as SubCategories from '../../../public/seeder/sub-categories.json';
import * as Topics from '../../../public/seeder/topics.json';
import { DBConnectionToken } from '../database/database.provider';
import * as fs from 'fs';
import * as path from 'path';
import { CreateCourseInputDto } from '../course/dtos/input/create-course-input.dto';
@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @Inject(DBConnectionToken)
    private dataSource: DataSource,
  ) {}
  async onModuleInit() {
    await this.seedCateSubAndTopic();
    await this.seedCourses();
  }
  async seedCourses(): Promise<void> {
    const isSeeded = await this.dataSource
      .getRepository(Course)
      .findOne({ where: { imageUrl: 'https://ausdrucksstark-minute.com/' } });

    if (isSeeded) {
      return;
    }
    try {
      const insertedData = [];
      for (let i = 0; i < 200; i++) {
        const courseContent = fs.readFileSync(
          path.join(
            __dirname,
            `../../../`,
            `public/seeder/courses/output${i}.json`,
          ),
          {
            encoding: 'utf8',
          },
        );
        const courseContentJson = JSON.parse(
          courseContent,
        ) as CreateCourseInputDto;
        insertedData.push(
          this.dataSource.getRepository(Course).create({
            ...courseContentJson,
            ...(courseContentJson.sections && {
              sections: courseContentJson.sections.map(
                (section, sectionIndex) =>
                  ({
                    ...section,
                    ...(section.lectures && {
                      lectures: section.lectures.map(
                        (lecture, lectureIndex) =>
                          ({
                            ...lecture,
                            createdBy: 'superadmin',
                            position: lectureIndex,
                          } as Lecture),
                      ),
                    }),
                    createdBy: 'superadmin',
                    position: sectionIndex,
                  } as Section),
              ),
              ...(courseContentJson.courseKnowledgeList && {
                courseKnowledgeList: courseContentJson.courseKnowledgeList.map(
                  (knowledge) => knowledge,
                ),
              }),
              ...(courseContentJson.coursePrerequisiteList && {
                coursePrerequisiteList:
                  courseContentJson.coursePrerequisiteList.map(
                    (knowledge) => knowledge,
                  ),
              }),
              ...(courseContentJson.targetLearners && {
                targetLearners: courseContentJson.targetLearners.map(
                  (knowledge) => knowledge,
                ),
              }),
            }),
            createdBy: 'superadmin',
            topic: { uuid: courseContentJson.topicUuid },
          }),
        );
      }
      await this.dataSource.getRepository(Course).save(insertedData);
    } catch (error) {
      console.log(error);
    }
  }
  async seedCateSubAndTopic(): Promise<void> {
    const isSeeded = await this.dataSource.getRepository(Category).count();
    if (isSeeded) {
      return;
    }
    const newCategories = Categories.map((c) =>
      this.dataSource.getRepository(Category).create({
        name: c.name,
        uuid: String(c.uuid),
        createdBy: 'superadmin',
      }),
    );
    await this.dataSource.getRepository(Category).save(newCategories);

    const newSubCategories = SubCategories.map((sc) =>
      this.dataSource.getRepository(SubCategory).create({
        name: sc.name,
        uuid: String(sc.uuid),
        category: { uuid: String(sc.categoryUuid) },
        createdBy: 'superadmin',
      }),
    );
    await this.dataSource.getRepository(SubCategory).save(newSubCategories);

    const newTopics = Topics.map((t) =>
      this.dataSource.getRepository(Topic).create({
        name: t.name,
        uuid: String(t.uuid),
        subCategory: { uuid: String(t.subCategoryUuid) },
        createdBy: 'superadmin',
      }),
    );
    await this.dataSource.getRepository(Topic).save(newTopics);
    return;
  }
}
