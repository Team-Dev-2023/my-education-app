import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginInputDto, RegisterInputDto } from './dtos/auth-input.dto';
import * as bcrypt from 'bcryptjs';
import { getJwtConfig } from 'src/shared/constants/config.constant';
import { RegisterResponseDto } from './dtos/auth-response.dto';
import * as countries from '../../../public/location/countries.json';
import { Errors } from 'src/shared/constants/errors.constant';
import { EUserRole, JwtPayload } from 'src/shared/constants/common.contants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(data: RegisterInputDto): Promise<RegisterResponseDto> {
    if ([EUserRole.admin, EUserRole.superadmin].includes(data.role)) {
      throw new BadRequestException(Errors.CANNOT_CREATE_ADMIN_ACCOUNT);
    }
    if (!countries.find((c) => c.value === data.country)) {
      throw new BadRequestException(Errors.INVALID_COUNTRY_CODE);
    }
    await this.userService.checkUsernameHasBeenUsedLoggedIn(data.username);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    const user = await this.userService.createUserWithPasswordAuth({
      ...data,
      password: hashPassword,
    });
    const { accessToken, refreshToken } = await this.generateTokens({
      username: data.username,
      uuid: user.uuid,
      role: user.role,
    });
    await this.userService.updateUserRefreshToken(user.uuid, refreshToken);
    delete data.password;
    return {
      ...data,
      accessToken,
      refreshToken,
    };
  }

  async login({
    username,
    password,
  }: LoginInputDto): Promise<RegisterResponseDto> {
    const user = await this.userService.getUserByUsername(username);
    const isMatchPassword = bcrypt.compareSync(password, user.password);
    if (!isMatchPassword) {
      throw new BadRequestException(Errors.INVALID_PASSWORD);
    }
    const { accessToken, refreshToken } = await this.generateTokens({
      uuid: user.uuid,
      username,
      role: user.role,
    });
    await this.userService.updateUserRefreshToken(user.uuid, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
  async generateTokens(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: getJwtConfig().accessTokenSecret,
        expiresIn: getJwtConfig().accessTokenExpiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: getJwtConfig().refreshTokenSecret,
        expiresIn: getJwtConfig().refreshTokenExpiresIn,
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
