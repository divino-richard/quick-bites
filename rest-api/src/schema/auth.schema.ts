import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
    password: z.string().min(8).refine((password: string) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    }, {
      message: 'Must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&).'
    }),
  })
});

export const loginSchmea = z.object({
  body: z.object({
    email: z.string(),
    password: z.string()
  })
});
