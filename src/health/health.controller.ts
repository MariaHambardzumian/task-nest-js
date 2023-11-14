import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
import * as dotenv from 'dotenv';
dotenv.config();


@Controller('health')
export class HealthController {
    
    private readonly API_URL =  process.env.API_URL;

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('', this.API_URL),
    ]);
  }
}