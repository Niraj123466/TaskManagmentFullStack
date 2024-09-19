'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KanbanBoard from '@/components/kanban';
import NewTodoModal from '@/components/create-todo-modal';

export default function Board() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className='min-h-screen p-4 pt-6'>
      <div className='pl-10'>
      <NewTodoModal/>
      </div>
      <KanbanBoard />
    </div>
  );
}