import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { IPaginatedReponse } from 'src/shared/helpers/paginate.helper';
import {
  CreateTopicInputDto,
  GetAllTopicQueryDto,
} from './dtos/topic-input.dto';
import { TopicResponseDto } from './dtos/topic-response.dto';
import { TopicService } from './topic.service';

@ApiTags('Topics')
@Controller({ path: 'topics' })
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Post('')
  @ApiBearerAuth('Authorization')
  @Roles([EUserRole.superadmin, EUserRole.admin])
  @UseGuards(AuthGuard)
  async create(
    @UserParamDecorator() user: JwtPayload,
    @Query('subCategoryUuid') subCategoryUuid: string,
    @Body() data: CreateTopicInputDto,
  ): Promise<TopicResponseDto> {
    return this.topicService.create(user, subCategoryUuid, data);
  }

  @Get('/:topicUuid')
  async getOne(
    @Param('topicUuid') topicUuid: string,
  ): Promise<TopicResponseDto> {
    return this.topicService.getOne(topicUuid);
  }

  @Delete('/:topicUuid')
  @ApiBearerAuth('Authorization')
  @Roles([EUserRole.superadmin, EUserRole.admin])
  @UseGuards(AuthGuard)
  async deleteOne(
    @Param('topicUuid') topicUuid: string,
  ): Promise<TopicResponseDto> {
    return this.topicService.deleteOne(topicUuid);
  }

  @Get('/')
  async getAll(
    @Query() query: GetAllTopicQueryDto,
    @PaginationParamDecorator() pagination: IPagination,
  ): Promise<IPaginatedReponse<TopicResponseDto>> {
    return this.topicService.getAll(query, pagination);
  }
}
