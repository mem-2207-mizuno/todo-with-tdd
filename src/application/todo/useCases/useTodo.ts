import { useState } from "react";
import { Todo } from "../../../domain/todo/entities/Todo";

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 新規Todo追加：空文字の場合は何もしない
  const addTodo = (title: string) => {
    if (title.trim() === "") return;
    const newTodo = new Todo(title);
    setTodos(prev => [...prev, newTodo]);
  };

  // 指定インデックスのTodoを削除
  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index));
  };

  // 指定インデックスのTodoのタイトルを変更
  const updateTodoTitle = (index: number, newTitle: string) => {
    setTodos(prev => {
      const updatedTodos = [...prev];
      if (updatedTodos[index]) {
        updatedTodos[index].title = newTitle;
      }
      return updatedTodos;
    });
  };

  // 指定インデックスのTodoの完了状態を切り替え
  const toggleTodo = (index: number) => {
    setTodos(prev => {
      const updatedTodos = [...prev];
      if (updatedTodos[index]) {
        updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
      }
      return updatedTodos;
    });
  };

  return { todos, addTodo, removeTodo, updateTodoTitle, toggleTodo };
};
