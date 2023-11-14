import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.model';
import axios from 'axios';
import * as dotenv from 'dotenv';
import configService from 'src/config/config.service';
dotenv.config();

@Injectable()
export class TodoService {
  
  constructor(private configService: configService) {}

  async getAllTodos(): Promise<TodoDto[]> {
    const response = await axios.get<TodoDto[]>(this.configService.getApiUrl());
    return response.data;
  }

  async getTodoById(id: string): Promise<TodoDto> {
    const response = await axios.get<TodoDto>(
      `${this.configService.getApiUrl()}/${id}`,
    );
    return response.data;
  }

  async addTodo(todo: TodoDto): Promise<TodoDto> {
    const response = await axios.post<TodoDto>(
      this.configService.getApiUrl(),
      todo,
    );
    return response.data;
  }

  async updateTodo(id: string, updatedTodo: TodoDto): Promise<TodoDto> {
    const response = await axios.put<TodoDto>(
      `${this.configService.getApiUrl()}/${id}`,
      updatedTodo,
    );
    return response.data;
  }

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`${this.configService.getApiUrl()}/${id}`);
  }
}
