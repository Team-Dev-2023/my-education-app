import { BaseEntityAudit } from 'src/shared/baseEntity';
import { EUserRole } from 'src/shared/contants';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LoginMethod } from './loginMethod.entity';

@Entity({ name: 'users' })
export class User extends BaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 320, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  country: string;

  @Column({ type: 'tinyint', default: EUserRole.student })
  role: EUserRole;

  @Column({ type: 'varchar', length: 500, nullable: false })
  refreshToken: string;

  @OneToMany(() => LoginMethod, (loginMethods) => loginMethods.user, {
    cascade: true,
  })
  loginMethods: LoginMethod[];
}
