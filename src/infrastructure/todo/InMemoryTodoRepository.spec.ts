import { InMemoryTodoRepository } from "./InMemoryTodoRepository";
import { Todo } from "../../domain/todo/entities/Todo";
import { describe, beforeEach, test, expect } from "vitest";

describe("InMemoryTodoRepository", () => {
  let repo: InMemoryTodoRepository;

  beforeEach(async () => {
    repo = new InMemoryTodoRepository();
    await repo.clear();
  });

  test("新しいTodoを追加できる", async () => {
    const todo = new Todo("テストTodo");
    await repo.add(todo);
    const todos = await repo.findAll();
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe("テストTodo");
  });

  test("複数のTodoを追加できる", async () => {
    const todo1 = new Todo("Todo 1");
    const todo2 = new Todo("Todo 2");
    await repo.add(todo1);
    await repo.add(todo2);
    const todos = await repo.findAll();
    expect(todos).toHaveLength(2);
    expect(todos[0].title).toBe("Todo 1");
    expect(todos[1].title).toBe("Todo 2");
  });
});
