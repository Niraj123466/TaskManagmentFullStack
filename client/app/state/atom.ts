// atoms.ts
import { atom } from 'recoil';

export interface NewTodo {
  title: string;
  description?: string;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

export const newTodoState = atom<NewTodo>({
  key: 'newTodoState', // unique ID (with respect to other atoms/selectors)
  default: {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium'
  },
});

export const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [],
});