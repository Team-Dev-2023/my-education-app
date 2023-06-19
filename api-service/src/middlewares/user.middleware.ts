import { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as httpContext from 'express-http-context';
import { JwtPayload } from 'src/shared/constants/common.contants';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    const accessToken = req.headers['authorization']
      ?.replace('Bearer', '')
      ?.trim();
    if (!accessToken) {
      return next();
    }
    let userPayload: JwtPayload;
    try {
      userPayload = (await this.jwtService.decode(accessToken)) as JwtPayload;
      httpContext.set('user', userPayload);
      return next();
    } catch (err) {
      // We dont care if the client do not send access token, will be rejected by guard
      return next();
    }
  }
}
