import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/taskRoutes';

dotenv.config();
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://task-managment-full-stack-client-3uibve5g6-niraj-mores-projects.vercel.app/', // Update with your frontend URL
    'http://localhost:3000', // For local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials
};

// Middleware
app.use(cors(corsOptions)); // Use CORS middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Server setup
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
