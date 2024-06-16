import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const createRestaurantSchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.string(),
    specialFeature: z.string(),
    registrationNumber: z.number(),
    taxIdNumber: z.number(),
    address: z.object({
      formatted: z.string(),
      street: z.string().optional(),
      city: z.string(),
      postalCode: z.string(),
      country: z.string(),
      location: z.object({
        lat: z.number(),
        lng: z.number()
      })
    })
  })
});

export const getRestaurantSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => isValidObjectId(id), {
      message: 'Invalid restaurant id'
    })
  })
})