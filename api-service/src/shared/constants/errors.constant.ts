import { HttpStatus } from '@nestjs/common';

export const Errors = {
  USERNAME_IS_EXISTED: {
    message: 'Username is existed in our platform',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  INVALID_USERNAME: {
    message: 'Username is invalid',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  INVALID_PASSWORD: {
    message: 'Password is invalid',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  CANNOT_CREATE_ADMIN_ACCOUNT: {
    message: 'Cannot create admin account',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  INVALID_COUNTRY_CODE: {
    message: 'Invalid country code',
    statusCode: HttpStatus.BAD_REQUEST,
  },
};
