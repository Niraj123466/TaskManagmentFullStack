import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/todo';

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title, description, priority, status } = req.body;
        const todo = new Todo({ title, user: req.user!._id, description, priority, status  });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
         const todos = await Todo.find({ user: req.user!._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

export const updateTodoStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user!._id },
      { status },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user!._id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const { title, description, priority, status } = req.body;  

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user!._id },
      { title, description, priority, status }, 
      { new: true, runValidators: true }  
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
};
