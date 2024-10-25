import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().min(4).max(255),
  email: z.string().email(),
  name: z.string().min(4),
  password: z.string().min(4),
  avatar: z.string().url().nullable().optional(),
  banner: z.string().url().nullable().optional(),
  bio: z.string().max(255).nullable().optional(),
});

const loginSchema = z.object({
  username: z.string().min(4).max(255),
  password: z.string().min(4),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const vibeSchema = z.object({
  content: z.string().max(255),
  image: z.string().url().nullable().optional(),
  authorId: z.number(),
});

const replySchema = z.object({
  content: z.string().max(255),
  image: z.string().url().nullable().optional(),
  authorId: z.number(),
  targetId: z.number(),
});

const userSchema = z.object({
  id: z.number(),
  username: z.string().min(4).max(255),
  name: z.string().min(4),
  filterContent: z.boolean().optional(),
  avatar: z.string().url().nullable().optional(),
  banner: z.string().url().nullable().optional(),
  bio: z.string().max(255).nullable().optional(),
});

export {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  vibeSchema,
  replySchema,
  userSchema,
};
