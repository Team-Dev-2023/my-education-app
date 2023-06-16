import { BaseEntityAudit } from 'src/shared/baseEntity';
import { ELoginMethod } from 'src/shared/contants';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'login_methods' })
export class LoginMethod extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  username: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
        password: string;

  @Column({ type: 'tinyint', default: ELoginMethod.password })
  role: ELoginMethod;

  @Column({ type: 'boolean', nullable: true })
  isVerified: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  verificationCode: string;

  @ManyToOne(() => User, (user) => user.loginMethods, { nullable: false })
  @JoinColumn({ name: 'userUuid' })
  user: User;
}
