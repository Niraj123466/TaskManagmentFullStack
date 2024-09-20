'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KanbanBoard from '@/components/kanban';
import NewTodoModal from '@/components/create-todo-modal';
import { Button } from '@/components/ui/button';

export default function Board() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/sign-in');
    }
  }, [router]);

  return (
    <div className='min-h-screen p-4 pt-6'>
      <div className='pl-10 flex items-center justify-start gap-x-2'>
      <NewTodoModal/>
      <Button 
      onClick={()=>{router.push('/list')}}
      className='bg-white text-black hover:bg-zinc-200 hover:text-black'
      >List view</Button>
      </div>
      <KanbanBoard />
    </div>
  );
}