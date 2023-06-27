import { UnsupportedMediaTypeException } from '@nestjs/common';

export function fileMimetypeFilter(mimetypes: string[]) {
  return (
    cb,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (
      mimetypes.some(
        (m) =>
          file.mimetype.includes(m) ||
          mimetypes.some((m) => file.originalname.includes(m)),
      )
    ) {
      console.log('file', file);

      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `File type is not matching: ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
  };
}
