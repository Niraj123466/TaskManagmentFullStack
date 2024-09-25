import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/taskRoutes';

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: ['https://your-frontend-url.vercel.app',"http://localhost:3000"], // Change this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the methods you need
  credentials: true // Allow credentials if needed
};
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


const PORT = Number (process.env.PORT) || 3000;

app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
});