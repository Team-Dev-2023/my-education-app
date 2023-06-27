import { ApiProperty } from '@nestjs/swagger';

export class ImageUploadReponseDto {
  @ApiProperty({ type: 'string', required: false })
  url: string;
}
