import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as httpContext from 'express-http-context';

export const UserParamDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = httpContext.get('user');
    return user;
  },
);
