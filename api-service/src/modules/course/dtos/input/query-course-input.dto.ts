import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-input.dto';

export class GetAllCourseInputDto extends PaginationQueryDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  categoryUuid: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  subCategoryUuid: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  topicUuid: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  categoryName: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  subCategoryName: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  topicName: string;
}
