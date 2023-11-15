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
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.model';
import { LoggerService } from 'src/logger/logger.service';
import { LogMessages } from 'src/logger/log-messages.enum';

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
  async getAllTodos(): Promise<TodoDto[]> {
    try {
      this.logger.log('-Sending request- ' + LogMessages.GET_ALL_TODOS, true);

      const todos = await this.todoService.getAllTodos();

      this.logger.log(
        '-Received response for- ' + LogMessages.GET_ALL_TODOS,
        false,
        todos,
      );

      return todos;
    } catch (error) {
      this.logger.error(
        `${LogMessages.ERROR_GET_ALL_TODOS}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
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
  async getTodoById(@Param('id') id: string): Promise<TodoDto> {
    try {
      if (!id.trim()) {
        this.logger.warn(LogMessages.MISSING_ID_WARNING);
      }

      const logMessage = `-Sending request- ${LogMessages.GET_TODO_BY_ID}`;
      this.logger.log(logMessage, true, id);

      const todo = await this.todoService.getTodoById(id);

      this.logger.log(
        `-Received response for- ${LogMessages.GET_TODO_BY_ID} : ${id}`,
        false,
        todo,
      );

      return todo;
    } catch (error) {
      this.logger.error(
        `${LogMessages.ERROR_GET_TODO_BY_ID} : ${id} \nMessage: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // create new
  @Post()
  @ApiBody({ type: TodoDto })
  @ApiOperation({
    summary: ' Create a new Todo.',
    description: 'Adds a new Todo to the list.',
  })
  @ApiResponse({ status: 201, description: 'Creates a new Todo.' })
  async addTodo(@Body() todo: TodoDto): Promise<TodoDto> {
    try {
      if (
        !todo ||
        !todo.description ||
        typeof todo.done !== 'boolean' ||
        !todo.id
      ) {
        this.logger.warn(LogMessages.MISSING_FIELDS_AUTOFILL_WARNING);
      }

      const logMessage = `-Sending request- ${LogMessages.ADD_TODO}`;
      this.logger.log(logMessage, true, todo);

      const addedTodo = await this.todoService.addTodo(todo);

      this.logger.log(
        `-Received response for- ${LogMessages.ADD_TODO}`,
        false,
        addedTodo,
      );

      return addedTodo;
    } catch (error) {
      this.logger.error(
        `${LogMessages.ERROR_ADD_TODO}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
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
  async updateTodo(
    @Param('id') id: string,
    @Body() updatedTodo: TodoDto,
  ): Promise<TodoDto> {
    try {
      if (!updatedTodo || !Object.keys(updatedTodo).length) {
        this.logger.warn(LogMessages.NO_DATA_WARNING);
      } else {
        const logMessage = `-Sending request- ${LogMessages.UPDATE_TODO}: ${id}`;
        this.logger.log(logMessage, true, updatedTodo);

        const updatedTodoResult = await this.todoService.updateTodo(
          id,
          updatedTodo,
        );

        this.logger.log(
          `-Received response for- ${LogMessages.UPDATE_TODO}: ${id}`,
          false,
          updatedTodoResult,
        );

        return updatedTodoResult;
      }
    } catch (error) {
      this.logger.error(`${LogMessages.ERROR_UPDATE_TODO}: ${id}`, error.stack);
      throw error;
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
  async deleteTodo(@Param('id') id: string): Promise<void> {
    try {
      const logMessage = `-Sending request- ${LogMessages.DELETE_TODO}: ${id}`;
      this.logger.log(logMessage, true);

      await this.todoService.deleteTodo(id);

      this.logger.log(
        `-Received response for- ${LogMessages.DELETE_TODO}: ${id}`,
        false,
      );
    } catch (error) {
      this.logger.error(`${LogMessages.ERROR_DELETE_TODO}: ${id}`, error.stack);
      throw error;
    }
  }
}
