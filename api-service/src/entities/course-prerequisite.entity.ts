import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity({ name: 'course_prerequisite' })
export class CoursePrerequisite {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;

  @ManyToOne(() => Course, (course) => course.uuid)
  @JoinColumn()
  course: Course;
}
