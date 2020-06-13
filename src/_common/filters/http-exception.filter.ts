import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: HttpStatus.NOT_FOUND,
        timestamp: new Date().toISOString(),
        message: exception.message,
      });
  }
}
