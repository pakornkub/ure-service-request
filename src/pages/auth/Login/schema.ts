import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'กรุณากรอก Username').trim(),
  password: z.string().min(1, 'กรุณากรอก Password').trim(),
  remember: z.boolean().default(false).nullish(),
});

export type LoginType = z.infer<typeof loginSchema>;
