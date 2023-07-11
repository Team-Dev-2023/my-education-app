import { Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { CartController } from './cart.controller';
import { cartProviders } from './cart.provider';
import { CartService } from './cart.service';

@Module({
  imports: [UserModule, CourseModule],
  controllers: [CartController],
  providers: [...cartProviders, CartService],
})
export class CartModule {}
