"use client";
import { useEffect } from 'react';
import axios from 'axios';
import { TodoInnerCard } from '@/components/todo-inner-card';
import NewTodoModal from '@/components/create-todo-modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { todosState } from '@/app/state/atom';

export interface Todo {
  _id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  description?: string;
  priority: 'low' | 'medium' | 'high';
}

const TodoList: React.FC = () => {
    const router = useRouter();
    const [todos, setTodos] = useRecoilState(todosState);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>('http://localhost:3000/api/todos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [setTodos]);

  return (
    <div className='min-h-screen p-4 mx-6 pt-6'>
    <div className='pl-10 flex items-center justify-start gap-x-2'>
      <NewTodoModal/>
      <Button 
      onClick={()=>{router.push('/board')}}
      className='bg-white text-black hover:bg-zinc-200 hover:text-black'
      >Board view</Button>
      </div>
      <div className='mt-4 ml-10'>
      <ul className='w-full'> {/* Set a max width for the ul */}
        {todos.map((todo, index) => (
          <TodoInnerCard
            todo={todo}
            index={index}
            key={todo._id}
          />
        ))}
      </ul>
      </div>
    </div>
  );
};

export default TodoList;
