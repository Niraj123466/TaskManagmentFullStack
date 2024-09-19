import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  user: mongoose.Types.ObjectId;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['todo', 'inProgress', 'done'], default: 'todo' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }, // Added priority
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
