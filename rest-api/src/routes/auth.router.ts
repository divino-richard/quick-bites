import express, { Request, Response } from "express"; 
import { createUser, getUserByEmail } from "../services/user.service";
import bcrypt from 'bcrypt';
import { validateSchema } from "../schema";
import { loginSchmea, registerSchema } from "../schema/auth.schema";
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post('/register', validateSchema(registerSchema), async (req: Request, res: Response) => {
  try {
    const saltRounds = 11;
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if(user) {
      return res.status(400).json({message: "User already exist"})
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await createUser({
      ...req.body, 
      userType: 'customer',
      password: hashedPassword,
    });
    res.status(200).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json(error);
  }
})

authRouter.post('/login', validateSchema(loginSchmea), async (req: Request, res: Response) => {
  try {
    const secreteKey = process.env.JWT_PRIVATE_KEY;
    const { email, password } = req.body 
    const user = await getUserByEmail(email);
    if(!user) return res.status(404).json({
      message: 'Account does not exist'
    });
    if(!user.password) throw new Error('Password is missing.');
    const verified = await bcrypt.compare(password, user.password);
    if(!verified) return res.status(401).json({
      message: 'Incorrect password'
    });
    if(!secreteKey) {
      throw new Error('Missing jwt private key');
    }
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
      avatar: user.avatar
    };
    jwt.sign(
      payload,
      secreteKey,
      { algorithm: 'HS256', expiresIn: '1h' },
      function(error, token) {
        if(error) throw new Error('JWT sign error');
        res.status(200).json({ userData: payload, token })
      }
    )
  } catch (error) {
    res.status(500).json(error);
  }
});

export default authRouter;
