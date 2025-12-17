import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().nonnegative('Price must be >= 0'),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.coerce.number().nonnegative().optional(),
});
