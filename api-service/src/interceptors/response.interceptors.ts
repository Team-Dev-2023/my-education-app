import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Request, Response } from 'express';
import { X_CORRELATION_ID } from 'src/middlewares/correlationid.middleware';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();
    const correlationId = req.get(X_CORRELATION_ID);
    res.setHeader(X_CORRELATION_ID, correlationId);

    return next.handle().pipe(
      tap((body) => {
        this.logger.log(
          {
            res,
            reqBody: req.body,
            resBody: body,
          },
          'request completed',
        );
      }),
    );
  }
}
