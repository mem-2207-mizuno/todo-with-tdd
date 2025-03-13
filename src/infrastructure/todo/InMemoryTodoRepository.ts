import { Todo } from "../../domain/todo/entities/Todo";
import { ITodoRepository } from "../../domain/todo/repositories/ITodoRepository.ts";

export class InMemoryTodoRepository implements ITodoRepository {
  private todos: Todo[] = [];

  async add(todo: Todo): Promise<void> {
    this.todos.push(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todos;
  }

  // テスト用に内部状態をリセットするメソッドも用意しておくと便利です
  async clear(): Promise<void> {
    this.todos = [];
  }
}
