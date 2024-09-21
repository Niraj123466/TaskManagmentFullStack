import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/taskRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: 'GET,POST,PUT,PATCH,DELETE',
  credentials: true, 
}));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


const PORT = Number (process.env.PORT) || 3000;

app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
});