import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (
      !(exception instanceof HttpException) ||
      (exception instanceof HttpException && exception.getStatus() === 500)
    ) {
      this.logger.error(exception);
    }

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    response.status(exception.getStatus()).json(exception.getResponse());
  }
}
