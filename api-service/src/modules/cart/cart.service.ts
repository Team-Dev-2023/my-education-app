import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cart } from 'src/entities';
import { IPagination, JwtPayload } from 'src/shared/constants/common.contants';
import { aliases, repoTokens } from 'src/shared/constants/repo-tokens.constant';
import { PaginatedReponse } from 'src/shared/dtos/paginatino-response.dto';
import { paginate } from 'src/shared/helpers/paginate.helper';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CourseService } from '../course/course.service';
import { AddToCartInputDto } from './dtos/input/add-to-cart-input.dto';
import { CartReponseDto } from './dtos/response/cart-response.dto';

@Injectable()
export class CartService {
  private logger: Logger = new Logger(CartService.name);
  constructor(
    @Inject(repoTokens.cart) private cartRepo: Repository<Cart>,
    private courseService: CourseService,
  ) {}

  private formatResponse(cart: Cart): CartReponseDto {
    return {
      course: {
        uuid: cart.course.uuid,
        title: cart.course.title,
        price: cart.course.price,
        priceAfterDiscount: cart.course.price,
        subTitle: cart.course.subTitle,
        imageUrl: cart.course.imageUrl,
        topic: cart.course.topic,
        courseKnowledgeList: cart.course.courseKnowledgeList,
      },
      quantity: cart.quantity,
    };
  }
  private getFields() {
    return [
      `${aliases.cart}.quantity`,
      `${aliases.cart}.courseUuid`,
      `${aliases.cart}.userUuid`,
      `${aliases.cart}.createdAt`,
      `${aliases.course}.uuid`,
      `${aliases.course}.title`,
      `${aliases.course}.price`,
      `${aliases.course}.subTitle`,
      `${aliases.course}.description`,
      `${aliases.course}.imageUrl`,
      `${aliases.course}.createdAt`,
      `${aliases.course}.createdBy`,
      `${aliases.course}.lastUpdatedAt`,
      `${aliases.course}.lastUpdatedBy`,
      `${aliases.topic}.uuid`,
      `${aliases.topic}.name`,
      `${aliases.subCategory}.uuid`,
      `${aliases.subCategory}.name`,
      `${aliases.category}.uuid`,
      `${aliases.category}.name`,
      `${aliases.courseKnowledge}.uuid`,
      `${aliases.courseKnowledge}.description`,
    ];
  }
  private getQuery(): SelectQueryBuilder<Cart> {
    const query = this.cartRepo
      .createQueryBuilder(aliases.cart)
      .select(this.getFields())
      .leftJoin(`${aliases.cart}.course`, aliases.course)
      .leftJoin(`${aliases.course}.topic`, aliases.topic)
      .leftJoin(`${aliases.topic}.subCategory`, aliases.subCategory)
      .leftJoin(`${aliases.subCategory}.category`, aliases.category)
      .leftJoin(
        `${aliases.course}.courseKnowledgeList`,
        aliases.courseKnowledge,
      );
    return query;
  }
  async addToCart(
    user: JwtPayload,
    data: AddToCartInputDto,
  ): Promise<CartReponseDto> {
    const course = await this.courseService.getOne(data?.courseUuid);

    const newRecord = await this.cartRepo.create({
      quantity: 1,
      course: course,
      userUuid: user.uuid,
    });
    await this.cartRepo.save(newRecord);
    return this.formatResponse(newRecord);
  }

  async removeFromCart(
    user: JwtPayload,
    data: AddToCartInputDto,
  ): Promise<CartReponseDto> {
    const isExisted = await this.cartRepo.findOne({
      relations: { course: { courseKnowledgeList: true, topic: true } },
      where: { userUuid: user.uuid, courseUuid: data.courseUuid },
    });
    if (!isExisted) {
      throw new BadRequestException(`Course does not exist in cart`);
    }
    try {
      await this.cartRepo.delete({
        userUuid: user.uuid,
        courseUuid: data.courseUuid,
      });
      return this.formatResponse(isExisted);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getMyCartList(
    user: JwtPayload,
    pagination: IPagination,
  ): Promise<PaginatedReponse<CartReponseDto>> {
    const query = this.getQuery();
    if (user.uuid) {
      query.where(`${aliases.cart}.userUuid = :userUuid`, {
        userUuid: user.uuid,
      });
    }
    query.orderBy(`${aliases.cart}.createdAt`, 'DESC');
    const paginatedData = (await paginate(
      query,
      { pagination },
      this.formatResponse,
    )) as PaginatedReponse<CartReponseDto>;
    return paginatedData;
  }
}
