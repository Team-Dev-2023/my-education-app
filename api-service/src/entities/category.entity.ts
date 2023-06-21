import { BaseEntityAudit } from 'src/entities/base-entity-audit';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub-category.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  imageUrl: string;

  @OneToMany(() => SubCategory, (sub) => sub.category, { cascade: true })
  subCategories: SubCategory[];
}
