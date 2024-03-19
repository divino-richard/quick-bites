import { z } from 'zod';

export const validateFoodMenuItem = z.object({
    name: z.string(),
    description: z. string(),
    price: z.string(),
    category: z.string(),
});
