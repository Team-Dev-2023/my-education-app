import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationParamDecorator } from 'src/decorators/pagination.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserParamDecorator } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  EUserRole,
  IPagination,
  JwtPayload,
} from 'src/shared/constants/common.contants';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-input.dto';
import { IPaginatedReponse } from 'src/shared/helpers/paginate.helper';
import { CartService } from './cart.service';
import { AddToCartInputDto } from './dtos/input/add-to-cart-input.dto';
import { RemoveFromCartInputDto } from './dtos/input/remove-from-cart-input.dto';
import { CartReponseDto } from './dtos/response/cart-response.dto';

@Controller({ path: 'cart' })
@ApiBearerAuth('Authorization')
@ApiTags('Cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles([EUserRole.student, EUserRole.lecturer])
  async addToCart(
    @UserParamDecorator() user: JwtPayload,
    @Body() data: AddToCartInputDto,
  ) {
    return this.cartService.addToCart(user, data);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @Roles([EUserRole.student, EUserRole.lecturer])
  async removeFromCart(
    @UserParamDecorator() user: JwtPayload,
    @Body() data: RemoveFromCartInputDto,
  ) {
    return this.cartService.removeFromCart(user, data);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @Roles([EUserRole.student, EUserRole.lecturer])
  async myCart(
    @UserParamDecorator() user: JwtPayload,
    @Query() paginationQuery: PaginationQueryDto,
    @PaginationParamDecorator() pagination: IPagination,
  ): Promise<IPaginatedReponse<CartReponseDto>> {
    return this.cartService.getMyCartList(user, pagination);
  }
}
