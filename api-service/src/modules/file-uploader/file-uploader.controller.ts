import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { getFileSettings } from 'src/shared/constants/config.constant';
import { fileMimetypeFilter } from 'src/shared/helpers/file-mime-type-filter.helper';
import { ImageUploadInputDto } from './dtos/file-uploader-input.dto';
import { ImageUploadReponseDto } from './dtos/file-uploader-response.dto';

@Controller({ path: 'file-uploader' })
@ApiTags('File Uploader')
export class FileUploaderController {
  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileMimetypeFilter(['png', 'jpeg', 'gif']),
      storage: diskStorage({
        destination: './public/upload',
        filename(req, file, callback) {
          return callback(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async uploadImage(
    @Body() data: ImageUploadInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageUploadReponseDto> {
    return { url: file.path };
  }

  @Post('/video')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileMimetypeFilter([
        'mp4',
        'webm',
        'm4v',
        'flv',
        'avi',
        '3gp',
      ]),
      limits: {
        fileSize: getFileSettings().maxFileSize,
      },
      storage: diskStorage({
        destination: './public/upload',
        filename(req, file, callback) {
          return callback(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async uploadVideo(
    @Body() data: ImageUploadInputDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageUploadReponseDto> {
    return { url: file.path };
  }
}
