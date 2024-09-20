"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskCreateSchema = exports.taskQuerySchema = exports.signinSchema = void 0;
const zod_1 = require("zod");
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.taskQuerySchema = zod_1.z.object({
    status: zod_1.z.enum(['TO_DO', 'IN_PROGRESS', 'COMPLETED']).optional(),
    priority: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    sortBy: zod_1.z.enum(['dueDate', 'priority', 'status']).optional(),
    order: zod_1.z.enum(['asc', 'desc']).optional()
});
exports.taskCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().max(500).optional(),
    status: zod_1.z.enum(['TO_DO', 'IN_PROGRESS', 'COMPLETED']).default('TO_DO'),
    priority: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    dueDate: zod_1.z.string().datetime().optional()
});
