import { Request, Response } from 'express';
import * as userService from '../services/userService';
import {
  createUserSchema,
  updateUserSchema,
} from '../validation/userValidation';
import { ZodError } from 'zod';

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const user = await userService.createUser(validatedData);
    res.status(201).json(user);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(+req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const user = await userService.updateUser(+req.params.id, validatedData);
    res.json(user);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(+req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Optional login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isValid = await userService.verifyPassword(password, user.password);
    if (!isValid)
      return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
