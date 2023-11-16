import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

interface LogOptions {
  message: string;
  params?: any;
  requestBody?: any;
  response?: any;
}

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

  log({ message, params, requestBody, response }: LogOptions) {
    let logContent = `${message}\n`;
    if (params) {
      logContent += `--Sending request--\nParameters Sent : ${JSON.stringify(
        params,
        null,
        2,
      )}\n`;
      if (requestBody) {
        logContent += `Request Body : ${JSON.stringify(
          requestBody,
          null,
          2,
        )}\n`;
      }
      logContent += '\n';
    } else if (response) {
      logContent += `--Response returned--\nResponse : ${JSON.stringify(
        response,
        null,
        2,
      )}\n\n`;
    } else {
      logContent += 'No data\n\n';
    }
    this.logger.info(logContent);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} \nStack: ${trace}\n\n`);
  }

  warn(message: string) {
    this.logger.warn(`${message}\n`);
  }
}
