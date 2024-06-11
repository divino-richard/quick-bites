import { z } from "zod";

export const getPublicMenusSchema = z.object({
  query: z.object({
    skip: z.string().min(1)
      .refine(skip => !isNaN(Number(skip)), {
        message: 'must be a number'
      }),
    limit: z.string().min(1)
      .refine(limit => !isNaN(Number(limit)), {
        message: 'must be a number'
      }),
  })
});

export const searchPublicMenuSchema = z.object({
  query: z.object({
    keyword: z.string().min(1)
  })
})
