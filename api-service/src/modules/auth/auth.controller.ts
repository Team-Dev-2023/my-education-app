import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginInputDto, RegisterInputDto } from './dtos/auth-input.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() data: RegisterInputDto) {
    return this.authService.register(data);
  }

  @Post('/login')
  async login(@Body() data: LoginInputDto) {
    return this.authService.login(data);
  }
}
