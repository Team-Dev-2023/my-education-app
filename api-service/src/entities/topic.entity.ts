import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityAudit } from './base-entity-audit';
import { SubCategory } from './sub-category.entity';

@Entity({ name: 'topics' })
export class Topic extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  imageUrl: string;

  @ManyToOne(() => SubCategory, (sub) => sub.topics)
  @JoinColumn()
  subCategory: SubCategory;
}
