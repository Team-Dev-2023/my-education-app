import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityAudit } from './base-entity-audit';
import { Category } from './category.entity';
import { Topic } from './topic.entity';

@Entity({ name: 'sub_categories' })
export class SubCategory extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  imageUrl: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  @JoinColumn()
  category: Category;

  @OneToMany(() => Topic, (topic) => topic.subCategory, { cascade: true })
  topics: Topic[];
}
