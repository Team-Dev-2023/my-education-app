import { BeforeInsert, Column } from 'typeorm';

export class BaseEntityAudit {
  @Column({
    type: 'timestamp',
    default: () => new Date(),
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => new Date(),
  })
  lastUpdatedAt: Date;

  @Column({ type: 'varchar', length: 500, nullable: false })
  createdBy: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  lastUpdatedBy: string;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
