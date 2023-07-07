import { ELectureType } from 'src/shared/constants/common.contants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityAudit } from './base-entity-audit';
import { Section } from './section.entity';

@Entity({ name: 'lectures' })
export class Lecture extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  preview: boolean;

  @Column({ type: 'tinyint', default: ELectureType.video })
  type: ELectureType;

  @Column({ type: 'double', nullable: true })
  videoDuration: number;

  @Column({ type: 'int', nullable: false })
  position: number;

  @ManyToOne(() => Section, (section) => section.lectures)
  @JoinColumn()
  section: Section;
}
