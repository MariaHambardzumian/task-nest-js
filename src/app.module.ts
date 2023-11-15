import { Module } from '@nestjs/common';
import { ToDoModule } from './ToDo/todo.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    ToDoModule,
    HealthModule,
  ],
})
export class AppModule {}
