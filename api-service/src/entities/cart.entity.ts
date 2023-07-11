import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity({ name: 'cart' })
export class Cart extends Audit {
  @PrimaryColumn({ type: 'varchar', length: 36, nullable: false })
  courseUuid: string;

  @ManyToOne(() => Course, (c) => c.uuid)
  @JoinColumn({ name: 'courseUuid' })
  course: Course;

  @PrimaryColumn({ type: 'varchar', length: 36, nullable: false })
  userUuid: string;

  @ManyToOne(() => User, (c) => c.uuid)
  @JoinColumn({ name: 'userUuid' })
  user: User;

  @Column({ type: 'integer', nullable: false, default: 1 })
  quantity: number;
}
