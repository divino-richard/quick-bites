import express, { Request, Response } from 'express';
import { validateSchema } from '../schema';
import { createUserSchema, getUsersSchema } from '../schema/user.schema';
import { createUser, getUserByEmail, getUsers } from '../services/user.service';
import bcrypt from 'bcrypt';

const userRouter = express.Router();

userRouter.post('/', validateSchema(createUserSchema), async(req: Request, res: Response) => {
  try {
    const saltRounds = 11;
    const { email } = req.body;
    const foundUser = await getUserByEmail(email);
    if(foundUser) return res.status(400).json({
      message: 'User already exist'
    });
    const password = 'Password@123'; // NOTE: Must have an email sending functionality
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await createUser({...req.body, password: hashedPassword});
    res.status(200).json({
      message: 'User created successfully'
    });
  } catch(error) {
    res.status(500).json(error);
  }
});

userRouter.get('/', validateSchema(getUsersSchema), async(req: Request, res: Response) => {
  try {
    const { skip, limit } = req.query;
    const users = await getUsers({ 
      skip: Number(skip), 
      limit: Number(limit)
    });
    if(!users) return res.status(400).json({
      message: 'Failed to get users'
    });
    res.status(200).json(users)
  } catch(error) {
    res.status(500).json(error)
  }
});

export default userRouter;