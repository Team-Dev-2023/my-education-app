import { BeforeInsert, Column } from 'typeorm';

export class Audit {
  @Column({
    type: 'timestamp',
    default: new Date(),
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: new Date(),
  })
  lastUpdatedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.lastUpdatedAt = new Date();
  }
}
