import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.model';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TodoService {
  constructor(private configService: ConfigService) {}

  async getAllTodos(): Promise<TodoDto[]> {
    const response = await axios.get<TodoDto[]>(
      this.configService.get<string>('API_URL'),
    );
    return response.data;
  }

  async getTodoById(id: string): Promise<TodoDto> {
    const response = await axios.get<TodoDto>(
      `${this.configService.get<string>('API_URL')}/${id}`,
    );
    return response.data;
  }

  async addTodo(todo: TodoDto): Promise<TodoDto> {
    const response = await axios.post<TodoDto>(
      this.configService.get<string>('API_URL'),
      todo,
    );
    return response.data;
  }

  async updateTodo(id: string, updatedTodo: Partial<TodoDto>): Promise<TodoDto> {
    const response = await axios.put<TodoDto>(
      `${this.configService.get<string>('API_URL')}/${id}`,
      updatedTodo,
    );
    return response.data;
  }

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`${this.configService.get<string>('API_URL')}/${id}`);
  }
}
