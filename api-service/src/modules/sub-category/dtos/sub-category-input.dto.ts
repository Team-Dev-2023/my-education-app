import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-input.dto';

export class CreateSubCategoryInputDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  imageUrl: string;
}

export class GetAllSubcategoryQueryDto extends PaginationQueryDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  categoryUuid: string;
}
