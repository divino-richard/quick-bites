import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const createBusinessSchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.string(),
    registrationNumber: z.number(),
    bankName: z.string(),
    bankHolderName: z.string(),
    bankAccountNumber: z.number(),
    taxIdNumber: z.number(),
    address: z.object({
      formattedAddress: z.string(),
      location: z.object({
        lat: z.number(),
        lng: z.number()
      })
    })
  })
});

export const getBusinessSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => isValidObjectId(id), {
      message: 'Invalid business id'
    })
  })
})