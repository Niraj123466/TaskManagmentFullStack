'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { newTodoState, todosState } from '@/app/state/atom';
import { ColumnCard } from '@/components/column-card';

export interface Todo {
  _id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  description?: string;
  priority: 'low' | 'medium' | 'high';
}

const columns = ['todo', 'inProgress', 'done'];

const KanbanBoard: React.FC = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  //const [todos, setTodos] = useState<Todo[]>([]);
  const newTodo = useRecoilValue(newTodoState);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get<Todo[]>('http://localhost:3000/api/todos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, newTodo]);

  const onDragEnd = useCallback(async (result: DropResult) => {
    const { source, destination, draggableId } = result;
  
    if (!destination) return;
  
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    setTodos((prevTodos) => {
      const newTodos = Array.from(prevTodos);
      const todoIndex = newTodos.findIndex(todo => todo._id === draggableId);
      if (todoIndex === -1) return prevTodos; 
  
      const [reorderedItem] = newTodos.splice(todoIndex, 1);
      const updatedItem = {
        ...reorderedItem,
        status: destination.droppableId as 'todo' | 'inProgress' | 'done',
      };
  
      const insertIndex = newTodos.filter(todo => todo.status === destination.droppableId).length;
      newTodos.splice(insertIndex, 0, updatedItem);
  
      return newTodos;
    });
  
    try {
      await axios.patch(
        `http://localhost:3000/api/todos/${draggableId}`,
        { status: destination.droppableId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
    } catch (error) {
      console.error('Error updating todo status:', error);
      fetchTodos(); 
    }
  }, [fetchTodos]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, []);

  const columnTodos = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column] = todos.filter((todo) => todo.status === column);
      return acc;
    }, {} as Record<string, Todo[]>);
  }, [todos]);

  return (
    <div className="container mx-auto p-4 mt-6 bg-zinc-950">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between">
          {columns.map((column) => (
            <ColumnCard
              key={column}
              column={column}
              todos={columnTodos[column]}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default React.memo(KanbanBoard);