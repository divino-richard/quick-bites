import { Types, isValidObjectId } from "mongoose";
import { z } from "zod";

export const createMenuSchema = z.object({
  body: z.object({
    businessId: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.object({
      currency: z.string(),
      value: z.number()
    }),
    category: z.string(),
    status: z.string(),
    images: z.array(z.object({
      imageUrl: z.string(),
      fileName: z.string()
    }))
  })
});

export const updateMenuSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.object({
      currency: z.string(),
      value: z.number()
    }),
    category: z.string(),
    status: z.string(),
    images: z.array(z.object({
      imageUrl: z.string(),
      fileName: z.string()
    }))
  })
});

export const updateMenuStatusSchema = z.object({
  body: z.object({
    status: z.string()
  }),
  params: z.object({
    id: z.string().refine((id) => isValidObjectId(id), {
      message: 'Invalid menu id'
    })
  })
});

export const getBusinessMenusSchema = z.object({
  query: z.object({
    bid: z.string().refine((bid) => isValidObjectId(bid), { 
      message: 'Invalid business id'
    })
  })
})

export const getMenuSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => isValidObjectId(id), { 
      message: 'Invalid menu id'
    })
  })
});

export const deleteMenuSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => isValidObjectId(id), {
      message: 'Invalid menu id'
    })
  })
})