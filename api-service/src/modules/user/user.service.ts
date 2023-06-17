import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginMethod } from 'src/entities/login-method.entity';
import { User } from 'src/entities/user.entity';
import {
  ELoginMethod,
  IPagination,
} from 'src/shared/constants/common.contants';
import { Errors } from 'src/shared/constants/errors.constant';
import { aliases, repoTokens } from 'src/shared/constants/repo-tokens.constant';
import {
  IPaginatedReponse,
  paginate,
} from 'src/shared/helpers/paginate.helper';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { RegisterInputDto } from '../auth/dtos/auth-input.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(repoTokens.user) private userRepo: Repository<User>,
    @Inject(repoTokens.loginMethod)
    private loginMethodRepo: Repository<LoginMethod>,
  ) {}
  async create() {
    return 'lskd';
  }
  private getFields(): string[] {
    return [
      `${aliases.user}`,
      `${aliases.loginMethod}.username`,
      `${aliases.loginMethod}.method`,
      `${aliases.loginMethod}.isVerified`,
    ];
  }

  private getQuery(): SelectQueryBuilder<User> {
    return this.userRepo
      .createQueryBuilder(aliases.user)
      .leftJoin(`${aliases.user}.loginMethods`, aliases.loginMethod)
      .select(this.getFields());
  }

  private formatResponse(user: User): UserResponseDto {
    return {
      uuid: user.uuid,
      email: user.email,
      phone: user.phone,
      firstName: user?.firstName,
      lastName: user?.lastName,
      avatar: user?.avatar,
      country: user.country,
      role: user.role,
    };
  }

  async checkUsernameHasBeenUsedLoggedIn(
    username: string,
    method = ELoginMethod.password,
  ) {
    const isExisting = await this.loginMethodRepo.findOne({
      where: {
        username,
        method,
      },
    });
    if (isExisting) {
      throw new BadRequestException(Errors.USERNAME_IS_EXISTED);
    }
  }

  async createUserWithPasswordAuth(data: RegisterInputDto): Promise<User> {
    const createdUser = this.userRepo.create({
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      role: data.role,
      loginMethods: [
        {
          username: data.username,
          password: data.password,
          method: ELoginMethod.password,
          isVerified: true,
          verificationCode: '',
        },
      ],
      createdBy: data.username,
    });
    const insertedData = await this.userRepo.save(createdUser);
    return insertedData;
  }

  async updateUserRefreshToken(uuid: string, refreshToken: string) {
    await this.userRepo.update(
      {
        uuid,
      },
      { refreshToken },
    );
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepo.findOne({
      relations: ['loginMethods'],
      where: {
        loginMethods: [{ username }],
      },
    });
    if (!user) {
      throw new BadRequestException(Errors.INVALID_USERNAME);
    }

    const pwLoginCredential = user?.loginMethods.find(
      (method) => method.method === ELoginMethod.password,
    );
    return {
      ...this.formatResponse(user),
      username: pwLoginCredential?.username,
      password: pwLoginCredential?.password,
    };
  }

  async getAll(
    pagination: IPagination,
  ): Promise<IPaginatedReponse<UserResponseDto>> {
    const query = this.getQuery();
    const paginatedData = await paginate(
      query,
      { pagination },
      this.formatResponse,
    );
    return paginatedData;
  }
}
