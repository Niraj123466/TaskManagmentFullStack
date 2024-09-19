// atoms.ts
import { atom } from 'recoil';

export interface NewTodo {
  title: string;
  description?: string;
  status: 'todo' | 'inProgress' | 'done';
}

export const newTodoState = atom<NewTodo>({
  key: 'newTodoState', // unique ID (with respect to other atoms/selectors)
  default: {
    title: '',
    description: '',
    status: 'todo',
  },
});