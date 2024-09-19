'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import axios from 'axios';
import { ColumnCard } from './column-card';
import { useRecoilValue } from 'recoil';
import { newTodoState } from '@/app/state/atom';

export interface Todo {
  _id: string;  
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  description?: string; 
  priority: 'low' | 'medium' | 'high';
}


const KanbanBoard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const newTodo = useRecoilValue(newTodoState);


  useEffect(() => {
    fetchTodos();
  }, [newTodo]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };



  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      try {
        await axios.patch(
          `http://localhost:3000/api/todos/${draggableId}`,
          { status: destination.droppableId },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        fetchTodos();
      } catch (error) {
        console.error('Error updating todo status:', error);
      }
    }
  };

  const columns = ['todo', 'inProgress', 'done'];

  return (
    <div className="container mx-auto p-4 mt-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between">
          {columns.map((column) => (
            <ColumnCard
              key={column}
              column={column}
              todos={todos.filter((todo) => todo.status === column)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
