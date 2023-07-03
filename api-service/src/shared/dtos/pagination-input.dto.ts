import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export abstract class PaginationQueryDto {
  @ApiProperty({ type: Number, required: false })
  @IsNumberString()
  @IsOptional()
  page: number;

  @ApiProperty({ type: Number, required: false })
  @IsNumberString()
  @IsOptional()
  perPage: number;
}
