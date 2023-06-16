import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/shared/contants';
import { getJwtConfig } from 'src/shared/config.constant';

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
    console.log(payload);
    return { userId: payload.uuid, username: payload.username };
  }
}
