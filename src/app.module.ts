import { Module } from '@nestjs/common';
import { TodoController } from 'src/ToDo/controllers/todo.controller';
import { TodoService } from 'src/ToDo/services/todo.service';

@Module({
  imports: [],
  controllers: [ TodoController],
  providers: [ TodoService],
})
export class AppModule {}
