import { z } from 'zod';

export const registerBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const updateUserBodySchema = z.object({
  name: z.string().min(3).optional(), 
  email: z.string().email().optional(), 
});

export const sendMessageBodySchema = z.object({
  content: z.string().min(1),
});