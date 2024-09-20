import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signup = async (req: Request, res: Response) => {
  try {

    const { username, email, password } = signupSchema.parse(req.body);


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new Error('Failed to hash password');
    }

    const user = new User({ username, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: error.errors.map(e => ({ field: e.path[0], message: e.message })),
      });
    }
    res.status(500).json({ message: error || 'Error creating user' });
  }
};



const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = signinSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const token = jwt.sign(
      { userId: user._id, username: user.username }, 
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: error.errors.map(e => ({ field: e.path[0], message: e.message })),
      });
    }

    res.status(500).json({ message: 'Error signing in' });
  }
};
