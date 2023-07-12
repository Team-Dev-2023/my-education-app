import { Column } from 'typeorm';
import { Audit } from './audit.entity';

export class BaseEntityAudit extends Audit {
  @Column({ type: 'varchar', length: 500, nullable: false })
  createdBy: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  lastUpdatedBy: string;
}
