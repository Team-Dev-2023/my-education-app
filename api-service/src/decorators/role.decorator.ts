import { SetMetadata } from '@nestjs/common';
import { EUserRole } from 'src/shared/constants/common.contants';

export const ROLES_KEY = 'roles';
export const Roles = (roles: EUserRole[]) => SetMetadata(ROLES_KEY, roles);
