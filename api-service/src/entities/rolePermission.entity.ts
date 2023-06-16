import { EAction, EUserRole } from 'src/shared/contants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role_permission' })
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'tinyint', default: EUserRole.student })
  role: EUserRole;

  @Column({ type: 'varchar', length: 100, nullable: false })
  module: string;

  @Column({ type: 'tinyint', enum: EAction })
  action: EAction;
}
