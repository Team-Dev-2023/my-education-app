import { BaseEntityAudit } from 'src/entities/base-entity-audit';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Category extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  image: string;
}
