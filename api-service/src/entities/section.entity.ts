import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityAudit } from './base-entity-audit';
import { Course } from './course.entity';
import { Lecture } from './lecture.entity';

@Entity({ name: 'sections' })
export class Section extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  position: number;

  @ManyToOne(() => Course, (course) => course.uuid)
  @JoinColumn()
  course: Course;

  @OneToMany(() => Lecture, (lecture) => lecture.section, { cascade: true })
  lectures: Lecture[];
}
