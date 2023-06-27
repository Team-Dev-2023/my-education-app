import { ApiProperty } from '@nestjs/swagger';

export class ImageUploadInputDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
