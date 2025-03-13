import { renderHook, act } from "@testing-library/react";
import { useTodo } from "./useTodo";
import { describe, test, expect } from "vitest";

describe("useTodo Hook", () => {
  test("初期状態ではTodoリストが空である", () => {
    const { result } = renderHook(() => useTodo());
    expect(result.current.todos).toEqual([]);
  });

  test("addTodoを呼び出すと新しいTodoが追加される", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("新規Todo");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe("新規Todo");
  });

  test("空文字でaddTodoを呼び出した場合、Todoが追加されない", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("");
    });

    // 空文字の場合はエラーが発生し、Todoが追加されないことを確認する
    expect(result.current.todos).toHaveLength(0);
  });

  test("removeTodoを呼び出すと指定したTodoが削除される", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("Todo 1");
      result.current.addTodo("Todo 2");
    });
    expect(result.current.todos).toHaveLength(2);

    act(() => {
      result.current.removeTodo(0);
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe("Todo 2");
  });

  test("updateTodoTitleを呼び出すと指定したTodoのタイトルが変更される", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("Old Title");
    });
    expect(result.current.todos[0].title).toBe("Old Title");

    act(() => {
      result.current.updateTodoTitle(0, "New Title");
    });
    expect(result.current.todos[0].title).toBe("New Title");
  });

  test("toggleTodoを呼び出すと指定したTodoのステータスが切り替わる", () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo("Toggle Todo");
    });
    expect(result.current.todos[0].isCompleted).toBe(false);

    act(() => {
      result.current.toggleTodo(0);
    });
    expect(result.current.todos[0].isCompleted).toBe(true);

    act(() => {
      result.current.toggleTodo(0);
    });
    expect(result.current.todos[0].isCompleted).toBe(false);
  });
});
