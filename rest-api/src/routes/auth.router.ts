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
    const createdUser = await createUser({
      ...req.body, 
      password: hashedPassword,
      registrationStatus: 'initial'
    });
    const responseData = createdUser.toObject({virtuals: true});
    delete responseData.password;
    res.status(200).json(responseData);
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
    const payload = user.toObject({virtuals:true});
    delete payload.password;
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
