import { describe, test, expect } from "vitest";
import { Todo } from "./Todo";


describe("Todo Entity", () => {
  test("新規作成時、titleを正しくセットできる", () => {
    const todo = new Todo("テスト用のタイトル");
    expect(todo.title).toBe("テスト用のタイトル");
    expect(todo.isCompleted).toBe(false); // デフォルトでは未完了
  });

  test("complete() を呼ぶと isCompleted が true になる", () => {
    const todo = new Todo("テスト用のタイトル");
    todo.complete();
    expect(todo.isCompleted).toBe(true);
  });

  test("title が空文字の場合はエラーを投げる (例)", () => {
    expect(() => {
      new Todo("");
    }).toThrowError("Title must not be empty");
  });
});
