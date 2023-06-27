import { Course, CourseKnowledge, Lecture, Section } from 'src/entities';
import { repoTokens } from 'src/shared/constants/repo-tokens.constant';
import { DataSource } from 'typeorm';
import { DBConnectionToken } from '../database/database.provider';

export const courseProviders = [
  {
    provide: repoTokens.courseKnowledge,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CourseKnowledge),
    inject: [DBConnectionToken],
  },
  {
    provide: repoTokens.section,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Section),
    inject: [DBConnectionToken],
  },

  {
    provide: repoTokens.lecture,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lecture),
    inject: [DBConnectionToken],
  },
  {
    provide: repoTokens.course,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: [DBConnectionToken],
  },
];
