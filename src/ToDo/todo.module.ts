import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports:[LoggerModule, ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class ToDoModule {}
