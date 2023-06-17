import { BaseEntityAudit } from 'src/shared/base-entity-audit';
import { EUserRole } from 'src/shared/constants/common.contants';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LoginMethod } from './login-method.entity';

@Entity({ name: 'users' })
export class User extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 320, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  country: string;

  @Column({ type: 'tinyint', default: EUserRole.student })
  role: EUserRole;

  @Column({ type: 'varchar', length: 500, nullable: true })
  refreshToken: string;

  @OneToMany(() => LoginMethod, (loginMethods) => loginMethods.user, {
    cascade: true,
  })
  loginMethods: LoginMethod[];
}
