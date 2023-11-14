// config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class configService {
  constructor(private configService: ConfigService) {}

  getApiUrl(): string {
    return this.configService.get<string>('API_URL');
  }

}

export default configService;
