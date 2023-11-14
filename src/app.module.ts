import { Module } from '@nestjs/common';
import { ToDoModule } from './ToDo/todo.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ToDoModule,
    HealthModule,
  ],
})
export class AppModule {}
