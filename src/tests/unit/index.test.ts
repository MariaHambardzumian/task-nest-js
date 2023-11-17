import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { TodoDto } from '../../ToDo/dto/todo.model';
import { TodoService } from '../../ToDo/todo.service';

jest.mock('axios');

describe('TodoService', () => {
  let todoService: TodoService;
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
    todoService = new TodoService(configService);
  });

  test('getAllTodos should return an array of TodoDto', async () => {
    const mockedTodos: TodoDto[] = [
      { id: '1', description: 'Todo 1', done: false },
      { id: '2', description: 'Todo 2', done: true },
    ];
    const axiosGetMock = jest.spyOn(axios, 'get');
    axiosGetMock.mockResolvedValue({ data: mockedTodos });

    const result = await todoService.getAllTodos();

    expect(result).toEqual(mockedTodos);
  });

  test('getTodoById should fetch a specific todo from the API', async () => {
    const mockedTodo: TodoDto = { id: '1', description: 'Todo 1', done: false };

    const axiosGetMock = jest.spyOn(axios, 'get');
    axiosGetMock.mockResolvedValue({ data: mockedTodo });

    const todoId = '1';
    const result = await todoService.getTodoById(todoId);

    expect(result).toEqual(mockedTodo);

    expect(axios.get).toHaveBeenCalledWith(
      `${configService.get<string>('API_URL')}/${todoId}`,
    );
  });

  test('addTodo should make a POST request with the TodoDto', async () => {
    const todoToAdd: TodoDto = {
      id: '1',
      description: 'New Todo',
      done: false,
    };

    const axiosPostMock = jest.spyOn(axios, 'post');
    axiosPostMock.mockResolvedValue({ data: todoToAdd });

    const result = await todoService.addTodo(todoToAdd);

    expect(result).toEqual(todoToAdd);

    expect(axios.post).toHaveBeenCalledWith(
      configService.get<string>('API_URL'),
      todoToAdd,
    );
  });

  test('updateTodo should make a PUT request with the Partial TodoDto', async () => {
    const todoId = '1';
    const updatedTodo: Partial<TodoDto> = { description: 'Updated Todo' };

    const axiosPutMock = jest.spyOn(axios, 'put');
    axiosPutMock.mockResolvedValue({
      data: { id: todoId, ...updatedTodo, done: false },
    });

    const result = await todoService.updateTodo(todoId, updatedTodo);

    expect(result).toEqual({ id: todoId, ...updatedTodo, done: false });

    expect(axios.put).toHaveBeenCalledWith(
      `${configService.get<string>('API_URL')}/${todoId}`,
      updatedTodo,
    );
  });

  test('deleteTodo should make a DELETE request with the correct URL', async () => {
    const todoId = '1';

    const axiosDeleteMock = jest.spyOn(axios, 'delete');
    axiosDeleteMock.mockResolvedValue({});

    await todoService.deleteTodo(todoId);

    expect(axios.delete).toHaveBeenCalledWith(
      `${configService.get<string>('API_URL')}/${todoId}`,
    );
  });
});
