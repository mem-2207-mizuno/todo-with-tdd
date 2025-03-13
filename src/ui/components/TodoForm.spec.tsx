import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from './TodoForm';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// AddTodoユースケースをモック化する例
const mockAddTodo = {
  execute: vi.fn(),
};

describe('TodoForm Component', () => {
  beforeEach(() => {
    mockAddTodo.execute.mockClear();
  });

  test('初期表示時、入力フィールドが空であること', () => {
    render(<TodoForm addTodoUseCase={mockAddTodo} />);
    const inputElement = screen.getByPlaceholderText('Add your new todo');
    expect((inputElement as HTMLInputElement).value).toBe('');
  });

  test('テキストを入力してSubmitするとAddTodoユースケースが呼ばれる', () => {
    render(<TodoForm addTodoUseCase={mockAddTodo} />);
    const inputElement = screen.getByPlaceholderText('Add your new todo');
    const buttonElement = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(inputElement, { target: { value: 'UIから追加' } });
    fireEvent.click(buttonElement);

    expect(mockAddTodo.execute).toHaveBeenCalledWith('UIから追加');
  });

  test('空文字のままSubmitした場合はエラーが表示される (例)', () => {
    render(<TodoForm addTodoUseCase={mockAddTodo} />);
    const buttonElement = screen.getByRole('button', { name: 'Add' });

    fireEvent.click(buttonElement);

    // コンポーネント内でエラーを表示したりする仕様を先にテストで決める
    const errorMessage = screen.getByText('Title must not be empty');
    expect(errorMessage).toBeInTheDocument();
  });
});
