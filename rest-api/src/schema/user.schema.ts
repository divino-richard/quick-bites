import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    userType: z.string(),
    email: z.string().email(),
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    userType: z.string(),
    email: z.string().email(),
  })
});

export const getUsersSchema = z.object({
  query: z.object({
    skip: z.string().min(1).refine(skip => !isNaN(Number(skip)), {
      message: 'must be a number'
    }),
    limit: z.string().min(1).refine(limit => !isNaN(Number(limit)), {
      message: 'must be a number'
    })
  })
})

export const searchUserSchema = z.object({
  query: z.object({
    keyword: z.string().min(1)
  })
})

export const deleteUserSchema = z.object({
  params: z.object({
    userId: z.string().refine(id => isValidObjectId(id), {
      message: 'Invalid user id'
    })
  })
})
