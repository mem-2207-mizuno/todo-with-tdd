import { Todo } from "../entities/Todo";

export interface ITodoRepository {
  add(todo: Todo): Promise<void>;
  findAll(): Promise<Todo[]>;
}