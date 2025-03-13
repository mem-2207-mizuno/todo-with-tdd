import { AddTodo } from "./AddTodo";
import { InMemoryTodoRepository } from "../../../infrastructure/todo/InMemoryTodoRepository";

describe("AddTodo UseCase", () => {
  test("リポジトリに新しいTodoを追加できる", async () => {
    const repo = new InMemoryTodoRepository();
    const addTodo = new AddTodo(repo);

    await addTodo.execute("ユースケースのテスト");
    const allTodos = await repo.findAll();

    expect(allTodos).toHaveLength(1);
    expect(allTodos[0].title).toBe("ユースケースのテスト");
    expect(allTodos[0].isCompleted).toBe(false);
  });

  test("空文字のタイトルを渡すとエラーを返す (例)", async () => {
    const repo = new InMemoryTodoRepository();
    const addTodo = new AddTodo(repo);

    await expect(addTodo.execute("")).rejects.toThrowError("Title must not be empty");
  });
});
