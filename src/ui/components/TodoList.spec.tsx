import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './TodoList';
import { Todo } from '../../domain/todo/entities/Todo';
import { describe, test, expect, vi } from 'vitest';

describe('TodoList Component', () => {
  test('renders list of todos with proper completion status', () => {
    const todos: Todo[] = [new Todo('Todo 1'), new Todo('Todo 2')];
    // マークしたTodoは Completed と表示される想定
    todos[1].complete();

    render(
      <TodoList
        todos={todos}
        onRemove={() => {}}
        onToggle={() => {}}
        onUpdateTitle={() => {}}
      />
    );

    // TextField の値をチェックするために getByDisplayValue を使用
    expect(screen.getByDisplayValue('Todo 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Todo 2')).toBeInTheDocument();
    // 完了状態は secondary テキストとして "Completed" が表示されるはず
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('calls onRemove when remove button is clicked', () => {
    const onRemove = vi.fn();
    const todos: Todo[] = [new Todo('Todo 1')];

    render(
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={() => {}}
        onUpdateTitle={() => {}}
      />
    );

    // 削除ボタンは aria-label "delete" で指定している
    const removeButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledWith(0);
  });

  test('calls onToggle when toggle checkbox is clicked', () => {
    const onToggle = vi.fn();
    const todos: Todo[] = [new Todo('Todo 1')];

    render(
      <TodoList
        todos={todos}
        onRemove={() => {}}
        onToggle={onToggle}
        onUpdateTitle={() => {}}
      />
    );

    // チェックボックスとして実装しているので、role "checkbox" で取得
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith(0);
  });

  test('calls onUpdateTitle when title is updated', () => {
    const onUpdateTitle = vi.fn();
    const todos: Todo[] = [new Todo('Todo 1')];

    render(
      <TodoList
        todos={todos}
        onRemove={() => {}}
        onToggle={() => {}}
        onUpdateTitle={onUpdateTitle}
      />
    );

    // 編集用の TextField の値を変更して onBlur イベントを発火
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Title' } });
    fireEvent.blur(input);

    expect(onUpdateTitle).toHaveBeenCalledWith(0, 'New Title');
  });
});
