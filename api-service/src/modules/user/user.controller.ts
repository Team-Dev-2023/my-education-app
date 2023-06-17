import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationParamDecorator } from 'src/decorators/pagination.decorator';
import { UserParamDecorator } from 'src/decorators/user.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { IPagination, JwtPayload } from 'src/shared/constants/common.contants';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-input.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'users' })
@ApiBearerAuth('Authorization')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/')
  async createOne() {
    return this.userService.create();
  }

  @Get('/profile')
  @UseGuards(JwtGuard)
  async profile(
    @UserParamDecorator() user: JwtPayload,
  ): Promise<UserResponseDto> {
    return this.userService.getUserByUsername(user.username);
  }

  @Get('/')
  @UseGuards(JwtGuard)
  async getAll(
    @Query() query: PaginationQueryDto,
    @PaginationParamDecorator() pagination: IPagination,
  ) {
    return this.userService.getAll(pagination);
  }
}
