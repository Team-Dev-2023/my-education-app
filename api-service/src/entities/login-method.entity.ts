import { ELoginMethod } from 'src/shared/constants/common.contants';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'login_methods' })
export class LoginMethod {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Index('idx_login_methods_username')
  @Column({ type: 'varchar', length: 256, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  password: string;

  @Column({ type: 'tinyint', default: ELoginMethod.password })
  method: ELoginMethod;

  @Column({ type: 'boolean', nullable: true })
  isVerified: boolean;

  @Column({ type: 'varchar', length: 10, nullable: true })
  verificationCode: string;

  @ManyToOne(() => User, (user) => user.loginMethods)
  @JoinColumn({ name: 'userUuid' })
  user: User;
}
