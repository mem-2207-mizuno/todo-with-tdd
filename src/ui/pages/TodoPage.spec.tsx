import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoPage } from './TodoPage';
import { describe, expect, test, vi } from 'vitest';

vi.mock('../../application/todo/useCases/useTodo', () => ({
  useTodo: () => ({
    todos: [{ title: 'モックのTodo', isCompleted: false }],
    addTodo: vi.fn(),
  }),
}));

describe('TodoPage', () => {
  test('ページが正しくレンダリングされる', () => {
    render(<TodoPage />);
    expect(screen.getByText('Todo App')).toBeInTheDocument();
    expect(screen.getByDisplayValue('モックのTodo')).toBeInTheDocument();
  });
});
