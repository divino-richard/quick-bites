import { z } from "zod";

export const deleteImageSchema = z.object({
  query: z.object({
    filename: z.string().min(1)
  })
})