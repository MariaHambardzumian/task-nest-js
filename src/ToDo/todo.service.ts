import { Injectable } from "@nestjs/common";
import { TodoDto } from "./dto/todo.model";
import axios from 'axios'

@Injectable()
export class TodoService {
  private readonly API_URL = 'https://6543ad6901b5e279de20c994.mockapi.io/todo/todos';

  async getAllTodos(): Promise<TodoDto[]> {
    const response = await axios.get<TodoDto[]>(this.API_URL);
    return response.data;
  }

  async getTodoById(id: string): Promise<TodoDto> {
    const response = await axios.get<TodoDto>(`${this.API_URL}/${id}`);
    return response.data;
  }

  async addTodo(todo: TodoDto): Promise<TodoDto> {
    const response = await axios.post<TodoDto>(this.API_URL, todo);
    return response.data;
  }

  async updateTodo(id: string, updatedTodo: TodoDto): Promise<TodoDto> {
    const response = await axios.put<TodoDto>(`${this.API_URL}/${id}`, updatedTodo);
    return response.data;
  }

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`${this.API_URL}/${id}`);
  }
}