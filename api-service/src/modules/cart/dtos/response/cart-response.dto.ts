import { ApiProperty } from '@nestjs/swagger';
import { CourseMinimizeResponseDto } from 'src/modules/course/dtos/response/course-response.dto';

export class CartReponseDto {
  @ApiProperty({ type: () => CourseMinimizeResponseDto })
  course: CourseMinimizeResponseDto;

  @ApiProperty({ type: Number, required: false })
  quantity: number;
}
