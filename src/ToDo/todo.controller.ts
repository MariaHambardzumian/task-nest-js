import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.model';
import { LoggerService } from 'src/logger/logger.service';
import { LogMessages } from 'src/logger/log-messages.enum';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Controller('todos')
@ApiTags('Todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get the entire list of todos',
    description: 'Retrieves all available Todos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieves a Todo lists',
    type: [TodoDto],
  })
  @UseInterceptors(LoggingInterceptor)
  async getAllTodos(): Promise<TodoDto[]> {
    const todos = await this.todoService.getAllTodos();
    return todos;
  }

  // get with id
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiOperation({
    summary: 'Get a specific todo by ID.',
    description: 'Retrieves a specific Todo by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieves a specific Todo by ID.',
    type: TodoDto,
  })
  @UseInterceptors(LoggingInterceptor)
  async getTodoById(@Param('id') id: string): Promise<TodoDto> {
    if (!id.trim()) {
      this.logger.warn(LogMessages.MISSING_ID_WARNING);
    }
    const todo = await this.todoService.getTodoById(id);

    return todo;
  }

  // create new
  @Post()
  @ApiBody({ type: TodoDto })
  @ApiOperation({
    summary: ' Create a new Todo.',
    description: 'Adds a new Todo to the list.',
  })
  @ApiResponse({ status: 201, description: 'Creates a new Todo.' })
  @UseInterceptors(LoggingInterceptor)
  async addTodo(@Body() todo: TodoDto): Promise<TodoDto> {
    if (
      !todo ||
      !todo.description ||
      typeof todo.done !== 'boolean' ||
      !todo.id
    ) {
      this.logger.warn(LogMessages.MISSING_FIELDS_AUTOFILL_WARNING);
    }

    const addedTodo = await this.todoService.addTodo(todo);

    return addedTodo;
  }

  // update
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiBody({ type: TodoDto })
  @ApiOperation({
    summary: 'Update a specific todo by ID.',
    description: ' Updates a specific Todo identified by its ID.',
  })
  @ApiResponse({ status: 200, description: 'Updates a specific Todo by ID.' })
  @UseInterceptors(LoggingInterceptor)
  async updateTodo(
    @Param('id') id: string,
    @Body() updatedTodo: Partial<TodoDto>,
  ): Promise<TodoDto> {
    if (!updatedTodo || !Object.keys(updatedTodo).length) {
      this.logger.warn(LogMessages.NO_DATA_WARNING);
    } else {
      const updatedTodoResult = await this.todoService.updateTodo(
        id,
        updatedTodo,
      );

      return updatedTodoResult;
    }
  }

  // delete
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiOperation({
    summary: ' Delete a specific todo by ID.',
    description: ' Removes a specific Todo identified by its ID.',
  })
  @ApiResponse({ status: 204, description: 'Deletes a specific Todo by ID.' })
  @UseInterceptors(LoggingInterceptor)
  async deleteTodo(@Param('id') id: string): Promise<void> {
    await this.todoService.deleteTodo(id);
  }
}
