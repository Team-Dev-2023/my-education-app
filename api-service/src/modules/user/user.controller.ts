import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationParamDecorator } from 'src/decorators/pagination.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserParamDecorator } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
import {
  EUserRole,
  IPagination,
  JwtPayload,
} from 'src/shared/constants/common.contants';
import { PaginatedReponse } from 'src/shared/dtos/paginatino-response.dto';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-input.dto';
import { IPaginatedReponse } from 'src/shared/helpers/paginate.helper';
import { CreateAdminUserInputDto } from './dtos/user-input.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'users' })
@ApiBearerAuth('Authorization')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/admin')
  @Roles([EUserRole.superadmin])
  @UseGuards(AuthGuard)
  @ApiResponse({
    type: UserResponseDto,
    description: 'Create Admin User',
    status: 201,
  })
  async createAdminUser(
    @UserParamDecorator() user: JwtPayload,
    @Body() data: CreateAdminUserInputDto,
  ): Promise<UserResponseDto> {
    return this.userService.createAdminUser(data, user.username);
  }

  @Get('/profile')
  @UseGuards(JwtGuard)
  @ApiResponse({
    type: UserResponseDto,
    description: 'Get user profile',
    status: 200,
  })
  async profile(
    @UserParamDecorator() user: JwtPayload,
  ): Promise<UserResponseDto> {
    return this.userService.getUserByUuid(user.uuid);
  }

  @Get('/')
  @UseGuards(JwtGuard)
  @ApiResponse({
    type: () => PaginatedReponse<UserResponseDto>,
    description: 'Get user profile',
    status: 200,
  })
  async getAll(
    @Query() query: PaginationQueryDto,
    @PaginationParamDecorator() pagination: IPagination,
  ): Promise<IPaginatedReponse<UserResponseDto>> {
    return this.userService.getAll(pagination);
  }
}
