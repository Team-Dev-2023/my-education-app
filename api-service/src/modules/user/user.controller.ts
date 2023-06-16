import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'users' })
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/')
  async createOne() {
    return this.userService.create();
  }
}
