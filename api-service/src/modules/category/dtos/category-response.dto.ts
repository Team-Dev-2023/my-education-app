import { ApiProperty } from '@nestjs/swagger';
import { BaseAuditReponseDto } from 'src/shared/dtos/base-audit-response.dto';

export class CategoryResponseDto extends BaseAuditReponseDto {
  @ApiProperty({
    type: String,
  })
  uuid: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  imageUrl: string;
}

export class SubCategoryResponseDto extends BaseAuditReponseDto {
  @ApiProperty({
    type: String,
  })
  uuid: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  imageUrl: string;
}
