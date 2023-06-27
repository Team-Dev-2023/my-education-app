import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-input.dto';

export class CreateTopicInputDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  imageUrl: string;
}

export class GetAllTopicQueryDto extends PaginationQueryDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  subCategoryUuid: string;
}
