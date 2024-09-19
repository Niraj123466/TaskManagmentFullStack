import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Edit2, Trash2 } from 'lucide-react';
import { Todo } from "./kanban";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface TodoCardProps {
  todo: Todo;
  index: number;
  onDelete?: (id: string) => void;
}

const priorityColors = {
  high: 'bg-red-200 border-red-600 text-red-700',
  medium: 'bg-yellow-200 text-yellow-600 border-yellow-600',
  low: 'bg-green-200 text-green-700 border-green-700',
};

const statusColors = {
  todo: 'bg-blue-200 text-blue-700 border-blue-600',
  inProgress: 'bg-purple-200 text-purple-600 border-purple-600',
  done: 'bg-gray-200 text-gray-700 border-gray-600',
};

export const TodoCard: React.FC<TodoCardProps> = ({ todo, index }) => {
  const handleDelete = ({id}:{id:string}) => {

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
            <div className="flex items-center justify-start gap-2 mb-2">
              <div
                className={`text-white px-2 w-[70px] md:px-4 py-1 flex items-center justify-center rounded-full shadow-sm border ${statusColors[todo.status]}`}
                key={`status-${index}`}
              >
                <h1 className='text-xs'>{todo.status}</h1>
              </div>
              <div
                className={`text-white px-2 w-[70px] md:px-4 py-1 flex items-center justify-center rounded-full shadow-sm border ${priorityColors[todo.priority]}`}
                key={`priority-${index}`}
              >
                <h1 className='text-xs'>{todo.priority}</h1>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-white'>{todo.title}</CardTitle>
              <Edit2 className='text-white h-4 w-4'/>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-neutral-500'>{todo.description}</CardDescription>
          </CardContent>
          <Separator className='bg-zinc-800 my-2'/>
          <CardFooter className="relative">
            <Trash2
              className='text-neutral-500 h-5 w-4 cursor-pointer absolute left-2 mt-4'
              onClick={()=>{handleDelete(todo._id)}}
            />
          </CardFooter>
        </Card>
      )}
    </Draggable>
  );
};
