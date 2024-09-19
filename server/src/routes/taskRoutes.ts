import express from 'express';
import { createTodo, getTodos, updateTodoStatus, deleteTodo } from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/',authenticate, createTodo);
router.get('/',authenticate, getTodos);
router.patch('/:id',authenticate, updateTodoStatus);
router.delete('/:id',authenticate, deleteTodo);

export default router;