import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Card, CardContent } from './ui/card';
import { TodoCard } from './todo-card';
import { Todo } from "./kanban";
import { Circle } from 'lucide-react';

interface ColumnCardProps {
  column: string;
  todos: Todo[];
}

export const ColumnCard: React.FC<ColumnCardProps> = ({ column, todos }) => {
  // Determine the border color based on the column name
  const getBorderColor = (column: string) => {
    switch (column) {
      case 'todo':
        return 'border-blue-500';
      case 'inProgress':
        return 'border-yellow-500';
      case 'done':
        return 'border-green-500';
      default:
        return 'border-gray-500'; 
    }
  };

  return (
    <Card className="w-[500px] mx-2 bg-zinc-950 border-2 border-zinc-900">
      <div className={`flex items-center gap-2 bg-neutral-900 rounded-md p-4 mb-4 border-l-4 ${getBorderColor(column)}`}>
       <h1 className='text-white'>{column}</h1>
      </div>
      <CardContent className='w-full'>
        <Droppable droppableId={column} type="todo">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="min-h-[200px] bg-zinc-990 rounded-lg"
            >
              {todos.map((todo, index) => (
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};
