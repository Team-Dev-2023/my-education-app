import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseAuditReponseDto {
  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  lastUpdatedAt: Date;

  @ApiProperty({
    type: String,
  })
  createdBy: string;

  @ApiProperty({
    type: String,
  })
  lastUpdatedBy: string;
}
