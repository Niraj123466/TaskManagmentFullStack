import { z } from 'zod';

export const newTodoSchema = z.object({
  title: z.string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  description: z.string()
    .max(500, { message: "Description cannot exceed 500 characters" })
    .optional(),
  status: z.enum(['todo', 'inProgress', 'done'], {
    errorMap: () => ({ message: "Invalid status" }),
  }),
  priority: z.enum(['high', 'medium', 'low'], {
    errorMap: () => ({ message: "Invalid priority" }),
  }),
});

export type NewTodo = z.infer<typeof newTodoSchema>;
