import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export abstract class PaginationQueryDto {
  @ApiProperty({ type: Number, required: false })
  @IsNumberString()
  page: number;

  @ApiProperty({ type: Number, required: false })
  @IsNumberString()
  perPage: number;
}
