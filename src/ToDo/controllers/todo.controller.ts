import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
// import { TodoDto } from './todo.model';
import { TodoService } from '../services/todo.service';
import { TodoDto } from '../dto/todo.model';

@Controller('todos')
@ApiTags('Todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({
    summary: 'Get the entire list of todos',
    description: "Retrieves all available Todos."
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieves a Todo lists',
    type: [TodoDto],
  })
  async getAllTodos(): Promise<TodoDto[]> {
    return await this.todoService.getAllTodos();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiOperation({
    summary: 'Get a specific todo by ID.',
    description: "Retrieves a specific Todo by its ID."
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieves a specific Todo by ID.',
    type: TodoDto,
  })
  async getTodoById(@Param('id') id: string): Promise<TodoDto> {
    return await this.todoService.getTodoById(id);
  }


  @Post()
  @ApiBody({ type: TodoDto })
  @ApiOperation({
    summary: ' Create a new Todo.',
    description: "Adds a new Todo to the list."
  })
  @ApiResponse({ status: 201, description: 'Creates a new Todo.' })
  async addTodo(@Body() todo: TodoDto): Promise<TodoDto> {
    return await this.todoService.addTodo(todo);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiBody({ type: TodoDto })
  @ApiOperation({
    summary: 'Update a specific todo by ID.',
    description: " Updates a specific Todo identified by its ID."
  })
  @ApiResponse({ status: 200, description: 'Updates a specific Todo by ID.' })
  async updateTodo(
    @Param('id') id: string,
    @Body() updatedTodo: TodoDto,
  ): Promise<TodoDto> {
    return await this.todoService.updateTodo(id, updatedTodo);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiOperation({
    summary: ' Delete a specific todo by ID.',
    description: " Removes a specific Todo identified by its ID."
  })
  @ApiResponse({ status: 204, description: 'Deletes a specific Todo by ID.' })
  async deleteTodo(@Param('id') id: string): Promise<void> {
    return await this.todoService.deleteTodo(id);
  }
}
