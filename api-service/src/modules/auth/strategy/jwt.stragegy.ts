import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getJwtConfig } from 'src/shared/constants/config.constant';
import { JwtPayload } from 'src/shared/constants/common.contants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: getJwtConfig().accessTokenSecret,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('================', payload);
    return {
      userId: payload.uuid,
      username: payload.username,
      role: payload.role,
    };
  }
}
