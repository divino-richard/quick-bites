import express, { Request, Response } from 'express';
import { validateSchema } from '../schema';
import { createUserSchema, deleteUserSchema, getUsersSchema, searchUserSchema, updateUserSchema } from '../schema/user.schema';
import { createUser, deleteUserById, getUserByEmail, getUsers, searchUser, updateUser } from '../services/user.service';
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

userRouter.put('/', validateSchema(updateUserSchema), async(req: Request, res: Response) => {
  try {
    const updated = await updateUser(req.body);
    if(!updated) return res.status(400).json({
      message: 'Something went wrong'
    });
    res.status(200).json(updated);
  } catch(error) {
    res.status(500).json(error);
  }
})

userRouter.get('/', validateSchema(getUsersSchema), async(req: Request, res: Response) => {
  try {
    const { userType, skip, limit } = req.query;
    const users = await getUsers({ 
      userType: userType ? String(userType) : undefined,
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

userRouter.get('/search', validateSchema(searchUserSchema), async(req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    const result = await searchUser(String(keyword));
    if(!result) return res.status(400).json({
      message: 'Failed to search user'
    });
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json(error);
  }
});

userRouter.delete('/:userId', validateSchema(deleteUserSchema), async(req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deleted = await deleteUserById(userId);
    if(!deleted) return res.status(400).json({
      message: 'Failed to delete user'
    });
    res.status(200).json(deleted);
  } catch(error) {
    res.status(500).json(error);
  }
})

export default userRouter;