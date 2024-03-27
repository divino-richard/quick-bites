import { z } from "zod";

export const updateFoodMenuItemSchema = z.object({
    name: z.string().min(8).max(50).nullish(),
    description: z.string().min(25).max(100).nullish(),
    price: z.number().min(50).nullish(),
    category: z.string().nullish(),
}); 

export const updateFoodMenuStatusSchema = z.object({
    status: z.string()
});
