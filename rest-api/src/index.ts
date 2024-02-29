import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dbConnect from './config/db';
import authRouter from './routes/auth.router';
import * as dotenv from 'dotenv';
import merchantRoute from './routes/merchant.route';
import { authorize } from './middleware/auth.middleware';
import { User } from './types/user.types';
dotenv.config();

const app = express(); 
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

const mainRouter = express.Router();

mainRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.authorization)
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized');
    }

    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    if(!process.env.JWT_PRIVATE_KEY) {
        throw new Error('Failed to get jwt private key')
    }
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, payload) => {
        if(error) {
            return res.status(401).send('Unauthorized');
        }

        // TODO
        next()
    })
})

app.use("/auth", authRouter);
app.use('/api', mainRouter);

mainRouter.post('/merchant', authorize(['merchant']), merchantRoute);

dbConnect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
