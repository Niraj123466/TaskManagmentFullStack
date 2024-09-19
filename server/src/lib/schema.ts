import { z } from 'zod';

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
 });

 export const taskQuerySchema = z.object({
    status: z.enum(['TO_DO', 'IN_PROGRESS', 'COMPLETED']).optional(), 
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    sortBy: z.enum(['dueDate', 'priority', 'status']).optional(),
    order: z.enum(['asc', 'desc']).optional()
  });

 export  const taskCreateSchema = z.object({
   title: z.string().min(1).max(100),
   description: z.string().max(500).optional(),
   status: z.enum(['TO_DO', 'IN_PROGRESS', 'COMPLETED']).default('TO_DO'),
   priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
   dueDate: z.string().datetime().optional()
 });
