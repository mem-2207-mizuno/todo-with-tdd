import React from 'react';
import { TodoForm } from '../components/TodoForm';
import { useTodo } from '../../application/todo/useCases/useTodo';
import { TodoList } from '../components/TodoList';

export const TodoPage: React.FC = () => {
  const { todos, addTodo, removeTodo, updateTodoTitle, toggleTodo } = useTodo();

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodoUseCase={{ execute: addTodo }} />
      <TodoList
        todos={todos}
        onRemove={removeTodo}
        onToggle={toggleTodo}
        onUpdateTitle={updateTodoTitle}
      />
    </div>
  );
};
