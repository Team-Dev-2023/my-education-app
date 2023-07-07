import { ApiProperty } from '@nestjs/swagger';

export class PaginatedReponse<T> {
  @ApiProperty({ type: Object })
  data: T[];

  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  perPage: number;

  @ApiProperty({ type: Number })
  totalItems: number;

  @ApiProperty({ type: Number })
  totalPages: number;
}
