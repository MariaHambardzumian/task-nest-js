import { Module } from '@nestjs/common';
import { ToDoModule } from './ToDo/todo.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ToDoModule, HealthModule],
})
export class AppModule {}
