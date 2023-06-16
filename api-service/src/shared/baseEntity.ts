import { Column } from 'typeorm';

export class BaseEntityAudit {
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdatedAt: Date;

  @Column({ type: 'varchar', length: 500, nullable: false })
  createdBy: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  lastUpdatedBy: string;
}
