import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserParamDecorator } from 'src/decorators/user.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { JwtPayload } from 'src/shared/contants';
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
}
