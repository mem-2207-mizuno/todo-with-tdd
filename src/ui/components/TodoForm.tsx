import React, { useState } from 'react';

type TodoFormProps = {
  // ここでは、addTodoUseCase.execute(title: string) を呼び出す想定
  addTodoUseCase: { execute: (title: string) => void };
};

export const TodoForm: React.FC<TodoFormProps> = ({ addTodoUseCase }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') {
      setError('Title must not be empty');
      return;
    }
    addTodoUseCase.execute(title);
    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add your new todo'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type='submit'>Add</button>
      {error && <div>{error}</div>}
    </form>
  );
};
