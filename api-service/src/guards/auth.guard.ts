import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as httpContext from 'express-http-context';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { UserService } from 'src/modules/user/user.service';
import { EUserRole, JwtPayload } from 'src/shared/constants/common.contants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      throw new BadRequestException('Authorization header is required');
    }

    const user: JwtPayload = httpContext.get('user');
    if (!user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    if (new Date(user.exp * 1000) < new Date()) {
      throw new UnauthorizedException('Token is expired');
    }

    const requiredRoles = this.getRouteRoles(context);
    if (!requiredRoles) {
      return true;
    }

    try {
      const currentUser = await this.userService.getUserByUuid(user.uuid);
      return requiredRoles.includes(currentUser.role);
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  private getRouteRoles(context: ExecutionContext): EUserRole[] | void {
    let routeRoles = this.reflector.get<EUserRole[] | void>(
      ROLES_KEY,
      context.getClass(),
    );
    if (!routeRoles) {
      routeRoles = this.reflector.get<EUserRole[] | void>(
        ROLES_KEY,
        context.getHandler(),
      );
    }

    return routeRoles;
  }
}
