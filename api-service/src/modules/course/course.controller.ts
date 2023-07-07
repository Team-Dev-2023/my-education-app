import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { CourseService } from './course.service';
import { CreateCourseInputDto } from './dtos/input/create-course-input.dto';
import { GetAllCourseInputDto } from './dtos/input/query-course-input.dto';
import { UpdateCourseInputDto } from './dtos/input/update-course-input.dto';
import {
  CourseMinimizeResponseDto,
  CourseReponseDto,
} from './dtos/response/course-response.dto';

@Controller({ path: 'courses' })
@ApiTags('Course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('')
  @UseGuards(AuthGuard)
  @Roles([EUserRole.lecturer])
  @ApiBearerAuth('Authorization')
  @ApiResponse({
    type: CourseReponseDto,
    description: `Create course successfully`,
    status: 201,
  })
  async createOne(
    @UserParamDecorator() user: JwtPayload,
    @Body() data: CreateCourseInputDto,
  ) {
    return this.courseService.createOne(user, data);
  }

  @Get(':courseUuid')
  @ApiResponse({
    type: CourseReponseDto,
    description: `Create course successfully`,
    status: 200,
  })
  async getOne(
    @UserParamDecorator() user: JwtPayload,
    @Param('courseUuid') courseUuid: string,
  ) {
    return this.courseService.getOne(courseUuid);
  }

  @Delete('/:courseUuid')
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Roles([EUserRole.lecturer])
  async deleteOne(
    @Param('courseUuid') courseUuid: string,
  ): Promise<CourseReponseDto> {
    return this.courseService.deleteOne(courseUuid);
  }

  @Put('/:courseUuid')
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard)
  @Roles([EUserRole.lecturer])
  async update(
    @UserParamDecorator() user: JwtPayload,
    @Param('courseUuid') courseUuid: string,
    @Body() data: UpdateCourseInputDto,
  ): Promise<CourseReponseDto> {
    return this.courseService.update(user, courseUuid, data);
  }

  @Get('/')
  async getAll(
    @Query() filters: GetAllCourseInputDto,
    @PaginationParamDecorator() pagination: IPagination,
  ): Promise<IPaginatedReponse<CourseMinimizeResponseDto>> {
    return this.courseService.getAll(filters, pagination);
  }
}
