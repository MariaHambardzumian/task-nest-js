import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service'; // Import your LoggerService
import { LogMessages } from 'src/logger/log-messages.enum';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const methodName = context.getHandler().name;
    const request = context.switchToHttp().getRequest();
    const requestBody = request.body;

    this.logger.log({
      message: LogMessages[methodName],
      requestBody: requestBody,
      params: request.params,
    });

    return next.handle().pipe(
      tap((data) => {
        this.logger.log({ message: LogMessages[methodName], response: data });
      }),
      catchError((error) => {
        this.logger.error(
          `ERROR_${LogMessages[methodName]} : \nMessage: ${error.message}`,
          error.stack,
        );
        throw error;
      }),
    );
  }
}
