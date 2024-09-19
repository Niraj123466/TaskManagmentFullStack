import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Edit2, Trash2 } from 'lucide-react';
import { Todo } from "./kanban";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface TodoCardProps {
  todo: Todo;
  index: number;
  onDelete?: (id: string) => void;
}

const priorityColors = {
  high: 'bg-red-400 text-red-700 border-red-600',
  medium: 'bg-yellow-300 text-yellow-600 border-yellow-600',
  low: 'bg-green-500',
};

export const TodoCard: React.FC<TodoCardProps> = ({ todo, index, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) onDelete(todo._id);
  };

  return (
    <Draggable draggableId={todo._id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='bg-neutral-900 border-none my-2'
        >
          <CardHeader>
            <div className='flex items-center justify-between'>
            <CardTitle className='text-white'>{todo.title}</CardTitle>
            <Edit2 className='text-white h-4 w-4'/>
            </div>
            <div
              className={`text-white px-2 w-[70px] md:px-4 py-1 flex items-center justify-center rounded-full shadow-sm border ${priorityColors[todo.priority]}`}
              key={index}
            >
             <h1 className='text-xs'>{todo.priority}</h1>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-neutral-500'>{todo.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Trash2
              className='text-neutral-500 cursor-pointer'
              onClick={handleDelete}
            />
          </CardFooter>
        </Card>
      )}
    </Draggable>
  );
};
