import { Module } from '@nestjs/common';
import { ToDoModule } from './ToDo/todo.module';

@Module({
  imports: [ToDoModule],
})
export class AppModule {}
