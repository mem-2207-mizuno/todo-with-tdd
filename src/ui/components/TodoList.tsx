import React from 'react';
import { Todo } from '../../domain/todo/entities/Todo';
import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  TextField,
  Tooltip,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type TodoListProps = {
  todos: Todo[];
  onRemove: (index: number) => void;
  onToggle: (index: number) => void;
  onUpdateTitle: (index: number, newTitle: string) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onRemove,
  onToggle,
  onUpdateTitle,
}) => {
  return (
    <List>
      {todos.map((todo, index) => (
        <ListItem key={index} divider>
          {/* ステータス切替用のチェックボックス */}
          <Checkbox
            edge='start'
            checked={todo.isCompleted}
            onChange={() => onToggle(index)}
          />
          <ListItemText
            primary={
              <TextField
                defaultValue={todo.title}
                variant='standard'
                fullWidth
                onBlur={(e) => onUpdateTitle(index, e.target.value)}
                InputProps={{
                  style: {
                    textDecoration: todo.isCompleted ? 'line-through' : 'none',
                  },
                }}
              />
            }
            secondary={todo.isCompleted ? 'Completed' : 'Not Completed'}
          />
          <Tooltip title='Remove'>
            <IconButton
              edge='end'
              aria-label='delete'
              onClick={() => onRemove(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};
