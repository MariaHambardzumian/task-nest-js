import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
      format: winston.format.simple(),
    });
  }

  log(message: string, sent: boolean = true, data?: any) {
    const direction = sent ? 'Sent' : 'Received';
    const dataMessage = data ? JSON.stringify(data, null, 2) : 'No data';

    this.logger.info(`${message}\n${direction} Data: ${dataMessage}\n\n`);
  }
  

  error(message: string, trace: string) {
    this.logger.error(`${message} \nStack: ${trace}\n\n`);
  }

  warn(message: string) {
    this.logger.warn(`${message}\n`);
  }
}
