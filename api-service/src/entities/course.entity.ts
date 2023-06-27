import { ECourseStatus } from 'src/shared/constants/common.contants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityAudit } from './base-entity-audit';
import { CourseKnowledge } from './course-knowledge.entity';
import { Section } from './section.entity';
import { Topic } from './topic.entity';

@Entity({ name: 'courses' })
export class Course extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  subTitle: string;

  @Column({ type: 'varchar', length: 5000, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  prerequisites: string;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  recommendation: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @Column({ type: 'tinyint', default: ECourseStatus.pending })
  status: ECourseStatus;

  @ManyToOne(() => Topic, (topic) => topic.uuid)
  @JoinColumn()
  topic: Topic;

  @OneToMany(() => CourseKnowledge, (ck) => ck.course, { cascade: true })
  courseKnowledgeList: CourseKnowledge[];

  @OneToMany(() => Section, (section) => section.course, { cascade: true })
  sections: Section[];
}
